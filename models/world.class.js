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
  poisonCount = 5; // Maximale Anzahl an Flaschen

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
    this.checkObjectsColliding();
   
  }, 200);
}

checkThrowObjects() {
  if (this.keyboard.D && this.poisonCount > 0) {
      let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 50, this.character);
          this.throwableObjects.push(bottle);

          this.poisonCount--;
        
          this.updatePoisonBar();
        }
  }

checkObjectsColliding() {
  this.level.objects.forEach((object, index) => {
    if (object && this.character.isColliding(object)) {
      // Poison-Objekt einsammeln
      if (object instanceof PoisonObjects) {
        console.log('Poison Flasche eingesammelt');
        this.level.objects.splice(index, 1);

        this.poisonCount = Math.min(this.poisonCount +1, 5);
 
        this.updatePoisonBar();
      }

      // Life-Objekt einsammeln
      if (object instanceof LifeObjects) {
        console.log('Leben eingesammelt');
        this.level.objects.splice(index, 1);
         // Erhöhe die Lebensenergie des Charakters:
        this.character.energy = Math.min(this.character.energy + 20, 100);
        this.updateLifeBar();
      }
    }
  });
}

// Vereinheitlichte Methode zur Statusbar-Aktualisierung
updatePoisonBar() {
  const poisonBar = this.level.statusBar.find((bar) => bar.type === 'poison');
  if (poisonBar) {
    // Berechne den Prozentsatz basierend auf der Anzahl der verbleibenden Flaschen
    let poisonPercentage = (this.poisonCount / 5) * 100;
    poisonBar.setPoisonPercentage(poisonPercentage);
    console.log('Poison-Bar aktualisiert:', poisonPercentage);
  }
}

updateLifeBar() {
  const lifeBar = this.level.statusBar.find((bar) => bar.type === 'life');
  if (lifeBar) {
    lifeBar.setPercentage(this.character.energy);
    console.log('Life-Bar aktualisiert:', this.character.energy);
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
        
          this.updateLifeBar();
        }
    }
  });
 // Überprüfe Kollisionen zwischen geworfenen Objekten und Enemys
  this.throwableObjects.forEach((bottle, bottleIndex) => {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if(bottle.isColliding(enemy) ) {
        console.log("Poison trifft Zombie!");

        this.throwableObjects.splice(bottleIndex, 1);

        enemy.playPoisonDeadAnimation(() => {
          this.level.enemies.splice(enemyIndex, 1); // Zombie entfernen
        });
      }
    });
  });
  // Kollision zwischen geworfenen Objekten und Endboss überprüfen
  this.throwableObjects.forEach((bottle, bottleIndex)=>{
    if(bottle.isColliding(this.endboss)){
      console.log("Posion trifft Endboss");

      this.throwableObjects.splice(bottleIndex, 1);
      this.endboss.playHurtAnimation();
      this.endboss.hit();
      console.log("Endboss Life", this.endboss.energy );

      if(this.endboss.energy <= 0){
        console.log("endboss besiegt");
        this.endboss.playDeadAnimation();
      }
    }
  });

}

checkSlashingCollisions() {
  if (this.endboss.isDying) return; // Falls Endboss schon stirbt, keine weitere Aktion
  // Kollisionsprüfung für den Endboss
if(this.character.isColliding(this.endboss)){
  if(this.character.isSlashing){
    console.log("Endboss wurde mit Schwert getroffen");
    this.endboss.hit();
    this.endboss.playHurtAnimation();
    console.log("Endboss Life", this.endboss.energy );
 
    if(this.endboss.energy <= 0){
      console.log("endboss besiegt");
      this.endboss.playDeadAnimation();
    } 
  } else {
    this.character.hit();
    console.log(" CHarater wurde vom Endboss getroffe", this.character.energy);
    this.updateLifeBar();
  }

}

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