export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {}

  preload(){
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png");    
    this.load.image("diamond", "./assets/images/diamond.png");    
    this.load.image("triangle", "./assets/images/triangle.png");  
    this.load.image("square", "./assets/images/square.png");  
    this.load.image("ninja", "./assets/images/ninja.png");  
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);//agrega el cielo o background

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();//para actualizar ambos colider y se adaoten a la nueva pantalla

    this.player = this.physics.add.sprite(100, 450, "ninja");//muestra el sprite del ninja
    this.player.setCollideWorldBounds(true);//agegar colisiones al sprite

    this.shapesGroup = this.physics.add.group();
    this.shapesGroup.create(100, 0, "diamond");
    this.shapesGroup.create(200, 0, "triangle");
    this.shapesGroup.create(300, 0, "square");
  }
 
  update() {}
}
