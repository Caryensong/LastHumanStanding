class MovableObject {
    x = 10;
    y = 220;
    img;
    width= 155;
    height = 140;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY= 0;
    acceleration=2.5;

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
        return this.y < 300;
     }

    loadImage(path){
        this.img = new Image();  //this.img = document.getElementByID ('image') <img id = "image" scr>
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    drawFrame(ctx){
        if(this instanceof Character || this instanceof Zombies || this instanceof Endboss){
        ctx.globalAlpha = 1;  
        ctx.beginPath();
        ctx.lineWidth = "4";
        ctx.strokeStyle = "green";
        ctx.rect(
            this.x + this.offset.left,
            this.y + this.offset.top,
            this.width - this.offset.left - this.offset.right,
            this.height - this.offset.top - this.offset.bottom
        );
        ctx.stroke();
     }   
    } 
// Character.isColliding(zombie)
    isColliding(mo){
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]= img;
        });
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
}