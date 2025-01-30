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
    this.checkSlashingCollisions();
   
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
      this.handleObjectCollision(object, index);
    }
  });
}

handleObjectCollision(object, index) {
  if (object instanceof PoisonObjects) {
    console.log('Poison Flasche eingesammelt');
    this.level.objects.splice(index, 1);
    this.poisonCount = Math.min(this.poisonCount +1, 5);
    this.updatePoisonBar();
 }      // Life-Objekt einsammeln
  if (object instanceof LifeObjects) {
    console.log('Leben eingesammelt');
    this.level.objects.splice(index, 1);
    this.character.energy = Math.min(this.character.energy + 20, 100);
    this.updateLifeBar();
  }
}

updatePoisonBar() {
  const poisonBar = this.level.statusBar.find((bar) => bar.type === 'poison');
  if (poisonBar) {
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

updateEndbossLifeBar() {
  const lifeBar = this.level.statusBar.find((bar) => bar.type === 'endbossLife');
  if (lifeBar) {
    lifeBar.setEndbossPercentage(this.endboss.energy);
  }
}

checkCollisions() {
  this.level.enemies.forEach((enemy, index) => {    
    if (this.character.isColliding(enemy)) {
      this.handleCharacterEnemyCollision(enemy, index);
    }
  });
  // Überprüfe Kollisionen zwischen geworfenen Objekten und Feinden sowie Endboss
  this.throwableObjects.forEach((bottle, bottleIndex) => {
    this.handleThrowableObjectCollision(bottle, bottleIndex);
  });
}

handleCharacterEnemyCollision(enemy, index) {
  if (this.character.isSlashing) {
    console.log("Slashing verhindert Verletzung.");
    return; // Kein Schaden, wenn Slashing aktiv ist
  }

  if (this.character.isTopZombieColliding(enemy)) {
    console.log("Zombie von oben getroffen!");
    this.removeEnemy(enemy, index);
  } else {
    this.character.hit(); 
    console.log("Charakter wurde getroffen", this.character.energy);
    this.updateLifeBar();
  }
}

handleThrowableObjectCollision(bottle, bottleIndex) {
  this.level.enemies.forEach((enemy, enemyIndex) => {
    if (bottle.isColliding(enemy)) {
      console.log("Poison trifft Zombie!");
      this.removeThrowableObject(bottleIndex);
      this.removeEnemy(enemy, enemyIndex);
    }
  });

  if (this.endboss && bottle.isColliding(this.endboss)) {
    console.log("Poison trifft Endboss");
    this.removeThrowableObject(bottleIndex);
    this.handleEndbossCollision();
  }
}
// Hilfsmethoden für das Entfernen von Objekten
removeThrowableObject(bottleIndex) {
  this.throwableObjects.splice(bottleIndex, 1);
}

removeEnemy(enemy, index) {
  enemy.playPoisonDeadAnimation(() => {
    this.level.enemies.splice(index, 1); // Zombie entfernen
  });
}

handleEndbossCollision() {
  this.endboss.playHurtAnimation();
  this.endboss.hit();
  console.log("Endboss Life", this.endboss.energy);
  this.updateEndbossLifeBar();

  if (this.endboss.energy <= 0) {
    console.log("Endboss besiegt");
    this.endboss.playDeadAnimation();
  }
}

checkSlashingCollisions() {
  if (this.endboss.isDying) return; // Falls Endboss schon stirbt, keine weitere Aktion
  if (this.character.isColliding(this.endboss) && this.character.isSlashing) {
    console.log("Endboss wurde mit Schwert getroffen");
    this.handleEndbossCollision();
  }

  this.level.enemies.forEach((enemy, index) => {
    if (this.character.isColliding(enemy) && this.character.isSlashingColliding(enemy)) {
      console.log("Zombie wurde vom Schwert getroffen!");
      this.removeEnemy(enemy, index);
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