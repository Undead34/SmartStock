// Importamos los módulos necesarios
const Database = require("./database/Database");
const { ipcMain, shell } = require("electron");
const nodemailer = require("nodemailer");
const crypto = require("crypto");

const EMAIL_USER = "smartstock2508@gmail.com";
const EMAIL_PASS = "ozrfoyrymoxadnal";

// Definimos una clase llamada IpcMain
class IpcMain {
  constructor(mainWindow) {
    // Almacenamos la ventana principal y creamos una instancia de la base de datos
    this.mainWindow = mainWindow;
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: null,
      database: "inventario",
    });

    // Definimos una lista de eventos para la comunicación entre el proceso principal y el renderer
    const webPlayerEvents = [
      // Evento para registrar un nuevo usuario
      {
        name: "smartstock:register:user",
        handle: false,
        once: false,
        action: async (event, data) => {
          try {
            // Generamos un salt aleatorio
            const salt = crypto.randomBytes(16).toString("hex");
            // Derivamos la contraseña usando PBKDF2
            const derivedKey = crypto
              .pbkdf2Sync(data.password, salt, 100000, 64, "sha512")
              .toString("hex");

            // Creamos un objeto de usuario con los datos proporcionados
            const User = {
              FullName: data.name,
              Email: data.email,
              Password: `${salt}:${derivedKey}`,
              LoginToken: null,
              TokenExpirationDate: null,
              TempLoginCodes: null,
              Role: "user",
            };

            const users = await this.db.getAllUsers()

            if (users.length === 0) {
              User.Role = "admin"
            }

            // Verificamos si el usuario ya existe en la base de datos
            let result = await this.db.existUser(data.email);

            if (result.length === 0) {
              // Si no existe, creamos el usuario y enviamos una respuesta exitosa
              await this.db.createUser(User);
              event.sender.send("smartstock:register:user", {
                ERROR: null,
                CODE: "OK",
              });
            } else {
              // Manejamos el caso en que el usuario ya existe
              event.sender.send("smartstock:register:user", {
                ERROR: "User already exists",
                CODE: "ALREADY_EXISTS",
              });
            }
          } catch (error) {
            console.log(error);
            event.sender.send("smartstock:register:user", {
              ERROR: "Unknown error, please try again",
              CODE: "ERROR_UNKNOWN",
            });
          }
        },
      },
      // Evento para iniciar sesión de usuario
      {
        name: "smartstock:login:user",
        handle: false,
        once: false,
        action: async (event, data) => {
          try {
            // Verificamos si el usuario ya existe en la base de datos
            const existingUser = await this.db.existUser(data.email);

            if (existingUser.length === 0) {
              event.sender.send("smartstock:login:user", {
                ERROR: "Invalid password/email",
                CODE: "INVALID_PASSWORD_EMAIL",
              });
            } else {
              try {
                // Separar el salt y el storedKey del campo Password
                const [salt, storedKey] = existingUser[0].Password.split(":");
                // Derivamos la contraseña ingresada
                const derivedKey = crypto
                  .pbkdf2Sync(data.password, salt, 100000, 64, "sha512")
                  .toString("hex");

                if (derivedKey === storedKey) {
                  // Generamos un token aleatorio y lo almacenamos en la base de datos
                  const token = crypto.randomBytes(64).toString("base64");
                  this.db.insertToken(existingUser[0].ID, token);
                  event.sender.send("smartstock:login:user", {
                    ERROR: null,
                    CODE: "LOGIN_SUCCESS",
                    TOKEN: token,
                    ID: existingUser[0].ID,
                  });
                } else {
                  event.sender.send("smartstock:login:user", {
                    ERROR: "Invalid password/email",
                    CODE: "INVALID_PASSWORD_EMAIL",
                  });
                }
              } catch (error) {
                console.log(error);
                event.sender.send("smartstock:login:user", {
                  ERROR: "Unknown error occurred during password verification",
                  CODE: "ERROR_VERIFYING_PASSWORD",
                });
              }
            }
          } catch (error) {
            console.log(error);
            event.sender.send("smartstock:login:user", {
              ERROR: "Unknown error occurred while checking user existence",
              CODE: "ERROR_UNKNOWN",
            });
          }
        },
      },
      {
        name: "smartstock:login:token",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            // Obtenemos la información del usuario por su ID
            const result = await this.db.getUserById(data.id);
            let valid = false;

            if (result.length !== 0) {
              const user = result[0];
              // Verificamos si el token coincide y no ha expirado
              valid = user.LoginToken === data.token;
              valid = valid && new Date(user.TokenExpirationDate) > new Date();
            }

            return valid;
          } catch (e) {
            console.log(e);
            return false;
          }
        },
      },
      // Evento para recuperar la contraseña de un usuario
      {
        name: "smartstock:recovery:user",
        handle: false,
        once: false,
        action: async (event, email) => {
          try {
            const result = await this.db.existUser(email);

            if (result.length !== 0) {
              // Generamos un código aleatorio y lo guardamos en la base de datos
              const code = Math.floor(Math.random() * 1000000);
              this.db.saveTempLoginCode(result[0].ID, code);

              // Configuramos el transportador de correo
              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: EMAIL_USER,
                  pass: EMAIL_PASS,
                },
              });

              // Enviamos el correo con el código de recuperación
              const info = await transporter.sendMail({
                from: "SmartStock <smartstock2508@gmail.com>",
                to: email,
                subject: "Recuperar contraseña de SmartStock",
                html: `Tu código de recuperación es: <b>${code}</b>`,
              });

              console.log("Message sent: %s", info);
              if (info.rejected.length === 0) {
                event.sender.send("smartstock:recovery:user", {
                  ERROR: null,
                  CODE: "OK",
                });
              } else {
                event.sender.send("smartstock:recovery:user", {
                  ERROR:
                    "An error occurred while sending the email, check that you have open ports and/or firewall permissions, or the credentials are invalid.",
                  CODE: "EMAIL_SEND_ERROR",
                });
              }
            } else {
              event.sender.send("smartstock:recovery:user", {
                ERROR: "The user is not registered",
                CODE: "NO_EXISTS",
              });
            }
          } catch (error) {
            console.log(error);
            event.sender.send("smartstock:recovery:user", {
              ERROR: "Unknown error, please try again",
              CODE: "ERROR_UNKNOWN",
            });
          }
        },
      },
      // Evento para validar un código de recuperación
      {
        name: "smartstock:validate:code",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const result = await this.db.existUser(data.email);

            if (result.length !== 0) {
              if (result[0].TempLoginCodes === data.code) {
                // Limpiamos el código temporal después de validar
                this.db.saveTempLoginCode(result[0].ID, null);
                return { ERROR: null, CODE: "OK", id: result[0].ID };
              } else {
                return {
                  ERROR: "The code does not match",
                  CODE: "INVALID_CODE",
                };
              }
            } else {
              return { ERROR: "The user is not registered", CODE: "NO_EXISTS" };
            }
          } catch (error) {
            console.log(error);
            return {
              ERROR: "Unknown error, please try again",
              CODE: "ERROR_UNKNOWN",
            };
          }
        },
      },
      // Evento para abrir enlaces externos en el navegador predeterminado
      {
        name: "smartstock:open-external",
        handle: false,
        once: false,
        action: async (event, data) => {
          shell.openExternal(data);
        },
      },
      // Evento para cambiar la contraseña de un usuario
      {
        name: "smartstock:change:password",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const salt = crypto.randomBytes(16).toString("hex");
            const derivedKey = crypto
              .pbkdf2Sync(data.password, salt, 100000, 64, "sha512")
              .toString("hex");

            const password = `${salt}:${derivedKey}`;
            const result = await this.db.changePasswordByID(password, data.id);

            if (result.affectedRows === 0) {
              return {
                ERROR: "The user is not registered",
                CODE: "NO_EXISTS",
              };
            }

            return {
              ERROR: null,
              CODE: "OK",
            };
          } catch (error) {
            console.log(error);
            return {
              ERROR: "Unknown error, please try again",
              CODE: "ERROR_UNKNOWN",
            };
          }
        },
      },
      {
        name: "smartstock:get:userinfo",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const result = await this.db.getUserInfo(data.id);
            return result[0];
          } catch (error) {
            console.log(error);
            return {};
          }
        },
      },
      {
        name: "smartstock:post:stock",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            if (data.item) {
              this.db.saveEquipment(data.item);
              return true;
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
      {
        name: "smartstock:get:stock",
        handle: true,
        once: false,
        action: async () => {
          try {
            return await this.db.getAllEquipment();
          } catch (error) {
            console.error("Error getting all equipment:", error);
          }
        },
      },
      {
        name: "smartstock:update:stock",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.updateEquipment(data.item);
            if (success) {
              console.log("Equipment updated successfully!");
              return true;
            } else {
              console.log("Equipment update failed.");
              return true;
            }
          } catch (error) {
            console.error("Error updating equipment:", error);
            return false;
          }
        },
      },
      {
        name: "smartstock:delete:stock",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.deleteEquipmentsByIds(data.ids);
            if (success) {
              console.log("Equipment deleted successfully!");
              return true;
            } else {
              console.log("Equipment deletion failed.");
              return false;
            }
          } catch (error) {
            console.log("Equipment deletion failed.");
            return false;
          }
        },
      },
      {
        name: "smartstock:post:buys",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            if (data.item) {
              this.db.saveTracking(data.item);
              return true;
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
      {
        name: "smartstock:get:buys",
        handle: true,
        once: false,
        action: async () => {
          try {
            return await this.db.getAllTracking();
          } catch (error) {
            console.error("Error getting all equipment:", error);
          }
        },
      },
      {
        name: "smartstock:update:buys",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.updateTracking(data.item);
            if (success) {
              console.log("Equipment updated successfully!");
              return true;
            } else {
              console.log("Equipment update failed.");
              return true;
            }
          } catch (error) {
            console.error("Error updating equipment:", error);
            return false;
          }
        },
      },
      {
        name: "smartstock:delete:buys",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.deleteTrackingByIds(data.ids);
            if (success) {
              console.log("Equipment deleted successfully!");
              return true;
            } else {
              console.log("Equipment deletion failed.");
              return false;
            }
          } catch (error) {
            console.log("Equipment deletion failed.");
            return false;
          }
        },
      },
      {
        name: "smartstock:post:customers",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            if (data.item) {
              console.log(data);
              this.db.saveCustomer(data.item);
              return true;
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
      {
        name: "smartstock:delete:customers",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.deleteCustomersByIds(data.ids);
            if (success) {
              console.log("Equipment deleted successfully!");
              return true;
            } else {
              console.log("Equipment deletion failed.");
              return false;
            }
          } catch (error) {
            console.log("Equipment deletion failed.");
            return false;
          }
        },
      },
      {
        name: "smartstock:update:customers",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const success = await this.db.updateCustomer(data.item);
            if (success) {
              console.log("Equipment updated successfully!");
              return true;
            } else {
              console.log("Equipment update failed.");
              return true;
            }
          } catch (error) {
            console.error("Error updating equipment:", error);
            return false;
          }
        },
      },
      {
        name: "smartstock:get:customers",
        handle: true,
        once: false,
        action: async () => {
          try {
            return await this.db.getAllCustomers();
          } catch (error) {
            console.error("Error getting all equipment:", error);
          }
        },
      },
      {
        name: "smartstock:summary:equipment",
        handle: true,
        once: false,
        action: async () => {
          try {
            return await this.db.getEquipmentSummary();
          } catch (error) {
            console.error("Error getting all equipment:", error);
          }
        },
      },
      {
        name: "smartstock:send:email",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            // Configuramos el transportador de correo
            const transporter = nodemailer.createTransport({
              host: "smtp.gmail.com",
              port: 465,
              secure: true,
              auth: {
                user: EMAIL_USER,
                pass: EMAIL_PASS,
              },
            });

            // Enviamos el correo con el código de recuperación
            const info = await transporter.sendMail({
              from: "SmartStock <smartstock2508@gmail.com>",
              to: data.email,
              subject: data.subject,
              html: data.content,
            });

            console.log("Message sent: %s", info);
            if (info.rejected.length === 0) {
              return true;
            } else {
              return false;
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
      {
        name: "smartstock:get:users",
        handle: true,
        once: false,
        action: async () => {
          try {
            const users = await this.db.getAllUsers()
            return users
          } catch (error) {
            console.log(error);
            return [];
          }
        },
      },
      {
        name: "smartstock:set:role",
        handle: true,
        once: false,
        action: async (event, { id, role }) => {
          try {
            const users = await this.db.getAllUsers();
            const admins = users.filter((user) => user.Role === "admin");

            if (admins.length === 1 && admins[0].ID === id) {
              return false;
            }

            const r = await this.db.setUserRole(id, role)
            console.log(r)

            if (r.affectedRows === 1 && r.warningStatus === 0) {
              return true
            } else {
              return false
            }

          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
      {
        name: "smartstock:delete:user",
        handle: true,
        once: false,
        action: async (event, id) => {
          try {
            const r = await this.db.deleteUser(id)

            if (r.affectedRows === 1 && r.warningStatus === 0) {
              return true
            } else {
              return false
            }
          } catch (error) {
            console.log(error);
            return false;
          }
        },
      },
    ];

    // Iteramos sobre la lista de eventos y registramos los manejadores correspondientes
    for (let i = 0; i < webPlayerEvents.length; i++) {
      const event = webPlayerEvents[i];

      if (event.once) {
        event.handle
          ? ipcMain.handleOnce(event.name, event.action)
          : ipcMain.once(event.name, event.action);
      } else {
        event.handle
          ? ipcMain.handle(event.name, event.action)
          : ipcMain.on(event.name, event.action);
      }

      console.log(`${event.name} event was successfully registered`);
    }
  }
}

// Exportamos la clase para que pueda ser utilizada en otros módulos
module.exports = IpcMain;
