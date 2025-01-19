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

stars = [
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star(),
  new Star()
];

backgroundObjects = [
  new BackgroundObject('./img/background/4.png', 0, 290),
  new BackgroundObject1('./img/background/3.png', 0, 290)

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
    this.addObjectToMap(this.backgroundObjects);
    this.addToMap(this.character);

    this.addObjectToMap(this.enemies);
    this.addObjectToMap(this.stars);
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
    this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
  }
}