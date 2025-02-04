class Zombies extends MovableObject{
    static zombiePositions = []; // Array, um Positionen aller Zombies zu speichern
    width=55;
    height=80;
    y= 345;
    isDead = false;
    hurt = new Audio('./audio/human_pain.mp3');
   
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
    
    Images_Posion_Dead =[
        'img/zombie3/dead/DEAD.png'
    ];

    constructor(){
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Posion_Dead);

        this.x = this.generateRandomPosition(); // Verwende die neue Methode für zufällige Position
        this.speed = 0.08 + Math.random() * 0.25;
        this.animation();
    }

    generateRandomPosition() {
        let minDistance = 150; // Mindestabstand zwischen Zombies
        let x;

        do {
            x = 280 + Math.random() * 500; // Generiere zufällige Position
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
        this.isDead = true; // Setze den Zombie-Status auf "stirbt"
        let currentFrame = 0;
        this.width=90;
        this.height=50;
        this.y = 365; 

        const deadAnimationInterval = setInterval(() => {
            if (currentFrame < this.Images_Dead.length) {
                this.img = this.imageCache[this.Images_Dead[currentFrame]];
                currentFrame++;
                this.hurt.play();
                this.walking_sound.pause();
            } else {
                clearInterval(deadAnimationInterval); // Animation beendet
                if (onAnimationComplete) onAnimationComplete(); // Callback aufrufen
            }
        }, 80); // 150ms pro Frame
    }

    playPoisonDeadAnimation(onAnimationComplete) {
        this.isDead = true;
        this.width = 130;
        this.height = 20;
        this.y = 430;
        if(this.hurt.readyState == 4){
             this.hurt.play();
        }
        this.walking_sound.pause();

        this.img = this.imageCache[this.Images_Posion_Dead[0]];
    
        setTimeout(() => {
            if (onAnimationComplete) onAnimationComplete(); // Callback aufrufen
        }, 900); // Bild wird 2 Sekunden lang angezeigt
    }
    
}