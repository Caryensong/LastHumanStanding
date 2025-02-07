/**
 *  Manages audio playback for the game, including background music and sound effects.
 * @class
 */
class AudioHub {
    static backgroundmusic = new Audio('./audio/hope-cinematic-loop-273335.mp3');
    static enemyHurt = new Audio('./audio/human_pain.mp3');
    static enemyWalking_sound = new Audio('./audio/zombie_walk.mp3');
    static CharWalk = new Audio('./audio/Walking1.mp3');
    static CharJump = new Audio('./audio/jump.mp3');
    static CharHurt = new Audio('./audio/hurt.mp3');
    static CharSlash = new Audio('./audio/sword-sound-260274.mp3');
    static CharDead = new Audio('./audio/human_pain.mp3');
    static EndbossWalk = new Audio('./audio/monster_step.mp3');
    static EndbossHurt = new Audio('./audio/monster-211717.mp3');
    static GameOverSound = new Audio('./audio/gameover.mp3');
    static YouWinSound = new Audio('./audio/win.mp3');
    static clickSound = new Audio('./audio/click.mp3');

    /** @type {HTMLAudioElement[]} List of all sound effects and background music.*/
    static allSounds = [
        AudioHub.backgroundmusic,
        AudioHub.enemyHurt,
        AudioHub.enemyWalking_sound,
        AudioHub.CharWalk,
        AudioHub.CharJump,
        AudioHub.CharSlash,
        AudioHub.CharDead,
        AudioHub.CharHurt,
        AudioHub.EndbossHurt,
        AudioHub.EndbossWalk,
        AudioHub.clickSound,
    ];
    /** @type {boolean} Indicates whether sound is enabled or disabled. */
    static soundEnabled = false;

    /**
    * Starts playing the background music in a loop.
    */
    static startBackgroundMusic() {
        AudioHub.backgroundmusic.loop = true;
        AudioHub.backgroundmusic.volume = 0.4;
        AudioHub.backgroundmusic.play();
    }

    /**
    * Stops all sounds and mutes them.
    */
    static stopAllSound() {
        this.soundEnabled = false;
        localStorage.setItem('soundEnabled', 'false');

        this.allSounds.forEach(sound => {
            sound.pause();
            sound.volume = 0;
            sound.currentTime = 0;
        });
    }

    /**
    * Toggles sound on or off and updates localStorage.
    */
    static toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        localStorage.setItem('soundEnabled', this.soundEnabled ? 'true' : 'false');

        if (this.soundEnabled) {
            this.startBackgroundMusic();
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 1;
                }
            });
        } else {
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 0;
                    sound.pause();
                }
            });
            this.backgroundmusic.pause();
        }
    }

    /**
   * Loads the saved sound state from localStorage and applies it.
   */
    static loadSoundState() {
        const savedSoundState = localStorage.getItem('soundEnabled');
        console.log('Gespeicherter Sound-Status:', savedSoundState);
        if (savedSoundState === null) {
            this.soundEnabled = false;
            localStorage.setItem('soundEnabled', 'false');  // Speichert Standardwert im localStorage
        } else if (savedSoundState === 'true') {
            this.soundEnabled = true;
        } else {
            this.soundEnabled = false;
        }

        if (this.soundEnabled) {
            this.startBackgroundMusic();
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 1;
                }
            });
        } else {
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 0;
                    sound.pause();
                }
            });
            this.backgroundmusic.pause(); // Hintergrundmusik extra stoppen
        }
    }

    /**
    * Plays a given sound if sound is enabled.
    * @param {HTMLAudioElement} sound - The sound effect to play.
    */
    static playSound(sound) {
        if (this.soundEnabled) {
            sound.play();
            AudioHub.EndbossWalk.volume = 0.4;
        }
    }
}
