let canvas;
let ctx; 
let character = new Image();

function init(){
    canvas =document.getElementById('canvas');
    ctx = canvas.getContext('2d');

    character.src = './img7human/Walking70_Fallen_Angels_Walking_000.png';
    ctx.drawImage(character, 30, 30, 50, 50);

}