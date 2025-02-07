/**
 * Class representing a zombie character in the game.
 * It extends the `MovableObject` class and has functionality for walking, dying, and poison-death animations.
 * Each zombie has random starting positions and speeds, and can be marked as dead or invulnerable.
 */
class Zombies extends MovableObject{

       /**
     * Array to store the positions of all zombies in the game.
     * This helps ensure zombies are not spawned too close to each other.
     * @type {number[]}
     */
    static zombiePositions = [];
    width=55;
    height=80;
    y= 345;
    isDead = false;
    isInvulnerable = false;

       /**
     * List of images for the animation.
     * @type {string[]}
     */
    Images_Walking =[
        './img/zombie3/walk/Walk1.png',
        './img/zombie3/walk/Walk2.png',
        './img/zombie3/walk/Walk3.png', 
        './img/zombie3/walk/Walk4.png',
        './img/zombie3/walk/Walk5.png',
        './img/zombie3/walk/Walk6.png',
    ];
    
    Images_Dead =[
        './img/zombie3/dead/Dead1.png',
        './img/zombie3/dead/Dead2.png',
        './img/zombie3/dead/Dead3.png',
        './img/zombie3/dead/Dead4.png',
        './img/zombie3/dead/Dead5.png',
        './img/zombie3/dead/Dead6.png',
        './img/zombie3/dead/Dead7.png',
        './img/zombie3/dead/Dead8.png',
    ];
    
    Images_Posion_Dead =[
        'img/zombie3/dead/DEAD.png'
    ];

    /**
     * Creates an instance of a zombie with random positioning and speed.
     * Also starts the animation and movement of the zombie.
     */
    constructor(){
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Posion_Dead);

        this.x = this.generateRandomPosition(); // Verwende die neue Methode für zufällige Position
        this.speed = 0.08 + Math.random() * 0.25;
        this.animation();
    }

    /**
     * Generates a random X position for the zombie, ensuring it is not too close to other zombies.
     * @returns {number} The random X position for the zombie.
     */
    generateRandomPosition() {
        const minDistance = 150; // Mindestabstand zwischen Zombies
        let x = 280 + Math.random() * 500; // Generiere zufällige Position

        // Überprüfe, ob der Zombie zu nahe an anderen Zombies ist
        for (let pos of Zombies.zombiePositions) {
            if (Math.abs(pos - x) < minDistance) {
                // Wenn der Abstand zu einem anderen Zombie zu gering ist, eine neue Position generieren
                x = 280 + Math.random() * 500;
                pos = null; // Beende die Schleife, wenn ein neuer Wert generiert wurde
                break;
            }
        }

        Zombies.zombiePositions.push(x); // Speichere die Position in der Liste
        return x;
    }

     /**
     * Resets the zombie positions, clearing the stored positions.
     * This is useful when restarting the game.
     */
    static resetZombiePositions() {
        this.zombiePositions = []; // Reset der Positionsliste bei Spielneustart
    }

      /**
     * Starts the zombie's walking animation and movement.
     * @returns {void}
     */
    animation(){
        setInterval(()=>{     
            if(!this.isDead){
                this.moveLeft();  
            }
        }, 1000/ 60);
   

        setInterval(() => {
            if(!this.isDead){
                this.playAnimation(this.Images_Walking);
                AudioHub.playSound(AudioHub.enemyWalking_sound);
            }
        }, 250);
    }

       /**
     * Plays the zombie's death animation.
     * Once the animation completes, the `onAnimationComplete` callback is triggered.
     * @param {Function} onAnimationComplete - A callback function to be executed when the animation completes.
     * @returns {void}
     */
    playDeadAnimation(onAnimationComplete) {
        this.isDead = true;
        let currentFrame = 0;
        this.width=90;
        this.height=50;
        this.y = 365; 

        const deadAnimationInterval = setInterval(() => {
            if (currentFrame < this.Images_Dead.length) {
                this.img = this.imageCache[this.Images_Dead[currentFrame]];
                currentFrame++;
                AudioHub.playSound(AudioHub.enemyHurt);
                    AudioHub.enemyWalking_sound.pause();
         
            } else {
                clearInterval(deadAnimationInterval); // Animation beendet
                if (onAnimationComplete) onAnimationComplete(); // Callback aufrufen
            }
        }, 80);
    }

      /**
     * Plays the poisoned-dead animation.
     * Once the animation completes, the `onAnimationComplete` callback is triggered.
     * @param {Function} onAnimationComplete - A callback function to be executed when the animation completes.
     * @returns {void}
     */
    playPoisonDeadAnimation(onAnimationComplete) {
        this.isDead = true;
        this.width = 130;
        this.height = 20;
        this.y = 430;
        if(AudioHub.enemyHurt.readyState >= 2){
            AudioHub.playSound(AudioHub.enemyHurt);
        }
        AudioHub.enemyWalking_sound.pause();

        this.img = this.imageCache[this.Images_Posion_Dead[0]];
    
        setTimeout(() => {
            if (onAnimationComplete) onAnimationComplete(); // Callback aufrufen
        }, 900); // Bild wird 2 Sekunden lang angezeigt
    }
    
}