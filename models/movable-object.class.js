class MovableObject {
    x = 10;
    y = 300;
    img;
    width =150;
    height = 150;
    speed = 0.15;
    imageCache = {};
    currentImage = 0;
    
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

    moveRight() {
        console.log('move right');
    }

    moveLeft(){
        setInterval(()=>{
            this.x -= this.speed;
    
        }, 1000/ 60);
    }
}