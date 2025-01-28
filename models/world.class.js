class World { 
  character = new Character(); 
  level= level1;
  endboss = new Endboss();
  canvas;
  ctx;
  camera_x = 0;
  keyboard;
  throwableObjects = [];
  lastThrowTime;

  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions(); 
    this.check();
}

setWorld(){
  this.character.world = this;
}

check(){
  setInterval(() => { 
    this.checkCollisions();
    this.checkThrowObjects();
   
  }, 200);
}

checkThrowObjects() {
  if (this.keyboard.D && this.throwableObjects.length < 5) {
      if (!this.lastThrowTime || Date.now() - this.lastThrowTime > 500) {
          let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 50, this.character);
          this.throwableObjects.push(bottle);
          this.lastThrowTime = Date.now();
        
          const poisonBar = this.level.statusBar.find((bar) => bar.type === 'poison');
          if (poisonBar) {
              let poisonPercentage = (100 - (this.throwableObjects.length / 5) * 100);
              console.log('Thrown bottles:', poisonPercentage);
              poisonBar.setPoisonPercentage(poisonPercentage);
          }
      }
  }
} 

checkCollisions(){
    this.level.enemies.forEach((enemy, index) => {
      if(this.character.isColliding(enemy)) {
          if (this.character.isSlashing) {
              console.log("Slashing verhindert Verletzung.");
              return; // Kein Schaden, wenn Slashing aktiv ist
          }

        if (this.character.isZombieColliding(enemy)){
          console.log("Zombie von oben getroffen!");
          enemy.playPoisonDeadAnimation(() => {
            this.level.enemies.splice(index, 1); // Zombie entfernen
        });
        }else{
          this.character.hit();
          console.log("Charakter wurde getroffen", this.character.energy)
        
          const lifeBar = this.level.statusBar.find((bar) => bar.type === 'life');
          if (lifeBar) {
          lifeBar.setPercentage(this.character.energy);
        }
      }
    }
  });
 // Überprüfe Kollisionen zwischen geworfenen Objekten und Enemys
  this.throwableObjects.forEach((bottle, bottleIndex) => {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if(bottle.isColliding(enemy)) {
        console.log("Poison trifft Zombie!");

        enemy.playPoisonDeadAnimation(() => {
          this.level.enemies.splice(enemyIndex, 1); // Zombie entfernen
        });
        this.throwableObjects.splice(bottleIndex, 1);// Entferne die Flasche
      }
    });
  }
);
}

checkSlashingCollisions() {
  this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy)) {
          // Überprüfe, ob der Slashing-Treffer den Zombie trifft
          if (this.character.isSlashingColliding(enemy)) {
              console.log("Zombie wurde vom Schwert getroffen!");
             
              enemy.playDeadAnimation(() => {
                this.level.enemies.splice(index, 1); 
              });
          }
      }
  });
}

draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);   
    this.addObjectToMap( this.level.moon);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.start);
    this.addObjectToMap(this.level.objects);
    this.addObjectToMap(this.throwableObjects);

    this.ctx.translate(-this.camera_x, 0);  //camera Back

    this.level.statusBar.forEach((statusBar) => {
      this.addToMap(statusBar); // Jede StatusBar einzeln hinzufügen
  });

    this.ctx.translate(this.camera_x, 0);   //camera forwards

    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.endboss);

    this.ctx.translate(-this.camera_x, 0);

    let self = this;
    requestAnimationFrame(function(){
      self.draw();
    });
  }

  addObjectToMap(objects){
    objects.forEach(o => {
      this.addToMap(o);
    });

  }

  addToMap(mo){
    if (mo instanceof BackgroundObject || mo instanceof Cloud) {
      this.ctx.globalAlpha = mo.opacity;
    } else {
      this.ctx.globalAlpha = 1; // Full opacity for other objects
    }

    if(mo.otherDirection){
    this.flipImage(mo);
    }
  
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if(mo.otherDirection){
    this.flipImageBack(mo);
    }
  }

  flipImage(mo){
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x =mo.x *  -1;
  }

  flipImageBack(mo){
    this.ctx.restore();  //macht die Spiegelung wieder
    mo.x =mo.x *  -1;
  }
}  