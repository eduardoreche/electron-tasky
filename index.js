const path = require('path');
const electron = require('electron');
const MainWindow = require('./app/main_window');
const TimerTray = require('./app/timer_tray');

const { app, ipcMain } = electron;

let mainWindow;
let tray;
let iconPath;

app.on('ready', () => {
  if (process.platform === 'darwin') app.dock.hide();

  mainWindow = new MainWindow(`file://${__dirname}/src/index.html`);

  const iconName =
    process.platform === 'win32' ? 'windows-icon.png' : 'iconTemplate.png';
  iconPath = path.join(__dirname, `./src/assets/${iconName}`);

  tray = new TimerTray(iconPath, mainWindow);
});

ipcMain.on('update-timer', (event, timeLeft) => {
  if (process.platform === 'darwin') {
    tray.setTitle(timeLeft);
  } else {
    tray.displayBalloon({
      icon: iconPath,
      title: '',
      content: timeLeft
    });
  }
});
