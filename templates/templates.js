function startTemplate() {
    return `
       <div id="startContent">
            <img src="./img/Startscreen/Startscreen.png" alt="StartGame">
        <div class="startBtn_container">
            <button class="startbtn" onclick="startDescription()">START GAME</button>
            <button class="startbtn" id="img-button" onclick="options()">OPTIONS</button>
        </div>
        </div>
 `
}

function descriptionTemplate() {
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

function howToPlayTemplate() {
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

function wonGameTemplate() {
    return `
    <div id="endScreenBox"> 
          <img src="./img/Startscreen/youWin.png" alt="You Win">
      <div class="restart_btn_container">
        <button class="Winplay_again_btn" onclick="init()">Play Again</button>
      </div>
      </div>
`
}

function lostGameTemplate() {
    return `
    <div id="endScreenBox"> 
          <img src="./img/Startscreen/GameOver.png" alt="Game Over">
      <div class="restart_btn_container">
          <button class="play_again_btn" onclick="init()">PLAY AGAIN</button>
      </div>
      </div>
`
}

function impressum() {
    return `
    <div id="endScreenBox"> 
      <div class="option_container">
      <div class="option_content">
      <div class="navbar">
            <button class="play_again_btn">Datenschutz</button>
            <button class="play_again_btn">Credits</button>
            <button class="play_again_btn">Impressum</button>
        </div>  
        <div class="content_text">
        Informationen über den Diensteanbieter. <br>

Caryen Song<br>

Johannes-Wirtz-Str 19,<br>
47877 Willich,<br>
Deutschland<br>

Tel.: 01789731129<br>
E-Mail: caryensong@googlemail.com<br><br>

EU-Streitschlichtung<br>
Gemäß Verordnung über Online-Streitbeilegung in Verbraucherangelegenheiten (ODR-Verordnung) möchten wir Sie über die Online-Streitbeilegungsplattform (OS-Plattform) informieren.
Verbraucher haben die Möglichkeit, Beschwerden an die Online Streitbeilegungsplattform der Europäischen Kommission unter https://ec.europa.eu/consumers/odr/main/index.cfm?event=main.home2.show&lng=DE zu richten. Die dafür notwendigen Kontaktdaten finden Sie oberhalb in unserem Impressum.

Wir möchten Sie jedoch darauf hinweisen, dass wir nicht bereit oder verpflichtet sind, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.

Bildernachweis
Die Bilder, Fotos und Grafiken auf dieser Webseite sind urheberrechtlich geschützt.
<br><br>
Alle Texte sind urheberrechtlich geschützt.
<br><br>
Quelle: Erstellt mit dem Impressum Generator von AdSimple


        </div>  
        <div class="restart_btn_container">
           <button class="startbtn" onclick="init()">Back</button>
      </div>
        </div></div>
      </div>
`
}