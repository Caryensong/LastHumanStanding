let canvas;
let world;
let keyboard = new Keyboard();

function toggleFullscreen() {
    let fullscreenBtn = document.getElementById("fullscreen");
    let img = fullscreenBtn.querySelector("img");

    if (!document.fullscreenElement) {
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

function closeFullscreen() {
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

function restartGame() {
    AudioHub.stopAllSound();
    let endScreen = document.getElementById("endScreenBox");
    if (endScreen) {
        endScreen.remove(); // Game Over Screen entfernen
    }
    if (world) {
        world = null; // Altes world-Objekt löschen, um einen Neustart zu erzwingen
    }
    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none"); // Canvas wieder anzeigen
    startGame(); // Neues Spiel starten
}

function startGame() {
    if (world) {
        world = null; // Altes world-Objekt wirklich zurücksetzen
    }

    let startScreen = document.getElementById("howToPlayBox");
    if (startScreen) {
        startScreen.classList.add("d-none");
    }

    canvas = document.getElementById("canvas");
    canvas.classList.remove("d-none"); // Stelle sicher, dass das Spielfeld sichtbar ist

    let panel2 = document.querySelector(".panel2");
    if (panel2) {
        panel2.style.display = "flex";
    }

    if (AudioHub.soundEnabled) {
        AudioHub.startBackgroundMusic(); // Starte Hintergrundmusik
    }

    initLevel(); // Level initialisieren
    world = new World(canvas, keyboard); // Neues Spielobjekt erstellen

    world.gameOver = false; // Spielstatus zurücksetzen
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
    // canvas = document.getElementById("canvas");
    // canvas.width = window.innerWidth;  // Die Breite des Canvas an die Fenstergröße anpassen
    // canvas.height = window.innerHeight; // Die Höhe des Canvas an die Fenstergröße anpassen
    AudioHub.loadSoundState();  // Überprüfen und Laden des gespeicherten Sound-Status
    // Sound-Icon nach dem Status aktualisieren
    updateSoundIcon();

    let startScreen = document.getElementById("startScreen");
    startScreen.innerHTML = "";
    let endScreen = document.getElementById("endScreenBox");
    canvas = document.getElementById('canvas');

    if (endScreen) {
        endScreen.classList.remove();;
        canvas.classList.remove("d-none");
    }
    canvas.classList.add("d-none");

    if (AudioHub.soundEnabled) {
        AudioHub.stopAllSound(); // Stoppe alle anderen Sounds
        AudioHub.startBackgroundMusic(); // Starte nur die Hintergrundmusik
    }

    startScreen.innerHTML = startTemplate();
}

function options(page = 'impressum') {
    const content = {
        impressum: impressum(),
        datenschutz: datenschutz(),
        credits: credits()
    };
    document.getElementById("startScreen").innerHTML = content[page];
}

function toggleSound() {
    AudioHub.toggleSound();
    updateSoundIcon();
}

function updateSoundIcon() {
    let soundIcon = document.getElementById("soundIcon");

    if (AudioHub.soundEnabled) {
        soundIcon.src = "./img/icon/sound_on.png";
    } else {
        soundIcon.src = "./img/icon/sound_off.png";
    }
}


function bindBtsPressEvents() {
    const rightKey = document.getElementById("rightKey");
    const leftKey = document.getElementById("leftKey");
    const jumpKey = document.getElementById("jumpKey");
    const posionKey = document.getElementById("posionKey");
    const slashKey = document.getElementById("slashKey");

    // Touchstart und Touchend für Buttons
    const touchHandler = (key, action) => {
        return (e) => {
            e.preventDefault();
            world.keyboard[key] = action;
    
            // Wenn der Key losgelassen wird, SOLVED auf false setzen
            if (!action) {
                const solvedKey = key + "_SOLVED";
                if (world.keyboard[solvedKey]) {
                    world.keyboard[solvedKey] = false;
                }
            }
        };
    };
    rightKey.addEventListener('touchstart', touchHandler('RIGHT', true));
    rightKey.addEventListener('touchend', touchHandler('RIGHT', false));

    leftKey.addEventListener('touchstart', touchHandler('LEFT', true));
    leftKey.addEventListener('touchend', touchHandler('LEFT', false));

    jumpKey.addEventListener('touchstart', touchHandler('SPACE', true));
    jumpKey.addEventListener('touchend', touchHandler('SPACE', false));

    posionKey.addEventListener('touchstart', touchHandler('D', true));
    posionKey.addEventListener('touchend', touchHandler('D', false));

    slashKey.addEventListener('touchstart', touchHandler('S', true));
    slashKey.addEventListener('touchend', touchHandler('S', false));
}
document.addEventListener('DOMContentLoaded', () => {
    bindBtsPressEvents();
});


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
