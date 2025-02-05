let canvas;
let world;
let keyboard = new Keyboard();

function toggleFullscreen(){
    let fullscreenBtn = document.getElementById("fullscreen");
    let img = fullscreenBtn.querySelector("img");

    if(!document.fullscreenElement){
      openFullscreen(document.documentElement);  
      img.src = "./img/icon/closescreen.png";
    } else {
        closeFullscreen();
        img.src = "./img/icon/fullscreen.png";
    }
}

function openFullscreen(elem) {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) { /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE11 */
      elem.msRequestFullscreen();
    }
  }

  function closeFullscreen(){
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen();
    }
}

document.addEventListener("fullscreenchange", () => {
    let fullscreenBtn = document.getElementById("fullscreen");
    let img = fullscreenBtn.querySelector("img");

    if (!document.fullscreenElement) {
        img.src = "./img/icon/fullscreen.png"; // Icon für "Fullscreen starten"
    } else {
        img.src = "./img/icon/closescreen.png"; // Icon für "Fullscreen beenden"
    }
});
  
function startGame() {
    startScreen = document.getElementById("howToPlayBox");
    startScreen.classList.add("d-none");
    startScreen = "";
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none");
    let panel2 = document.querySelector(".panel2");
    panel2.style.display = "flex";
    let soundsBtn = document.querySelector(".sound_btn");
    soundsBtn.style.display = "block";
    initLevel();
    world = new World(canvas, keyboard);
    AudioHub.startBackgroundMusic();
    if (world.zombies) {
        world.zombies.resetZombiePositions();
    }
    world.gameOver = false;
}

function howToPlayScreen() {
    descriptionScreen = document.getElementById("descriptionBox");
    descriptionScreen.classList.add("d-none");
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = howToPlayTemplate();
}

function startDescription() {
    firstScreen = document.getElementById("startContent");
    firstScreen.classList.add("d-none");
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = descriptionTemplate();
}

function init() {
    startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = "";
    endScreen = document.getElementById("endScreenBox");
    canvas = document.getElementById('canvas');
    
    if (endScreen) {
        endScreen.classList.add("d-none");
        canvas.classList.remove("d-none");
    }
    startScreen.innerHTML = startTemplate();
}


function toggleSound(){
    let soundIcon = document.getElementById("soundIcon");

    AudioHub.toggleSound(); 

    if(AudioHub.soundEnabled){
        soundIcon.src = "./img/icon/sound_on.png";  
    } else{
        soundIcon.src = "./img/icon/sound_off.png"; 
    }
}

window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 83) {
        keyboard.S = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE_SOLVED = false;
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D_SOLVED = false;
        keyboard.D = false;
    }
    if (e.keyCode == 83) {
        keyboard.S_SOLVED = false;
        keyboard.S = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "m") { // Nur "M" soll den Sound togglen
        AudioHub.toggleSound();
    }
});
