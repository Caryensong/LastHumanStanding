class MovableObject {
    x = 10;
    y = 300;
    img;
    width =150;
    height = 150;

    loadImage(path){
        this.img = new Image();
        this.img.src = path;
    }

    moveRight() {
        console.log('move right');
    }

    moveLeft(){

    }
}