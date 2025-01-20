class BackgroundObject extends MovableObject{
    
    width=720;
    height= 480;
    opacity = 1;

    constructor(imagePath, x, opacity = 1){
        super().loadImage(imagePath);
        this.y = 480 - this.height;
        this.x = x;
        this.opacity = opacity; 
    }
    
}