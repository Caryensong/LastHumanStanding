class StatusBar extends DrawableObject {
    x = 10;
    y = 0;
    width = 200;
    height = 40;

    Images_Life = [
        'img/Life/0.png',
        'img/Life/20.png',
        'img/Life/40.png',
        'img/Life/60.png',
        'img/Life/80.png',
        'img/Life/100.png',
    ];

    precentage = 100;

    constructor() {
        super();
        this.loadImages(this.Images_Life);
        this.setPercentage(100);
    }

    setPercentage(precentage) {
        this.precentage = precentage;   // => 0....5
        let path = this.Images_Life[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.precentage == 100) {
            return 5;
        } else if (this.precentage > 80) {
            return 4;
        } else if (this.precentage > 60) {
            return 3;
        } else if (this.precentage > 40) {
            return 2;
        } else if (this.precentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}