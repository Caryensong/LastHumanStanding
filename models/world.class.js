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
  new Cloud('./img/background/cloud.png', 0, 0.1),
  new Cloud('./img/background/cloud1.png', 0, 0.2),
];

backgroundObjects = [
  new BackgroundObject('./img/background/3.png', 0, 0.1),
  new BackgroundObject('./img/background/4.png', 0, 0.5),
  new BackgroundObject('./img/background/2.png', 0, 0.9),
  new BackgroundObject('./img/background/stars.png', 0, 1),
];

  canvas;
  ctx;

  constructor(canvas){
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.draw();
}

draw(){
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character)
    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.clouds);
    this.addObjectToMap( this.moon);
  

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
    if (mo instanceof BackgroundObject) {
      this.ctx.globalAlpha = mo.opacity;
  } else {
      this.ctx.globalAlpha = 1; // Full opacity for other objects
  }

    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    this.ctx.globalAlpha = 1;
}
}