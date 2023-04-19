export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  preload(){
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png");    
    this.load.image("ninja", "./assets/images/ninja.png");    
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();

    this.player = this.physics.add.sprite(100, 450, "ninja");
    this.player.setCollideWorldBounds(true);
  }
 
  update() {}
}
