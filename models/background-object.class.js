class BackgroundObject extends MovableObject{
    // width=720;
    // height= 480;
    opacity = 1;

    constructor(imagePath, x, y, width, height, opacity = 1){
        super().loadImage(imagePath);
        this.x = x;
        this.width = width;
        this.height = height;
        this.y = y;
        this.opacity = opacity; 
    }
    
}