import { SHAPES  } from "../../utils.js";
const {TRIANGLE, SQUARE, DIAMOND } = SHAPES;

export default class Game extends Phaser.Scene {
  constructor() {
    super("game");
  }

  init() {
    this.shapesRecolected = {
      [TRIANGLE]: { count: 0, score: 10 },
      [SQUARE]: { count: 0, score: 20 },
      [DIAMOND]: { count: 0, score: 30}
    };
  }

  preload(){
    this.load.image("sky", "./assets/images/sky.png");
    this.load.image("ground", "./assets/images/platform.png");    
    this.load.image(DIAMOND, "./assets/images/diamond.png");    
    this.load.image(TRIANGLE, "./assets/images/triangle.png");  
    this.load.image(SQUARE, "./assets/images/square.png");  
    this.load.image("ninja", "./assets/images/ninja.png");  
    this.load.image("popeye", "./assets/images/popeye.png");  
  }

  create() {
    this.add.image(400, 300, "sky").setScale(0.555);//agrega el cielo o background

    this.add.image(700, 100, "popeye").setScale(0.555);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();//para actualizar ambos colider y se adaoten a la nueva pantalla

    this.player = this.physics.add.sprite(100, 450, "ninja");//muestra el sprite del ninja
    this.player.setCollideWorldBounds(true);//agregar colisiones al sprite

    //add shape group
    this.shapesGroup = this.physics.add.group();
    //this.shapesGroup = this.physics.add.group();
    //this.shapesGroup.create(100, 0, "diamond");
    //this.shapesGroup.create(200, 0, "triangle");
    //this.shapesGroup.create(300, 0, "square");
    //create event to add shapes
    this.time.addEvent({
      delay: 1500,
      callback: this.addShape,
      callbackScope: this,
      loop: true,
    });


    this.cursors = this.input.keyboard.createCursorKeys();//crear cursores

    //agrega colisiones
    this.physics.add.collider(this.player, platforms);
    this.physics.add.collider(this.player, this.shapesGroup);
    this.physics.add.collider(platforms, this.shapesGroup)

    //add overlap between player and shapes
    this.physics.add.overlap(
      this.player,
      this.shapesGroup,
      this.collectShape, //funcion que llama cuando player choca con shape
      null, 
      this
    )
  }
 
  update() {
    //se actualiza el movimiento del jugador
    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-250);
    } else {
      if (this.cursors.right.isDown) {
        this.player.setVelocityX(250);
      } else {
        this.player.setVelocityX(0);
      }
    }
    //actualizacion del salto
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.setVelocityY(-330);
    }
  }

  addShape() {
    // get random shape
    const randomShape = Phaser.Math.RND.pick(["diamond", "square", "triangle"]);

    // posiciones aleatorias x
    const randomX = Phaser.Math.RND.between(0,800);

    //add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape);

  }

  collectShape(player, shape) {
    //remove shape from screen
    shape.disableBody(true, true);

    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    console.log(this.shapesRecolected)
  }
}
