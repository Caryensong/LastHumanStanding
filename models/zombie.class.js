class Zombies extends MovableObject{

    constructor(){
        super().loadImage('./img/zombie1/Walking/0_Zombie_Villager_Walking_000.png');

        this.x = 200 + Math.random()* 500;
        this.animation();
    }

    animation(){
       setInterval(() => {
        this.x -= 0.1;
       }, 1000 / 60); 
    }

}