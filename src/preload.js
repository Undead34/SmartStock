import { contextBridge, ipcRenderer } from "electron";

const API = {
  send(channel, ...args) {
    const channels = ["smartstock:register:user", "smartstock:login:user", "smartstock:recovery:user", "smartstock:open-external"];

    if (typeof channel === "string" && channels.includes(channel)) {
      ipcRenderer.send(channel, ...args);
    }
  },

  receive(channel, callback) {
    const channels = ["smartstock:register:user", "smartstock:login:user", "smartstock:recovery:user"];

    if (typeof channel === "string" && channels.includes(channel)) {
      ipcRenderer.on(channel, callback);
    }

    return () => {
      ipcRenderer.removeListener(channel, callback)
    }
  },

  async invoke(channel, ...args) {
    const channels = ["smartstock:login:token", "smartstock:validate:code"];

    if (typeof channel === "string" && channels.includes(channel)) {
      return await ipcRenderer.invoke(channel, ...args);
    }
  },
};

contextBridge.exposeInMainWorld("SmartStock", API);