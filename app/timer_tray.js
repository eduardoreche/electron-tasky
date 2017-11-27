const electron = require('electron');
const { app, Menu, Tray } = electron;

class TimerTray extends Tray {
  constructor(iconPath, mainWindow) {
    super(iconPath);

    this.mainWindow = mainWindow;

    this.setToolTip('Timer App');
    this.on('click', this.onClick.bind(this));
    this.on('right-click', this.onRightClick.bind(this));
  }

  onClick(event, bounds) {
    const { x, y } = bounds;
    const { height, width } = this.mainWindow.getBounds();

    if (this.mainWindow.isVisible()) {
      this.mainWindow.hide();
    } else {
      const yPosition = process.platform === 'darwin' ? y : height - height / 2;
      const xPosition =
        process.platform === 'darwin' ? x - width / 2 : x - (width + 10);

      this.mainWindow.setBounds({
        x: xPosition,
        y: yPosition,
        height,
        width
      });
      this.mainWindow.show();
    }
  }

  onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: 'Quit',
        click: () => {
          app.quit();
        }
      }
    ]);

    this.popUpContextMenu(menuConfig);
  }
}

module.exports = TimerTray;
