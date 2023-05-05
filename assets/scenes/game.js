import { SHAPES  } from "../../utils.js";
const {TRIANGLE, SQUARE, DIAMOND, STAR} = SHAPES;

export default class Game extends Phaser.Scene {
  score;
  gameOver;
  constructor() {
    super("Game");
  }

  init() {
    this.gameOver = false;
    this.shapesRecolected = {
      [TRIANGLE]: { count: 0, score: 10 },
      [SQUARE]: { count: 0, score: 20 },
      [DIAMOND]: { count: 0, score: 30},
      [STAR]: { count: 0, score: -10}
    };
  }


  create() {
    this.add.image(400, 300, "sky").setScale(0.555);//agrega el cielo o background

    this.add.image(710, 100, "moon").setScale(0.555);

    let platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, "ground").setScale(2).refreshBody();//para actualizar ambos colider y se adaoten a la nueva pantalla

    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    


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
    );

    //add score on scene
    this.score = 0;
    this.scoreText = this.add.text(20, 20, "Score:" + this.score, {
      frontSize: "32px",
      frontStyle: "bold",
      fill: "#FFFFFF",
    });

    //agregar timer
    this.timer = 30;
    this.timerText = this.add.text(750, 20, this.timer, {
      frontSize: "32px",
      frontStyle: "bold",
      fill: "#FFFFFF"
    });

    this.time.addEvent({
      delay: 1000,
      callback: this.onSecond,
      callbackScope:this,
      loop: true,
    }

    )
  }
 
  update() {
    //condicion para ganar y mostrar escena
    if (this.score>100 &&
      this.shapesRecolected[TRIANGLE].count >= 2
      && this.shapesRecolected[SQUARE].count >= 2
      && this.shapesRecolected[DIAMOND].count >= 2) {
      this.scene.start("Win");
    }
    if (this.gameOver) {
      this.scene.start("Gameover");
    }

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
    const randomShape = Phaser.Math.RND.pick(["diamond", "square", "triangle", "star"]);

    // posiciones aleatorias x
    const randomX = Phaser.Math.RND.between(0,800);

    //add shape to screen
    this.shapesGroup.create(randomX, 0, randomShape).setCircle(25, 7, 7)

  }

  collectShape(player, shape) {
    //remove shape from screen
    shape.disableBody(true, true);

    const shapeName = shape.texture.key;
    this.shapesRecolected[shapeName].count++;

    this.score += this.shapesRecolected[shapeName].score;
    this.scoreText.setText(`Score: ${this.score.toString()}`);

    console.log(this.shapesRecolected);
  }

  onSecond(){
    this.timer--;
    this.timerText.setText (this.timer);
    if(this.timer <= 0) {
      this.gameOver = true;
    }
  }
}
