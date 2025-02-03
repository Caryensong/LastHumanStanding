function startTemplate(){
 return `
  <div id="startBox" width="720px" height="480px"> 
       <div id="startContent">
            <img src="./img/Startscreen/Startscreen.png" alt="StartGame">
        <div class="startBtn_container">
            <button class="startbtn" onclick="startDescription()">START GAME</button>
            <button class="startbtn" id="img-button" onclick="options()">OPTIONS</button>
        </div>
        </div>
    </div>

 `
}

function descriptionTemplate(){
    return `
        <div id="descriptionBox"> 
              <img src="./img/Startscreen/description.png" alt="description">
          <div class="descriptionBtn_container">
              <button class="startbtn" onclick="init()">Back</button>
              <button class="startbtn" id="img-button" onclick="howToPlayScreen()">READY</button>
          </div>
        </div>
   `
}

function howToPlayTemplate(){
    return `
    <div id="howToPlayBox"> 
          <img src="./img/Startscreen/Keyboard.png" alt="description">
      <div class="descriptionBtn_container">
          <button class="startbtn" onclick="init()">Back</button>
          <button class="startbtn" id="img-button" onclick="startGame()">PLAY</button>
      </div>
      </div>
`
}

function wonGameTemplate(){
    return `
    <div id="endScreenBox"> 
          <img src="./img/Startscreen/youWin.png" alt="You Win">
      <div class="restart_btn_container">
        <button class="startbtn" onclick="init()">Play Again</button>
      </div>
      </div>
`
}

function lostGameTemplate(){
    return `
    <div id="endScreenBox"> 
          <img src="./img/Startscreen/GameOver.png" alt="Game Over">
      <div class="restart_btn_container">
          <button class="startbtn" onclick="init()">Play Again</button>
      </div>
      </div>
`
}