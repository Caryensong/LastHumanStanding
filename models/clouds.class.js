class Cloud extends MovableObject {
    y = -60;
    height = 250;
    width = 350;
    opacity = 1;

    constructor(imagePath, x, opacity = 1) {
        super().loadImage(imagePath);
        this.x = x + Math.random() * 720;
        this.opacity = opacity;
        this.animation();
    }

    animation() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

    }


}
