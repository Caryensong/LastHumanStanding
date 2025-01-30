class ZombieHand extends MovableObject{

    IMAGES =[
        './img/Zombie hand/7.png',
        './img/Zombie hand/8.png',
        './img/Zombie hand/9.png',
        './img/Zombie hand/10.png',
    ];

    constructor(x, y, width, height){
        super().loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.x = x;
        this.y = y;
        this.width =width;
        this.height = height;
        this.animation();
    }

    animation() {
        let currentImageIndex = 0; // Start mit dem ersten Bild
        setInterval(() => {
            this.loadImage(this.IMAGES[currentImageIndex]); // Bild wechseln
            currentImageIndex++; // Index erhöhen
            if (currentImageIndex >= this.IMAGES.length) {
                currentImageIndex = 0; // Wieder von vorne anfangen, wenn das Ende erreicht ist
            }
        }, 300); // Alle 3 Sekunden (3000 ms) das Bild wechseln
    }
}