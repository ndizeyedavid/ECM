const { app, BrowserWindow, Menu } = require("electron");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    // frame: false,
    title: "ECG",
    menuBar: false,

    icon: path.join(__dirname, "icon.png"),
    width: 1080,
    height: 800,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });
  Menu.setApplicationMenu(null);

  // win.loadFile("src/index.html");
  win.loadFile("src/login.html");
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// logo by oxurra on Freepik (https://www.freepik.com/free-psd/clean-business-card-template_10653931.htm#fromView=search&page=1&position=8&uuid=a6ab5429-e80c-4b49-8f74-433671771890)
