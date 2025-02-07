/**
 * Represents a drawable object in the game world. 
 * This object can load and draw an image on the canvas, and can also manage and cache images for later use.
 * It provides methods to draw the object and draw its bounding frame for debugging purposes.
 * 
 * @class DrawableObject
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 220;
    width = 155;
    height = 140;

    /**
        * Loads an image from a given file path.
        * 
        * @param {string} path The path to the image file to be loaded.
        * @returns {void}
        */
    loadImage(path) {
        this.img = new Image();  //existiert bereits <img id = "image" scr>  this.img = document.getElementByID ('image') 
        this.img.src = path;
    }

    /**
     * Draws the image of the object on the provided canvas context.
     * The image is drawn at the object's current position and with its current width and height.
     * 
     * @param {CanvasRenderingContext2D} ctx The canvas context to draw the image on.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

      /**
     * Draws a bounding box around the object for debugging purposes.
     * The bounding box is drawn if the object is an instance of certain classes like `Character`, `Zombies`, etc.
     * The box is drawn with a green stroke color and a width of 4.
     * 
     * @param {CanvasRenderingContext2D} ctx The canvas context to draw the bounding box on.
     * @returns {void}
     */
    drawFrame(ctx) {
        // if (this instanceof Character || this instanceof Zombies || this instanceof Endboss || this instanceof ThrowableObject || this instanceof ZombieHand) {
        //     ctx.beginPath();
        //     ctx.lineWidth = "4";
        //     ctx.strokeStyle = "green";
        //     ctx.rect(
        //         this.x + this.offset.left,
        //         this.y + this.offset.top,
        //         this.width - this.offset.left - this.offset.right,
        //         this.height - this.offset.top - this.offset.bottom
        //     );
            ctx.stroke();
    }
    
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }
}