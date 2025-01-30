let canvas;
let world;
let keyboard = new Keyboard();

function init(){
    canvas =document.getElementById('canvas');
    world = new World(canvas, keyboard);
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