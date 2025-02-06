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
        this.offset = {top: 5, left: 5, right: 5, bottom: 5}; 
        this.animation();
        this.movement();
    }

    animation() {
        let currentImageIndex = 0; // Start mit dem ersten Bild
        setInterval(() => {
            this.loadImage(this.IMAGES[currentImageIndex]); // Bild wechseln
            currentImageIndex++;
            if (currentImageIndex >= this.IMAGES.length) {
                currentImageIndex = 0;
            }
        }, 300);
    }

    movement() {
        let amplitude = 15;
        let frequency = 0.05;  // Geschwindigkeit der Bewegung
        let startY = this.y;  // Anfangsposition der Y-Koordinate

        // Setzt ein Intervall, um die Y-Position zu verändern
        setInterval(() => {
            this.y = startY + amplitude * Math.sin(frequency * Date.now()); // Berechnet die neue Y-Position
        }, 400); // Alle 20ms wird die Position aktualisiert
    }
}