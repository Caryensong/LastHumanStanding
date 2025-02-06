/**
 * Class representing a zombie hand with animation and vertical movement.
 * It extends the `MovableObject` and loads a set of images for animation.
 */
class ZombieHand extends MovableObject{

    /**
     * List of images representing the animation of the zombie hand.
     * @type {string[]}
     */
    IMAGES =[
        './img/Zombie hand/7.png',
        './img/Zombie hand/8.png',
        './img/Zombie hand/9.png',
        './img/Zombie hand/10.png',
    ];

      /**
     * Creates an instance of the ZombieHand with specified position and size.
     * @param {number} x - The X coordinate of the hand.
     * @param {number} y - The Y coordinate of the hand.
     * @param {number} width - The width of the hand.
     * @param {number} height - The height of the hand.
     */
    constructor(x, y, width, height){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width =width;
        this.height = height;
        this.offset = {top: 5, left: 5, right: 5, bottom: 5}; 
        this.animation();
        this.movement();
    }

     /**
     * Starts the animation of the zombie hand by cycling through images at regular intervals.
     * The animation switches the image every 300ms, and after the last image, it loops back to the first one.
     * @returns {void}
     */
    animation() {
        let currentImageIndex = 0; // Start mit dem ersten Bild
        setInterval(() => {
            this.loadImage(this.IMAGES[currentImageIndex]); // Bild wechseln
            currentImageIndex++;
            if (currentImageIndex >= this.IMAGES.length) {
                currentImageIndex = 0;
            }
        }, 300);
    }

       /**
     * Moves the zombie hand in a sinusoidal pattern along the Y-axis.
     * The Y position of the hand is periodically adjusted to create an up-and-down movement.
     * @returns {void}
     */
    movement() {
        let amplitude = 15;
        let frequency = 0.05;  // Geschwindigkeit der Bewegung
        let startY = this.y;  // Anfangsposition der Y-Koordinate

        // Setzt ein Intervall, um die Y-Position zu verändern
        setInterval(() => {
            this.y = startY + amplitude * Math.sin(frequency * Date.now()); // Berechnet die neue Y-Position
        }, 400); // Alle 20ms wird die Position aktualisiert
    }
}