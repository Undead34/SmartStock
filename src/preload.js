// Importamos las funciones y objetos necesarios desde el módulo "electron"
import { contextBridge, ipcRenderer } from "electron";

// Creamos un objeto "API" que contendrá las funciones que estarán disponibles en el contexto del renderer
const API = {
  // Función para enviar mensajes al proceso principal a través de canales predefinidos
  send(channel, ...args) {
    // Lista de canales permitidos para enviar mensajes
    const channels = ["smartstock:register:user", "smartstock:login:user", "smartstock:recovery:user", "smartstock:open-external"];

    // Si el canal es válido, enviamos el mensaje al proceso principal
    if (typeof channel === "string" && channels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },

  // Función para recibir mensajes del proceso principal a través de canales predefinidos
  receive(channel, callback) {
    // Lista de canales permitidos para recibir mensajes
    const channels = ["smartstock:register:user", "smartstock:login:user", "smartstock:recovery:user"];

    // Si el canal es válido, nos suscribimos a los eventos del proceso principal
    if (typeof channel === "string" && channels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }

    // Retornamos una función que permitirá eliminar la suscripción cuando sea necesario
    return () => {
      ipcRenderer.removeListener(channel, callback);
    };
  },

  // Función asíncrona para invocar mensajes al proceso principal y esperar una respuesta
  async invoke(channel, ...args) {
    // Lista de canales permitidos para invocar mensajes
    const channelStock = ["smartstock:get:stock", "smartstock:update:stock", "smartstock:post:stock", "smartstock:delete:stock"]
    const channelBuys = ["smartstock:get:buys", "smartstock:update:buys", "smartstock:delete:buys", "smartstock:post:buys"]
    const channelCustomers = ["smartstock:get:customers", "smartstock:update:customers", "smartstock:delete:customers", "smartstock:post:customers"]
    const channels = ["smartstock:login:token", "smartstock:validate:code", "smartstock:change:password", "smartstock:send:email", "smartstock:get:userinfo", "smartstock:set:role", "smartstock:delete:user", "smartstock:summary:equipment", "smartstock:get:users", ...channelStock, ...channelBuys, ...channelCustomers];

    // Si el canal es válido, invocamos el mensaje al proceso principal y esperamos la respuesta
    if (typeof channel === "string" && channels.includes(channel)) {
      return await ipcRenderer.invoke(channel, ...args);
    }
  },
};

// Exponemos el objeto "API" en el mundo global del renderer utilizando "contextBridge"
contextBridge.exposeInMainWorld("SmartStock", API);
