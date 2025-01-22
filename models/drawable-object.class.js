class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 220;
    width= 155;
    height = 140;



    loadImage(path){
        this.img = new Image();  //this.img = document.getElementByID ('image') <img id = "image" scr>
        this.img.src = path;
    }

    draw(ctx){
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]= img;
        });
    }

}