class Character extends MovableObject{
   speed = 4;  
   world;
   walking_sound= new Audio('./audio/Walking1.mp3');
   jump_sound =new Audio ('./audio/jump.mp3');
   hurt_sound =new Audio ('./audio/human_pain.mp3');

   offset={
      top: 30,
      left:40,
      right:40, 
      bottom:20
  }

   Images_Walking = [
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

   Images_Jumping= [
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_000.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_001.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_002.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_003.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_004.png',
      './img/human/Jump Start/0_Fallen_Angels_Jump Start_005.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_000.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_001.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_002.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_003.png',
      './img/human/Jump Loop/0_Fallen_Angels_Jump Loop_004.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_000.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_001.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_002.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_003.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_004.png',
      './img/human/Falling Down/0_Fallen_Angels_Falling Down_005.png',
   ];

   Images_Dead=[
      './img/human/Dying/0_Fallen_Angels_Dying_000.png',
      './img/human/Dying/0_Fallen_Angels_Dying_001.png',
      './img/human/Dying/0_Fallen_Angels_Dying_002.png',
      './img/human/Dying/0_Fallen_Angels_Dying_003.png',
      './img/human/Dying/0_Fallen_Angels_Dying_004.png',
      './img/human/Dying/0_Fallen_Angels_Dying_005.png',
      './img/human/Dying/0_Fallen_Angels_Dying_006.png',
      './img/human/Dying/0_Fallen_Angels_Dying_007.png',
      './img/human/Dying/0_Fallen_Angels_Dying_008.png',
      './img/human/Dying/0_Fallen_Angels_Dying_009.png',
      './img/human/Dying/0_Fallen_Angels_Dying_010.png',
      './img/human/Dying/0_Fallen_Angels_Dying_011.png',
      './img/human/Dying/0_Fallen_Angels_Dying_012.png',
      './img/human/Dying/0_Fallen_Angels_Dying_013.png',
      './img/human/Dying/0_Fallen_Angels_Dying_014.png'
   ];

   Images_Hurt=[
      './img/human/Hurt/0_Fallen_Angels_Hurt_000.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_001.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_002.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_003.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_004.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_005.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_006.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_007.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_008.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_009.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_010.png',
      './img/human/Hurt/0_Fallen_Angels_Hurt_011.png'
   ];
     constructor(){
        super().loadImage(this.Images_Walking[0]);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Hurt);
        this.applyGravaty();
        this.animate();

        this.isDeadAlready = false;
     }

     animate(){

      setInterval(() => {
         this.walking_sound.pause();
         if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x){ 
         this.moveRight();
         this.walking_sound.play();
          this.otherDirection = false;
         }
         
         if(this.world.keyboard.LEFT && this.x > -100 ){ 
            this.x -= this.speed;
            this.moveLeft(); 
            this.walking_sound.play();
            this.otherDirection = true;
         }
   
         if(this.world.keyboard.SPACE  && !this.isAboveGround()){
            this.jump();
            this.jump_sound.play();
         }

         this.world.camera_x = -this.x + 100;
       }, 1000 / 60);
      

      setInterval(() => {
        if(this.isDead()){
         if(!this.isDeadAlready){
            this.isDeadAlready = true;
            this.playAnimation(this.Images_Dead);
            this.walking_sound.pause();
            this.hurt_sound.play();
         }
            
   
         } else if(this.isHurt()){
            this.hurt_sound.play();
            this.playAnimation(this.Images_Hurt);
         } else if(this.isAboveGround()){
            this.playAnimation(this.Images_Jumping);
         } else{
             if(this.world.keyboard.RIGHT || this.world.keyboard.LEFT){ 
            this.playAnimation(this.Images_Walking);
         }
         }
      }, 20);
     }

}