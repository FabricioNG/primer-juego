export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  preload(){
    this.load.image("sky", "./assets/images/sky.png");
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);
  }
 
  update() {}
}
