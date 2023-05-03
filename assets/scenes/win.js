export default class Win extends Phaser.Scene {
    
    constructor() {
      super("Win");
    }

    create () {
        this.add.image(400, 300, "win")
        .setScale(2)
        .setInteractive()
        .on ("pointerdown", () => this.scene.start("Game")); ;
        
    }
}