class Zombies extends MovableObject{
    static zombiePositions = []; // Array, um Positionen aller Zombies zu speichern
    width=55;
    height=80;
    y= 345;
    isDead = false;
   
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

        this.x = this.generateRandomPosition(); // Verwende die neue Methode für zufällige Position
        this.speed = 0.08 + Math.random() * 0.25;
        this.animation();
    }

    generateRandomPosition() {
        let minDistance = 100; // Mindestabstand zwischen Zombies
        let x;

        do {
            x = 200 + Math.random() * 500; // Generiere zufällige Position
        } while (Zombies.zombiePositions.some(pos => Math.abs(pos - x) < minDistance));

        Zombies.zombiePositions.push(x); // Speichere die Position in der Liste
        return x;
    }

    animation(){
        setInterval(()=>{     
            if(!this.isDead){
                this.moveLeft();  
            }
        }, 1000/ 60);
   

        setInterval(() => {
            if(!this.isDead){
                this.playAnimation(this.Images_Walking);
                this.walking_sound.play();
            }
        }, 250);
    }

    playDeadAnimation(onAnimationComplete) {
        this.isDying = true; // Setze den Zombie-Status auf "stirbt"
        let currentFrame = 0;
        this.width=100;
        this.height=60;
        this.y = 360; 

        const deadAnimationInterval = setInterval(() => {
            if (currentFrame < this.Images_Dead.length) {
                this.img = this.imageCache[this.Images_Dead[currentFrame]];
                currentFrame++;
            } else {
                clearInterval(deadAnimationInterval); // Animation beendet
                if (onAnimationComplete) onAnimationComplete(); // Callback aufrufen
            }
        }, 100); // 150ms pro Frame
    }
}