export default class gameOver extends Phaser.Scene {
    
    constructor() {
      super("Gameover");
    }

    create () {
        this.add.image(400, 300, "gameover")
        .setScale(2)
        .setInteractive()
        .on ("pointerdown", () => this.scene.start("Game")); ;
    }
}