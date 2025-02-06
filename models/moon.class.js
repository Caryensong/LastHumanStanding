/**
 * Represents the moon in the game, displayed as part of the background.
 * The moon moves across the screen and serves as a background element, creating a dynamic night-time atmosphere.
 * 
 * @class Moon
 * @extends MovableObject
 */
class Moon extends MovableObject {
    height = 30;
    width = 30;
    y = 20;
    x = 600;

    /**
       * Creates an instance of the Moon object, loading the moon image as a background element.
       * The moon is typically displayed in the sky and is part of the environment.
       */
    constructor() {
        super().loadImage('./img/background/moon.png');
    }
}