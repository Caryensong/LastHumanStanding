class LifeObjects extends MovableObject{

    Images =[
        './img/Life/icon_health.png'
    ];

    constructor(x, y){
        super().loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.x = x + Math.random()* 720;
        this.y = y + Math.random()* 215;
        this.width = 35;
        this.height = 35; 
    }
}