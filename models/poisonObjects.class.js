class PoisonObjects extends MovableObject{
   
    
    Images =[
        './img/poison/1.png',
        './img/poison/2.png',
        './img/poison/3.png',
        './img/poison/4.png',
        './img/poison/5.png',
        './img/poison/6.png',
        './img/poison/7.png',
        './img/poison/8.png'
    ];

    constructor(x, y){
        super().loadImage(this.Images[0]);
        this.loadImages(this.Images);
        this.x = x + Math.random()* 720;
        this.y = y + Math.random()* 215;
        this.width = 35;
        this.height = 35; 
        this.animation();

    }

    animation(){
        setInterval(() => {
          this.playAnimation(this.Images);
        }, 250);
  }

} 