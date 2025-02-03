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
    <div id="descriptionBox" width="720px" height="480px"> 
              <img src="./img/Startscreen/description.png" alt="description">
          <div class="descriptionBtn_container">
              <button class="startbtn" onclick="init()">Back</button>
              <button class="startbtn" id="img-button" onclick="options()">READY</button>
          </div>
          </div>
  
   `
}