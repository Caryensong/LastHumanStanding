class World { 
  character = new Character(); 
  level= level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  // statusBar = new StatusBar();
  throwableObjects = [];

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

checkThrowObjects(){
  if(this.keyboard.D){
    let bottle = new ThrowableObject(this.character.x + 65 , this.character.y + 50);
    this.throwableObjects.push(bottle);   //neue flasche wird hinzugefügt
    if( this.throwableObjects.length > 5){
      this.throwableObjects.shift();
    }
  }
}


checkCollisions(){
    this.level.enemies.forEach((enemy)=>{
    if(this.character.isColliding(enemy)){
      this.character.hit();
      console.log(this.character.energy)
      
      const lifeBar = this.level.statusBar.find((bar) => bar.type === 'life');
      if (lifeBar) {
        lifeBar.setPercentage(this.character.energy);
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