const Database = require("./database/Database")
const nodemailer = require("nodemailer");
const { ipcMain, shell } = require("electron")
const crypto = require("crypto")

class IpcMain {
  constructor(mainWindow) {
    this.mainWindow = mainWindow
    this.db = new Database({
      host: "localhost",
      user: "root",
      password: null,
      database: "inventario",
    })

    const webPlayerEvents = [
      {
        name: "smartstock:register:user",
        handle: false,
        once: false,
        action: async (event, data) => {
          try {
            const salt = crypto.randomBytes(16).toString('hex');
            const derivedKey = crypto.pbkdf2Sync(data.password, salt, 100000, 64, "sha512").toString('hex');

            const User = {
              FullName: data.name,
              Email: data.email,
              Password: `${salt}:${derivedKey}`,
              LoginToken: null,
              TokenExpirationDate: null,
              TempLoginCodes: null
            }

            let result = await this.db.existUser(data.email);

            if (result.length === 0) {
              await this.db.createUser(User);
              event.sender.send("smartstock:register:user", { ERROR: null, CODE: "OK" });
            } else {
              // Handle the case when the user already exists
              event.sender.send("smartstock:register:user", { ERROR: "User already exists", CODE: "ALREADY_EXISTS" });
            }
          } catch (error) {
            console.log(error)
            event.sender.send("smartstock:register:user", {
              ERROR: "Unknown error try again",
              CODE: "ERROR_UNKNOWN"
            })
          }
        },
      },
      {
        name: "smartstock:login:user",
        handle: false,
        once: false,
        action: async (event, data) => {
          try {
            const existingUser = await this.db.existUser(data.email);

            if (existingUser.length === 0) {
              event.sender.send("smartstock:login:user", {
                ERROR: "Invalid password/email",
                CODE: "INVALID_PASSWORD_EMAIL"
              });
            } else {
              try {
                const [salt, storedKey] = existingUser[0].Password.split(':');
                const derivedKey = crypto.pbkdf2Sync(data.password, salt, 100000, 64, "sha512").toString('hex');

                if (derivedKey === storedKey) {
                  const token = crypto.randomBytes(64).toString("base64")
                  this.db.insertToken(existingUser[0].ID, token)
                  event.sender.send("smartstock:login:user", {
                    ERROR: null,
                    CODE: "LOGIN_SUCCESS",
                    TOKEN: token,
                    ID: existingUser[0].ID
                  });
                } else {
                  event.sender.send("smartstock:login:user", {
                    ERROR: "Invalid password/email",
                    CODE: "INVALID_PASSWORD_EMAIL"
                  });
                }
              } catch (error) {
                console.log(error);
                event.sender.send("smartstock:login:user", {
                  ERROR: "Unknown error occurred during password verification",
                  CODE: "ERROR_VERIFYING_PASSWORD"
                });
              }
            }
          } catch (error) {
            console.log(error);
            event.sender.send("smartstock:login:user", {
              ERROR: "Unknown error occurred while checking user existence",
              CODE: "ERROR_UNKNOWN"
            });
          }
        }
      },
      {
        name: "smartstock:login:token",
        handle: true,
        once: false,
        action: async (event, data) => {
          return true
        }
      },
      {
        name: "smartstock:recovery:user",
        handle: false,
        once: false,
        action: async (event, email) => {
          try {
            const result = await this.db.existUser(email)

            if (result.length !== 0) {
              const code = Math.floor(Math.random() * 1000000)
              this.db.saveTempLoginCode(result[0].ID, code)

              const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                  user: "maizogabriel@gmail.com",
                  pass: "rergeoutukijlcuc"
                }
              });

              const info = await transporter.sendMail({
                from: "Gabriel Maizo <maizogabriel@gmail.com>",
                to: email,
                subject: "Recuperar contraseña de SmartStock",
                html: `Tu código de recuperación es: <b>${code}</b>`,
              });

              console.log("Message sent: %s", info);
              if (info.rejected.length === 0) {
                event.sender.send("smartstock:recovery:user", {
                  ERROR: null,
                  CODE: "OK"
                })
              } else {
                event.sender.send("smartstock:recovery:user", {
                  ERROR: "An error occurred while sending the email, check that you have open ports and/or firewall permissions, or the credentials are invalid.",
                  CODE: "EMAIL_SEND_ERROR"
                })
              }

            } else {
              event.sender.send("smartstock:recovery:user", {
                ERROR: "The user is not registered",
                CODE: "NO_EXISTS"
              });
            }
          } catch (error) {
            console.log(error)
            event.sender.send("smartstock:recovery:user", {
              ERROR: "Unknown error try again",
              CODE: "ERROR_UNKNOWN"
            })
          }
        }
      },
      {
        name: "smartstock:validate:code",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const result = await this.db.existUser(data.email)

            if (result.length !== 0) {
              if (result[0].TempLoginCodes === data.code) {
                this.db.saveTempLoginCode(result[0].ID, null)
                return { ERROR: null, CODE: "OK", id: result[0].ID }
              } else {
                return { ERROR: "the code is not match", CODE: "INVALID_CODE" }
              }
            } else {
              return { ERROR: "The user is not registered", CODE: "NO_EXISTS" }
            }
          } catch (error) {
            console.log(error)
            return {
              ERROR: "Unknown error try again",
              CODE: "ERROR_UNKNOWN"
            }
          }
        }
      },
      {
        name: "smartstock:open-external",
        handle: false,
        once: false,
        action: async (event, data) => {
          shell.openExternal(data)
        }
      },
      {
        name: "smartstock:change:password",
        handle: true,
        once: false,
        action: async (event, data) => {
          try {
            const salt = crypto.randomBytes(16).toString('hex');
            const derivedKey = crypto.pbkdf2Sync(data.password, salt, 100000, 64, "sha512").toString('hex');

            const password = `${salt}:${derivedKey}`
            const result = await this.db.changePasswordByID(password, data.id)

            
            if (result.affectedRows === 0) {
              return {
                ERROR: "The user is not registered",
                CODE: "NO_EXISTS"
              }
            }

            return {
              ERROR: null,
              CODE: "OK"
            }
          } catch (error) {
            console.log(error)
            return {
              ERROR: "Unknown error try again",
              CODE: "ERROR_UNKNOWN"
            }
          }
        }
      }
    ];

    for (let i = 0; i < webPlayerEvents.length; i++) {
      const event = webPlayerEvents[i];

      if (event.once) {
        event.handle ? ipcMain.handleOnce(event.name, event.action) : ipcMain.once(event.name, event.action);
      } else {
        event.handle ? ipcMain.handle(event.name, event.action) : ipcMain.on(event.name, event.action);
      }

      console.log(`${event.name} event was successfully registered`)
    }
  }
}

module.exports = IpcMain



    // // Conéctate a la base de datos
    // this.db.connect();

    // // Ejemplo de creación de un nuevo equipo
    // const newEquipment = {
    //   Equipment_Name: 'Laptop',
    //   Equipment_Type: 'Electronics',
    //   Serial_Number: 'ABCD1234',
    //   Model: 'Dell Inspiron',
    //   Code: '1234',
    //   Entry_Date: '2023-08-02',
    //   Observation: 'New laptop added to inventory',
    //   Location: 'Storage Room',
    // };

    // this.db.createEquipment(newEquipment, (equipmentID) => {
    //   console.log(`New equipment ID: ${equipmentID}`);
    // });

    // // Ejemplo de actualización de un equipo existente
    // const equipmentIDToUpdate = 1;
    // const updatedData = {
    //   Equipment_Name: 'Updated Laptop',
    //   Model: 'Dell XPS',
    //   Location: 'Office',
    // };

    // this.db.updateEquipment(equipmentIDToUpdate, updatedData, () => {
    //   console.log('Equipment updated successfully!');
    // });

    // // Ejemplo de eliminación de un equipo
    // const equipmentIDToDelete = 2;
    // this.db.deleteEquipment(equipmentIDToDelete, () => {
    //   console.log('Equipment deleted successfully!');
    // });

    // // Desconéctate de la base de datos al finalizar las operaciones
    // this.db.disconnect();