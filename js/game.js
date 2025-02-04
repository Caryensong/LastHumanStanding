let canvas;
let world;
let keyboard = new Keyboard();

function startGame(){
   startScreen = document.getElementById("howToPlayBox");
    startScreen.classList.add("d-none");
     startScreen = "";
     canvas =document.getElementById("canvas");
     canvas.classList.remove("d-none");
     initLevel();
     world = new World(canvas, keyboard);
}
function stopGame(world) {
    clearInterval(world.intervalID);
    world.throwableObjects = []; // Alle geworfenen Objekte entfernen
}


function howToPlayScreen(){
    descriptionScreen = document.getElementById("descriptionBox");
    descriptionScreen.classList.add("d-none");
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = howToPlayTemplate();
}

function startDescription(){
    firstScreen = document.getElementById("startContent");
    firstScreen.classList.add("d-none");
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = descriptionTemplate();
}

function init(){
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML= "";
    endScreen = document.getElementById("endScreenBox"); 
    canvas = document.getElementById('canvas');
   
    if( endScreen){
         endScreen.classList.add("d-none");  
         canvas.classList.remove("d-none");
    }
    startScreen.innerHTML = startTemplate();
}


window.addEventListener("keydown", (e) => {
     if(e.keyCode == 39){
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37){
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38){
        keyboard.UP = true;
    }

    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }
    if(e.keyCode == 32){
        keyboard.SPACE = true;
    }
    if(e.keyCode == 68){
        keyboard.D = true;
    }
    if(e.keyCode == 83){
        keyboard.S = true;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = true;
    }

});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39){
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37){
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38){
        keyboard.UP = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
    if(e.keyCode == 32){
       keyboard.SPACE_SOLVED = false;
       keyboard.SPACE = false;
    }   
    if(e.keyCode == 68){
        keyboard.D_SOLVED = false;
        keyboard.D = false;
    }
    if(e.keyCode == 83){
        keyboard.S_SOLVED = false;
        keyboard.S = false;
    }
    if(e.keyCode == 40){
        keyboard.DOWN = false;
    }
});