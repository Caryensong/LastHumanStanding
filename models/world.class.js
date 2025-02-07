/**
 * Represents the game world where the character interacts with objects, enemies, and performs actions.
 * This class manages the overall game logic, including collision detection, object handling, and game state.
 * 
 * @class World
 */
class World {
  /**
 * Represents the game world where the character interacts with objects, enemies, and performs actions.
 * This class manages the overall game logic, including collision detection, object handling, and game state.
 * 
 * @class World
 */
  character = new Character();

  /**
  * The level that defines the world’s environment, objects, and enemies.
  * @type {Level}
  */
  level = level1;

  /**
  * The end boss of the game.
  * @type {Endboss}
  */
  endboss = new Endboss();

  /**
  * The canvas element used for rendering the game.
  * @type {HTMLCanvasElement}
  */
  canvas;

  /**
  * The rendering context of the canvas.
  * @type {CanvasRenderingContext2D}
  */
  ctx;

  /**
   * The horizontal camera offset to track the character’s movement.
   * @type {number}
   */
  camera_x = 0;

  /**
 * The keyboard input object used to detect player input.
 * @type {Object}
 */
  keyboard;

  /**
   * An array of throwable objects (such as poison bottles) the player can use.
   * @type {Array<ThrowableObject>}
   */
  throwableObjects = [];

  /**
   * The last time a throwable object was thrown.
   * @type {number}
   */
  lastThrowTime;

  /**
 * The number of poison bottles the player has.
 * @type {number}
 */
  poisonCount = 5; // Maximale Anzahl an Flaschen

  /**
 * Indicates whether the game is over.
 * @type {boolean}
 */
  gameOver = false;

  /**
   * Creates an instance of the World class, setting up the game environment and starting the game loop.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element used to draw the game.
   * @param {Object} keyboard - The keyboard input object.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext('2d');
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisions();
    this.check();
  }

  /**
    * Sets the world context for the character.
    */
  setWorld() {
    this.character.world = this;
  }

  /**
 * Starts an interval to check game conditions periodically, such as collisions and throw objects.
 */
  check() {
    if (this.intervalID) {
      clearInterval(this.intervalID);  // Vorheriges Intervall beenden
    }
    this.intervalID = setInterval(() => {
      this.checkCollisions();
      this.checkThrowObjects();
      this.checkObjectsColliding();
      this.checkSlashingCollisions();
    }, 200);
  }

  /**
   * Checks if the player has pressed the key to throw a poison bottle and has enough poison bottles.
   */
  checkThrowObjects() {
    if (this.keyboard.D && this.poisonCount > 0) {
      let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 50, this.character);
      this.throwableObjects.push(bottle);
      this.poisonCount--;
      this.updatePoisonBar();
    }
  }

  /**
   * Checks for collisions between the character and objects in the world.
   */
  checkObjectsColliding() {
    this.level.objects.forEach((object, index) => {
      if (object && this.character.isColliding(object)) {
        this.handleObjectCollision(object, index);
      }
    });
  }

  /**
 * Handles collisions with various objects, such as poison bottles and life objects.
 * @param {Object} object - The object the character collided with.
 * @param {number} index - The index of the collided object in the level objects array.
 */
  handleObjectCollision(object, index) {
    if (object instanceof PoisonObjects) {
      this.level.objects.splice(index, 1);
      this.poisonCount = Math.min(this.poisonCount + 1, 5);
      this.updatePoisonBar();

      if (this.soundEnabled) {
        AudioHub.playSound(AudioHub.clickSound);
      }

    }      // Life-Objekt einsammeln
    if (object instanceof LifeObjects) {
      this.level.objects.splice(index, 1);
      this.character.energy = Math.min(this.character.energy + 20, 100);
      this.updateLifeBar();

      if (this.soundEnabled) {
        AudioHub.playSound(AudioHub.clickSound); 
      }
    }
  }

  /**
   * Updates the poison bar based on the current poison bottle count.
   */
  updatePoisonBar() {
    const poisonBar = this.level.statusBar.find((bar) => bar.type === 'poison');
    if (poisonBar) {
      let poisonPercentage = (this.poisonCount / 5) * 100;
      poisonBar.setPoisonPercentage(poisonPercentage);
    }
  }

  /**
   * Updates the life bar based on the character's current health.
   */
  updateLifeBar() {
    const lifeBar = this.level.statusBar.find((bar) => bar.type === 'life');
    if (lifeBar) {
      lifeBar.setPercentage(this.character.energy);
    }
  }

  /**
  * Updates the end boss life bar.
  */
  updateEndbossLifeBar() {
    const lifeBar = this.level.statusBar.find((bar) => bar.type === 'endbossLife');
    if (lifeBar) {
      lifeBar.setEndbossPercentage(this.endboss.energy);
    }
  }

  /**
   * Checks for collisions between the character and enemies, as well as between throwable objects and enemies.
   * Calls separate functions to handle each type of collision.
   * @returns {void}
   */
  checkCollisions() {
    this.checkEnemyAndEndbossCollisions();
    this.checkZombieHandCollisions();
    this.checkThrowableObjectCollisions();
  }

  /**
 * Checks for collisions between the character and enemies or the endboss.
 * Handles different collision cases, such as slashing, zombie collision from above, and normal collisions.
 * @returns {void}
 */
  checkEnemyAndEndbossCollisions() {
    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) || this.character.isColliding(this.endboss)) {
        if (this.character.isSlashing) {
          this.handleSlashing();
          return; 
        }

       
        if (this.character.isTopZombieColliding(enemy) && this.character.isAboveGround()) {
          this.handleZombieCollision(enemy, index);
        }

        if (!this.character.isInvulnerable && !this.character.isHurt()) {
          this.character.hit();
          this.updateLifeBar();
        }
      }
    });
  }

  /**
 * Handles the slashing effect by making the character invulnerable for a short period of time.
 * This prevents the character from taking damage while slashing.
 * @returns {void}
 */
  handleSlashing() {
    this.character.isInvulnerable = true;
    if (!this.character.slashTimeout) {
      this.character.slashTimeout = setTimeout(() => {
        this.character.isInvulnerable = true;
        this.character.isSlashing = false;
        this.character.isInvulnerable = false;
        this.character.slashTimeout = null;
      }, 300);
    }
  }

  /**
 * Handles the collision with a zombie by making the character invulnerable and removing the zombie.
 * A short delay is added before the character becomes vulnerable again.
 * @param {Object} enemy - The enemy (zombie) that the character collided with.
 * @param {number} index - The index of the enemy in the enemies array.
 * @returns {void}
 */
  handleZombieCollision(enemy, index) {
    this.character.isInvulnerable = true;
    this.removeEnemy(enemy, index);

    setTimeout(() => {
      this.character.isInvulnerable = false;
    }, 900);
  }

  /**
 * Checks for collisions between the character and zombie hands.
 * If a collision is detected, the character takes damage unless invulnerable.
 * @returns {void}
 */
  checkZombieHandCollisions() {
    this.level.zombieHands.forEach((zombieHand) => {
      if (this.character.isColliding(zombieHand)) {
        if (!this.character.isInvulnerable) {
          this.character.hit();
          this.updateLifeBar();
        }
      }
    });
  }

  /**
 * Checks for collisions between throwable objects and enemies.
 * This function iterates over all throwable objects and handles their collision.
 * @returns {void}
 */
  checkThrowableObjectCollisions() {
    this.throwableObjects.forEach((bottle, bottleIndex) => {
      this.handleThrowableObjectCollision(bottle, bottleIndex);
    });
  }

  /**
   * Handles collisions between throwable objects (like poison bottles) and enemies.
   * @param {ThrowableObject} bottle - The throwable object.
   * @param {number} bottleIndex - The index of the bottle in the throwable objects array.
   */
  handleThrowableObjectCollision(bottle, bottleIndex) {
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (bottle.isColliding(enemy)) {
        this.removeThrowableObject(bottleIndex);
        this.removeEnemy(enemy, enemyIndex);
      }
    });

    if (this.endboss && bottle.isColliding(this.endboss)) {
      this.removeThrowableObject(bottleIndex);
      this.handleEndbossCollision();
    }
  }

  /**
 * Removes a throwable object from the game.
 * @param {number} bottleIndex - The index of the throwable object to remove.
 */
  removeThrowableObject(bottleIndex) {
    this.throwableObjects.splice(bottleIndex, 1);
  }

  /**
   * Removes an enemy from the game after it is defeated.
   * @param {Enemy} enemy - The enemy to remove.
   * @param {number} index - The index of the enemy in the enemies array.
   */
  removeEnemy(enemy, index) {
    enemy.playPoisonDeadAnimation(() => {
      this.level.enemies.splice(index, 1);
    });
  }

  /**
   * Handles the collision between a throwable object and the end boss.
   */
  handleEndbossCollision() {
    if (this.endboss.isHurt()) return; 
    this.endboss.playHurtAnimation();
    this.endboss.hit();
    this.updateEndbossLifeBar();
  }

  /**
  * Checks for collisions during the slashing action of the character.
  */
  checkSlashingCollisions() {
    if (this.endboss.isDying) return; 
    if (this.character.isColliding(this.endboss) && this.character.isSlashing) {
      this.handleEndbossCollision();
    } else if (this.character.isColliding(this.endboss)) {
      this.character.hit();
      this.updateLifeBar();
    }

    this.level.enemies.forEach((enemy, index) => {
      if (this.character.isColliding(enemy) && this.character.isSlashingColliding(enemy)) {
        this.removeEnemy(enemy, index);
      }
    });
  }

  /**
 * Checks if the game is over based on the status of the character and the end boss.
 */
  checkGameOver() {
    if (!this.gameOver) {
        if (this.character.isDead()) {
            this.handleGameOverSequence("endboss", this.character.playDeathAnimation.bind(this.character));
        } else if (this.endboss.isDead()) {
            this.handleGameOverSequence("character", this.endboss.playDeadAnimation.bind(this.endboss));
        }
    }
}

/**
 * Verwaltet die Game-Over-Sequenz.
 * @param {string} winner - Der Gewinner des Spiels ("character" oder "endboss").
 * @param {Function} playDeathAnimation - Die Todesanimation, die abgespielt werden soll.
 */
handleGameOverSequence(winner, playDeathAnimation) {
  AudioHub.playSound(winner === "character" ? AudioHub.YouWinSound : AudioHub.GameOverSound);

    setTimeout(() => { this.gameOver = true; }, 1000);

    setTimeout(() => {
        this.renderGameOver(winner);
        this.hidePanel2();
        this.handleGameOver();
    }, 1000);

    setTimeout(playDeathAnimation, 100);
    setTimeout(() => { this.stopAllIntervals(); }, 4000);
}

  /**
 * Handles the game over logic.
 * Checks if sound is enabled, and if so, stops all sounds and starts the background music.
 * @returns {void}
 */
  handleGameOver() {
    if (AudioHub.soundEnabled) {
      AudioHub.stopGameSound();
    }
  }

  /**
   * Hides the panel with the class 'panel2'.
   * This function is typically used to hide the game over panel or any other UI element with that class.
   * @returns {void}
   */
  hidePanel2() {
    let panel2 = document.querySelector(".panel2");
    if (panel2) {
      panel2.style.display = "none";
    }
  }

  /**
   * Stops all active intervals related to the game, including the movement and walking intervals of the Endboss.
   * This is typically used to halt the game when it's over or paused.
   * @returns {void}
   */
  stopAllIntervals() {
    if (this.intervalID) clearInterval(this.intervalID);
    if (this.endboss.movementInterval) clearInterval(this.endboss.movementInterval);
    if (this.endboss.walkingInterval) clearInterval(this.endboss.walkingInterval);
    if (this.level.enemies) {
      this.level.enemies.forEach(enemy => {
          if (enemy instanceof Zombies) {
              enemy.stopZombieIntervals(); 
          }
      });
  }
}

  /**
   * Renders the game over screen, displaying either a victory or defeat message based on the winner.
   * Hides the canvas and displays the start screen with an appropriate message.
   * @param {string} winner - The winner of the game, either "character" or "endboss".
   * @returns {void}
   */
  renderGameOver(winner) {
    canvas = document.getElementById("canvas");
    canvas.classList.add("d-none");
    let endScreen = document.getElementById("startScreen");
    if (winner == "character") {
      endScreen.innerHTML = wonGameTemplate();
    } else {
      endScreen.innerHTML = lostGameTemplate();
    }
  }

  /**
 * Draws the game scene, including all the objects in the game world, the character, enemies, and status bars.
 * Continuously redraws the scene and checks for the game-over condition.
 * @returns {void}
 */
  draw() {
    if (this.gameOver) {
      return;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);

    this.addObjectToMap(this.level.backgroundObjects);
    this.addObjectToMap(this.level.moon);
    this.addObjectToMap(this.level.clouds);
    this.addObjectToMap(this.level.start);
    this.addObjectToMap(this.level.objects);
    this.addObjectToMap(this.throwableObjects);
    this.addObjectToMap(this.level.zombieHands);
    this.addObjectToMap(this.level.groundObject);

    this.ctx.translate(-this.camera_x, 0); 

    this.level.statusBar.forEach((statusBar) => {
      this.addToMap(statusBar); 
    });

    this.ctx.translate(this.camera_x, 0); 

    this.addToMap(this.character);
    this.addObjectToMap(this.level.enemies);
    this.addToMap(this.endboss);

    this.ctx.translate(-this.camera_x, 0);

    this.checkGameOver();
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
 * Adds a list of objects to the map (canvas). 
 * This function is responsible for drawing multiple objects (such as backgrounds or game entities) at once.
 * @param {Array} objects - Array of objects to be drawn on the map.
 * @returns {void}
 */
  addObjectToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });

  }

  /**
 * Draws an individual object on the map (canvas).
 * Handles special cases like adjusting the opacity or flipping the image.
 * @param {MovableObject} mo - The object to be drawn on the map.
 * @returns {void}
 */
  addToMap(mo) {
    if (mo instanceof BackgroundObject || mo instanceof Cloud) {
      this.ctx.globalAlpha = mo.opacity;
    } else {
      this.ctx.globalAlpha = 1;
    }

    if (mo.otherDirection) {
      this.flipImage(mo);
    }

    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
 * Flips an image horizontally for objects facing the opposite direction.
 * This function is used when the object should be drawn in reverse (mirrored).
 * @param {MovableObject} mo - The object whose image will be flipped.
 * @returns {void}
 */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
 * Restores the flipped image to its original orientation.
 * This function undoes the effect of flipImage, returning the object to its normal direction.
 * @param {MovableObject} mo - The object whose image will be restored.
 * @returns {void}
 */
  flipImageBack(mo) {
    this.ctx.restore();
    mo.x = mo.x * -1;
  }
}