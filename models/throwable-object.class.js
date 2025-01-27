class ThrowableObject extends MovableObject{

    offset = {
        top: 0,
        left: 10,
        right: 10,
        bottom: 0
      }

    constructor(x, y, character){
        super().loadImage('./img/poison/1.png');
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
}