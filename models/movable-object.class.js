class MovableObject {
    x = 10;
    y = 300;
    img;
    width =150;
    height = 150;
    imageCache = {};

    loadImage(path){
        this.img = new Image();
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

    }
}