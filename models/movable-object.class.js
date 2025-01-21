class MovableObject {
    x = 10;
    y = 220;
    img;
    width =150;
    height = 150;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    otherDirection = false;
    speedY= 0;
    acceleration=1;
    
    applyGravaty(){
        setInterval(() => {
            if(this.y < 292){
           this.y -= this.speedY;
           this.speedY -= this.acceleration
        }
              }, 1000/25);
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
        console.log('move right');
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
    
        }, 1000/ 60);
    }
}