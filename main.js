const { app, BrowserWindow, dialog } = require('electron');
const path = require('path');
const { spawn } = require('child_process');
const http = require('http');

let mainWindow;
let pythonProcess;
const PORT = 8888;

function checkBackendReady(retries = 30, delay = 500) {
  return new Promise((resolve, reject) => {
    let count = 0;
    const interval = setInterval(() => {
      count++;
      const req = http.get(`http://127.0.0.1:${PORT}/`, (res) => {
        clearInterval(interval);
        resolve(true);
      });
      req.on('error', (err) => {
        if (count >= retries) {
          clearInterval(interval);
          reject(new Error("Python backend engine failed to respond within timeout."));
        }
      });
    }, delay);
  });
}

function startPythonBackend() {
  const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';
  
  pythonProcess = spawn(pythonCmd, ['-m', 'uvicorn', 'app:app', '--host', '127.0.0.1', '--port', `${PORT}`], {
    cwd: __dirname,
    stdio: 'ignore',
    shell: true
  });

  pythonProcess.on('error', (err) => {
    console.error('Failed to start python backend:', err);
  });
}

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 800,
    minWidth: 1000,
    minHeight: 700,
    title: "RJSC Corporate Automation Suite",
    autoHideMenuBar: true,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  // Load the running application URL
  mainWindow.loadURL(`http://127.0.0.1:${PORT}/`);

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(async () => {
  try {
    startPythonBackend();
    await checkBackendReady();
    createWindow();
  } catch (err) {
    dialog.showErrorBox(
      "Initialization Error",
      "Could not connect to RJSC engine. Please ensure Python is installed with required packages.\n\n" + err.message
    );
    app.quit();
  }
});

app.on('window-all-closed', () => {
  if (pythonProcess) {
    try {
      if (process.platform === 'win32') {
        spawn("taskkill", ["/pid", pythonProcess.pid, '/f', '/t']);
      } else {
        pythonProcess.kill();
      }
    } catch (e) {
      console.error("Error killing python process:", e);
    }
  }
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
