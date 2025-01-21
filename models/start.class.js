class Start extends MovableObject{

constructor(imagePath, x, y, width, height){
    super().loadImage(imagePath);
    this.x = x;
    this.y = y;
    this.width =width;
    this.height =height;
}

}