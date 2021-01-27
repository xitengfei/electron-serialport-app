const { app, BrowserWindow } = require('electron')
const SerialPort = require('serialport');

app.allowRendererProcessReuse = false

SerialPort.list().then(
  ports => {
    console.log('ports', ports);
  },
  err => console.error(err)
);

function createWindow () {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')

  win.webContents.openDevTools()
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})