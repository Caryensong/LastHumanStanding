class StatusBar extends DrawableObject {

    Images_Life = [
        'img/Life/0.png',
        'img/Life/20.png',
        'img/Life/40.png',
        'img/Life/60.png',
        'img/Life/80.png',
        'img/Life/100.png',
    ];

    Images_Poison = [
        'img/poisoned bubbles/0.png',
        'img/poisoned bubbles/20.png',
        'img/poisoned bubbles/40.png',
        'img/poisoned bubbles/60.png',
        'img/poisoned bubbles/80.png',
        'img/poisoned bubbles/100.png',
    ];

    Images_EndBoss =[
        './img/endboss/statusbar/0.png',
        './img/endboss/statusbar/20.png',
        './img/endboss/statusbar/40.png',
        './img/endboss/statusbar/60.png',
        './img/endboss/statusbar/80.png',
        './img/endboss/statusbar/100.png',
    ];

    precentage = 100;
    poisonPercentage = 100;
    endBossPercentage = 100;

    constructor(x, y, width, height, type = 'life') {
        super();
        this.x = x;
        this.y = y;
        this.width =width;
        this.height = height;
        this.type = type; 
        this.loadImages(this.Images_Life);
        this.loadImages(this.Images_Poison);
        this.loadImages(this.Images_EndBoss);
        if (this.type === 'life') {
            this.setPercentage(100); // Leben starten mit 100%
        } else if (this.type === 'poison') {
            this.setPoisonPercentage(100); // Gift startet mit 0%
        } else if (this.type === 'endbossLife'){
            this. setEndbossPercentage(100);
        }
    }

    setEndbossPercentage(endBossPercentage){
        if(this.type !== 'endbossLife') return;
        this.precentage = endBossPercentage;
        let path = this.Images_EndBoss[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }


    setPercentage(precentage) {
        if (this.type !== 'life') return; // Nur für Leben
        this.precentage = precentage;
        let path = this.Images_Life[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    setPoisonPercentage(amount) {
        if (this.type !== 'poison') return; // Nur für Gift
        this.poisonPercentage = amount;
        let path = this.Images_Poison[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    resolveImageIndex() {
        if (this.type === 'poison') {
          if (this.poisonPercentage === 100) {
            return 5;
          } else if (this.poisonPercentage >= 80) {
            return 4;
          } else if (this.poisonPercentage >= 60) {
            return 3;
          } else if (this.poisonPercentage >= 40) {
            return 2;
          } else if (this.poisonPercentage >= 20) {
            return 1;
          } else {
            return 0;
          }
        }
      
        if (this.precentage == 100) {
          return 5;
        } else if (this.precentage >= 80) {
          return 4;
        } else if (this.precentage >= 60) {
          return 3;
        } else if (this.precentage >= 40) {
          return 2;
        } else if (this.precentage >= 20) {
          return 1;
        } else {
          return 0;
        }
      }
    }