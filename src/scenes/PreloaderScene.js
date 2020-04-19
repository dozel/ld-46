import barrier from "../assets/images/barrier.png";
import puddle from "../assets/images/puddle.png";
import robot from "../assets/images/robot.png";
import Pixilator from "../assets/fonts/Pixilator.ttf";

import Animations from "../js/Animations";
import Colors from "../js/styles/colors";

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super({ key: "PreloaderScene", active: true });
  }
  preload() {
    this.width = this.cameras.main.width;
    this.height = this.cameras.main.height;

    this.cameras.main.backgroundColor = Phaser.Display.Color.HexStringToColor(
      "#000000"
    );
    this.progressBar = this.createBar();

    this.loadCompleted = false;

    this.load.on(
      "progress",
      (value) => {
        if (value >= 1) {
          this.loadCompleted = true;
        }
        Animations.tween({
          scene: this,
          targets: this.progressBar,
          duration: 200,
          changes: {
            width: Math.min(value * this.width, (this.width * 2) / 3)
          }
        });
      },
      this
    );

    this.preloadAssets();
  }
  createBar(color = Colors.allColors.gray) {
    return this.add
      .rectangle(0, 0, 0, this.height, Colors.hexColor(color))
      .setOrigin(0);
  }
  preloadAssets() {
    const assets = this.assetsToPreload();
    for (let i = 0; i < assets.length; i++) {
      const asset = assets[i];
      this.load[asset.type](asset.key, asset.value, asset.atlasJSON);
    }
  }
  assetsToPreload() {
    const assets = [
      { type: "image", key: "barrier", value: barrier },
      { type: "image", key: "puddle", value: puddle },
      { type: "image", key: "robot", value: robot }
    ];
    return assets;
  }
  disappear() {
    this.fadeInColors(() => {
      // this.emitter.emit("playScene", "MainScene");
      this.scene.start("MainScene");
    });
  }
  fadeInColors(cb) {
    const colors = Colors.allColors();
    colors.push(Colors.allColors.gray);
    Animations.tween(
      {
        scene: this,
        targets: this.progressBar,
        changes: {
          width: this.width
        }
      },
      this
    );
    for (let i = 0; i < colors.length; i++) {
      const targetBar = this.createBar(colors[i]);
      Animations.tween(
        {
          scene: this,
          targets: targetBar,
          delay: i * 150 + 100,
          duration: 500 - i * 25,
          changes: {
            width: this.width
          },
          cb: () => {
            if (i === colors.length - 1) {
              cb();
            }
          }
        },
        this
      );
    }
  }
  update() {
    if (this.loadCompleted) {
      this.loadCompleted = false;
      this.disappear();
    }
  }
}
