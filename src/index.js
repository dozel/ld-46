import Phaser from "phaser";
import PreloaderScene from "./scenes/PreloaderScene";
import MainScene from "./scenes/MainScene";

const config = {
  type: Phaser.AUTO,
  width: "100%",
  height: "100%",
  scene: [PreloaderScene, MainScene],
  scale: {
    mode: Phaser.Scale.NONE,
    width: window.innerWidth * window.devicePixelRatio,
    height: window.innerHeight * window.devicePixelRatio,
    zoom: 1 / window.devicePixelRatio
  },
  render: {
    antialias: false,
    pixelArt: true,
    roundPixels: true
  }
};

const game = new Phaser.Game(config);
