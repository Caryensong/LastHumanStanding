let canvas;
let ctx; 
let character = new Character();
let enemies = [
    new Zombies(),
    new Zombies(),
    new Zombies(),
]


function init(){
    canvas =document.getElementById('canvas');
    ctx = canvas.getContext('2d');

console.log('My Character', character);


}