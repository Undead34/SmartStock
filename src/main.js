const { app, BrowserWindow, Menu, shell } = require('electron');
require('dotenv').config()

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1280,
    minHeight: 720,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
    icon: "../icons/netready.png",
  });

  // and load the index.html of the app.
  mainWindow.loadURL(MAIN_WINDOW_WEBPACK_ENTRY);

  new (require("./ipcMain"))(mainWindow)

  const template = []

  if (process.env.NODE_ENV === "development") {

    template.push({
      label: "DevTools",
      click() {
        mainWindow.webContents.openDevTools();
      }
    })

    mainWindow.webContents.openDevTools();
  }

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)

  app.on("second-instance", () => {
    // Someone tried to run a second instance, we should focus our window.
    if (mainWindow) {
      if (mainWindow.isMinimized()) mainWindow.restore()
      mainWindow.focus()
    }
  })
};

if (!app.requestSingleInstanceLock()) {
  app.quit()
}
// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.



// { role: 'reload' },
// { role: 'forcereload' },
// { role: 'toggledevtools' },
// { type: 'separator' },
// { role: 'resetzoom' },
// { role: 'zoomin' },
// { role: 'zoomout' },
// { type: 'separator' }


// 486e31543645db71dbfcb78043519ede

// curl --location --request POST "https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY" --form "image=R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"




// {
//   label: 'Productos',
//   submenu: [
//     {
//       label: 'Stock',
//       click() {
//         console.log('👋 productos')
//       },
//       accelerator: 'CmdOrCtrl+P'
//     },
//     { type: 'separator' },
//     {
//       label: 'Registro',
//       submenu: [
//         {
//           label: 'Registro de productos',
//           click() {
//             console.log('👋 productos')
//           },
//           accelerator: 'CmdOrCtrl+R'
//         },
//         {
//           label: 'Registro de productos en stock',
//           click() {
//             console.log('👋 productos en stock')
//           },
//           accelerator: 'CmdOrCtrl+Shift+R'
//         },
//         {
//           label: 'Registro de notas de entrega',
//           click() {
//             console.log('👋 notas de entrega')
//           },
//           accelerator: 'CmdOrCtrl+N'
//         },
//       ]
//     },
//     {
//       label: 'Edición',
//       submenu: [
//         {
//           label: 'Editar productos',
//           click() {
//             console.log('👋 productos')
//           },
//           accelerator: 'CmdOrCtrl+E'
//         },
//         {
//           label: 'Editar productos en stock',
//           click() {
//             console.log('👋 productos en stock')
//           },
//           accelerator: 'CmdOrCtrl+Shift+E'
//         },
//         {
//           label: 'Editar notas de entrega',
//           click() {
//             console.log('👋 notas de entrega')
//           },
//           accelerator: 'CmdOrCtrl+Shift+N'
//         },
//       ]
//     },
//   ]
// },
// {
//   label: 'Control y seguimiento',
//   submenu: [
//     {
//       label: 'En stock',
//       click() {
//         console.log('👋 productos')
//       }
//     },
//     {
//       label: 'En tránsito',
//       click() {
//         console.log('👋 productos')
//       }
//     },
//     { type: 'separator' },
//     {
//       label: 'Entrada de productos',
//       click() {
//         console.log('👋 productos')
//       }
//     },
//     {
//       label: 'Salida de productos',
//       click() {
//         console.log('👋 productos')
//       }
//     },
//   ]
// },