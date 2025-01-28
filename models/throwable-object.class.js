class ThrowableObject extends MovableObject{

    offset = {
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
      }

    Images_Explosion = [
        './img/explosion/explosion1.png',
        './img/explosion/explosion2.png',
        './img/explosion/explosion3.png',
    ];
      

    constructor(x, y, character){
        super().loadImage('./img/poison/1.png');
        this.loadImages(this.Images_Explosion);
        this.x = x;
        this.y = y;
        this.character = character;
        this.height = 50;
        this.width = 50;
        this.throw();
        
    }

    throw(){
        this.speedY = 30;
        this.applyGravaty();
        setInterval(() => {
            if(this.character.otherDirection === true){
               this.x -= 10; 
            } else {
                this.x += 10; 
            }
            
            
        }, 40);

    }

    explode() {
        console.log('Explosion started'); 
        this.img = this.imageCache[this.Images_Explosion[0]]; //
        let currentFrame = 0;
        const explosionInterval = setInterval(() => {
            if (currentFrame < this.Images_Explosion.length) {
                this.img = this.imageCache[this.Images_Explosion[currentFrame]];
                currentFrame++;
            } else {
                clearInterval(explosionInterval); // Stoppe die Animation
                this.world.throwableObjects = this.world.throwableObjects.filter(obj => obj !== this); // Entferne das Objekt
            }
        }, 100); // 100ms pro Frame
    }
    
}