class Zombies extends MovableObject{
    width=55;
    height=80;
    y= 345;
    zombieWalking =[
        './img/zombie3/walk/Walk1.png',
        './img/zombie3/walk/Walk2.png',
        './img/zombie3/walk/Walk3.png', 
        './img/zombie3/walk/Walk4.png',
        './img/zombie3/walk/Walk5.png',
        './img/zombie3/walk/Walk6.png',
    
    ];

    constructor(){
        super().loadImage('./img/zombie3/walk/Walk1.png');
        this.loadImages(this.zombieWalking);

        this.x = 200 + Math.random()* 500;
        this.speed = 0.08 + Math.random() *0.25;
        this.animation();

    }

    animation(){
        this.moveLeft();

        setInterval(() => {
           let i = this.currentImage % this.zombieWalking.length;
           let path = this.zombieWalking[i];
           this.img =this.imageCache[path];
           this.currentImage++;
        }, 250);

    // animation(){
    //    setInterval(() => {
    //     this.x -= 0.1;
    //    }, 1000 / 60); 
  }

}