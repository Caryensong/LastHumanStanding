class MovableObject {
    x = 10;
    y = 210;
    img;
    width =150;
    height = 150;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY= 0;
    acceleration=2.5;
    
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
        this.otherDirection = false;
    }

    moveLeft(){
        this.x -= this.speed;
        this.otherDirection = true;
    }

    jump(){
        this.speedY = 25;
    }
}