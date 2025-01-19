class Star extends MovableObject {
    y = 0; 
    height = 10;   
    width = 10;

    constructor(){
        super().loadImage('./img/background/star.png');
        this.x = 0 + Math.random()* 720;
        this.y = 0 + Math.random()* 220;
    }
}