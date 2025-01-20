class Character extends MovableObject{
   speed = 4;
   humanWalking = [
         './img/human/Walking/0_Fallen_Angels_Walking_002.png',
         './img/human/Walking/0_Fallen_Angels_Walking_003.png',
         './img/human/Walking/0_Fallen_Angels_Walking_004.png',
         './img/human/Walking/0_Fallen_Angels_Walking_005.png',
         './img/human/Walking/0_Fallen_Angels_Walking_006.png',
         './img/human/Walking/0_Fallen_Angels_Walking_007.png',
         './img/human/Walking/0_Fallen_Angels_Walking_008.png',
         './img/human/Walking/0_Fallen_Angels_Walking_009.png',
         './img/human/Walking/0_Fallen_Angels_Walking_010.png',
         './img/human/Walking/0_Fallen_Angels_Walking_011.png',
         './img/human/Walking/0_Fallen_Angels_Walking_012.png',
         './img/human/Walking/0_Fallen_Angels_Walking_013.png',
         './img/human/Walking/0_Fallen_Angels_Walking_014.png',
         './img/human/Walking/0_Fallen_Angels_Walking_015.png',
         './img/human/Walking/0_Fallen_Angels_Walking_016.png',
         './img/human/Walking/0_Fallen_Angels_Walking_017.png',
         './img/human/Walking/0_Fallen_Angels_Walking_018.png',
         './img/human/Walking/0_Fallen_Angels_Walking_019.png',
         './img/human/Walking/0_Fallen_Angels_Walking_020.png',
         './img/human/Walking/0_Fallen_Angels_Walking_021.png',
         './img/human/Walking/0_Fallen_Angels_Walking_022.png',
         './img/human/Walking/0_Fallen_Angels_Walking_023.png',
   ];
   world;

     constructor(){
        super().loadImage('./img/human/Walking/0_Fallen_Angels_Walking_001.png');
        this.loadImages(this.humanWalking);

        this.animate();
     }

     animate(){

      setInterval(() => {
         if(this.world.keyboard.RIGHT){ 
            this.x +=this.speed;
         }
         if(this.world.keyboard.LEFT){ 
            this.x -=this.speed;
         }
       }, 1000 / 60);
      

      setInterval(() => {
         if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 
         let i = this.currentImage % this.humanWalking.length;
         let path = this.humanWalking[i];
         this.img =this.imageCache[path];
         this.currentImage++;
         }
      }, 20);
     }

    jump(){

    }
    slashing(){

    }
    runSlashing(){

    }
    sliding(){

    }


}