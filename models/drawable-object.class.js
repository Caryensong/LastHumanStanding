class DrawableObject{
    img;
    imageCache = {};
    currentImage = 0;
    x = 10;
    y = 220;
    width= 155;
    height = 140;



    loadImage(path){
        this.img = new Image();  //existiert bereits <img id = "image" scr>  this.img = document.getElementByID ('image') 
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

    loadImages(arr){
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path]= img;
        });
    }

}