class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY= 0;
    acceleration=2.5;
    energy = 100;
    lastHit = 0;
    
    offset={
        top:0,
        left:0,
        right:0, 
        bottom:0
    }
    
    applyGravaty(){
        setInterval(() => {
            if(this.isAboveGround() || this.speedY > 0){
           this.y -= this.speedY;
           this.speedY -= this.acceleration
        }
              }, 1000/25);
     }

     isAboveGround(){
        if(this instanceof ThrowableObject){
            return true;
        } else{
            return this.y < 300;
        }
     }


// Character.isColliding(zombie)
    isColliding(mo){
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

//Zombies .isColliding from Character on the Top
    isZombieColliding(mo) {
        return (this.y + this.height - this.offset.bottom < mo.y +mo.height); // Charakter muss nach unten fallen
    }

    isSlashingColliding(mo) {
    // Berechne den Slashing-Bereich mit deinem bestehenden Offset
    let slashX = this.otherDirection 
        ? this.x - this.offset.left 
        : this.x + this.width + this.offset.right; // Rechts schlägt der Charakter nach vorne

    let slashWidth = this.offset.right + this.offset.left;

    return (slashX < mo.x + mo.width && slashX + slashWidth > mo.x);
}



    playAnimation(images){
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img =this.imageCache[path];
        this.currentImage++;
    }

    moveRight() {
        this.x +=this.speed;
    }

    moveLeft(){
        this.x -= this.speed;
    }

    jump(){
        this.speedY = 25;
    }

    hit(){
        this.energy -=20;
        if(this.energy < 0){
            this.energy =0;
        } else{
            this.lastHit = new Date().getTime();
        }
    }

    isHurt(){
        let timepassed = new Date().getTime() - this.lastHit;  // Diffferece in ms
        timepassed = timepassed / 1000;// Difference in s
        return timepassed < 0.5 ; //innerhalb der 5s wurden wir getroffen
    }

    isDead(){
        return this.energy == 0;
    }
}