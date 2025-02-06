/**
 * Represents a cloud in the game world, which moves from right to left with a given opacity.
 * Extends from the `MovableObject` class, inheriting its properties and methods for movement.
 * 
 * @class Cloud
 * @extends MovableObject
 */
class Cloud extends MovableObject {
    y = -60;
    height = 250;
    width = 350;
    opacity = 1;

     /**
     * Creates an instance of the Cloud class.
     * 
     * @param {string} imagePath The path to the cloud image to be loaded.
     * @param {number} x The horizontal position (x-coordinate) of the cloud.
     * @param {number} [opacity=1] The opacity of the cloud (default is 1).
     */
    constructor(imagePath, x, opacity = 1) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 720;
        this.opacity = opacity;
        this.animation();
    }

    /**
     * Animates the cloud by making it move left at a constant rate.
     * The cloud will move to the left every frame (60 times per second).
     * 
     * @private
     */
    animation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }


}
