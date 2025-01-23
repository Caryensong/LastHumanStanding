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
            return this.y < 370;
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
        this.energy -=5;
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