export default class MainScene extends Phaser.Scene {
  constructor() {
    super({ key: "MainScene", active: false });
  }
  create() {
    this.barrier = this.add.image(0, 0, "barrier").setOrigin(0).setScale(1);
    this.robot = this.add.image(0, 0, "robot").setOrigin(0).setScale(1);
    this.robot.x = this.barrier.x + (this.barrier.width - this.robot.width) / 2;
    this.robot.y = this.barrier.y + this.barrier.height / 1.5;
    this.puddle = this.add
      .image(
        this.robot.x + this.robot.width,
        this.robot.y + this.robot.height / 2,
        "puddle"
      )
      .setOrigin(0)
      .setScale(1);

    this.cameras.main.startFollow(this.robot, true, 0.09, 0.09);
    this.cameras.main.setZoom(6 / window.devicePixelRatio);
  }
}
