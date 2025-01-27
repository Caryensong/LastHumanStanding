class Zombies extends MovableObject{
    width=55;
    height=80;
    y= 345;
   
    walking_sound= new Audio('./audio/zombie_walk.mp3');

    Images_Walking =[
        './img/zombie3/walk/Walk1.png',
        './img/zombie3/walk/Walk2.png',
        './img/zombie3/walk/Walk3.png', 
        './img/zombie3/walk/Walk4.png',
        './img/zombie3/walk/Walk5.png',
        './img/zombie3/walk/Walk6.png',
    ];
    
    Images_Dead =[
        './img/zombie3/dead/Dead1.png',
        './img/zombie3/dead/Dead2.png',
        './img/zombie3/dead/Dead3.png',
        './img/zombie3/dead/Dead4.png',
        './img/zombie3/dead/Dead5.png',
        './img/zombie3/dead/Dead6.png',
        './img/zombie3/dead/Dead7.png',
        './img/zombie3/dead/Dead8.png',
    ];
     
    Images_Hurt =[
        './img/zombie3/poison/Hurt1.png',
        './img/zombie3/poison/Hurt2.png',
        './img/zombie3/poison/Hurt3.png',
        './img/zombie3/poison/Hurt4.png',
        './img/zombie3/poison/Hurt5.png',
    ];

    constructor(){
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);

        this.x = 200 + Math.random()* 500;
        this.speed = 0.08 + Math.random() *0.25;
        this.animation();

    }

    animation(){
        setInterval(()=>{     
            this.moveLeft();
        }, 1000/ 60);
   

        setInterval(() => {
          this.playAnimation(this.Images_Walking);
          this.walking_sound.play();
        }, 250);
  }

}