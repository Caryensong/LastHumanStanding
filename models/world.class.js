class World {       
  character = new Character();
  enemies = [
    new Zombies(), 
    new Zombies(), 
    new Zombies()
];

moon =[
  new Moon()
];

clouds = [
  new Cloud('./img/background/cloud.png', 0, 0.4),
  new Cloud('./img/background/cloud1.png', 0, 0.5)
];

backgroundObjects = [
  new BackgroundObject('./img/background/3.png', 0, 0.1),
  new BackgroundObject('./img/background/4.png', 0, 0.5),
  new BackgroundObject('./img/background/2.png', 0, 0.9),
  new BackgroundObject('./img/background/stars.png', 0, 1),
];

  canvas;
  ctx;
  keyboard;

  constructor(canvas, keyboard){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
}

setWorld(){
  this.character.world = this;
}

draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectToMap(this.backgroundObjects);   
    this.addObjectToMap( this.moon);
    this.addObjectToMap(this.clouds);
    this.addToMap(this.character)
    this.addObjectToMap(this.enemies);
   
  

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

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    this.ctx.globalAlpha = 1;
}
}