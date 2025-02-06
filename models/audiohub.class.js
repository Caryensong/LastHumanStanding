class AudioHub {
    static backgroundmusic = new Audio('./audio/hope-cinematic-loop-273335.mp3');
    static enemyHurt = new Audio('./audio/human_pain.mp3');
    static enemyWalking_sound = new Audio('./audio/zombie_walk.mp3');
    static CharWalk = new Audio('./audio/Walking1.mp3');
    static CharJump = new Audio('./audio/jump.mp3');
    static CharHurt = new Audio('./audio/hurt.mp3');
    static CharSlash = new Audio('./audio/sword-sound-260274.mp3');
    static EndbossWalk = new Audio('./audio/monster_step.mp3');
    static EndbossHurt = new Audio('./audio/monster-211717.mp3');

    static allSounds = [
        AudioHub.backgroundmusic,
        AudioHub.enemyHurt,
        AudioHub.enemyWalking_sound,
        AudioHub.CharWalk,
        AudioHub.CharJump,
        AudioHub.CharSlash,
        AudioHub.CharHurt,
        AudioHub.EndbossHurt,
        AudioHub.EndbossWalk,
    ];

    static soundEnabled = false;  // Standardmäßig auf 'false' setzen

    static startBackgroundMusic() {
        AudioHub.backgroundmusic.loop = true; // Musik in Schleife abspielen
        AudioHub.backgroundmusic.volume = 0.4;
        AudioHub.backgroundmusic.play();
    }

    static stopAllSound() {
        this.soundEnabled = false;
        localStorage.setItem('soundEnabled', 'false');

        this.allSounds.forEach(sound => {
            sound.pause();
            sound.volume = 0;
            sound.currentTime = 0;
        });
    }

    static toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        // Speichern des Sound-Status im localStorage
        localStorage.setItem('soundEnabled', this.soundEnabled ? 'true' : 'false');

        if (this.soundEnabled) {
            this.startBackgroundMusic();
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 1; // Setze Lautstärke wieder hoch
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

    static loadSoundState() {
        const savedSoundState = localStorage.getItem('soundEnabled');
        console.log('Gespeicherter Sound-Status:', savedSoundState);  
         // Wenn kein Wert gespeichert ist (erste Besuch), setzen wir den Sound auf true.
         if (savedSoundState === null) {
            this.soundEnabled = false;  // Setzt Standardwert
            localStorage.setItem('soundEnabled', 'true');  // Speichert Standardwert im localStorage
        } else if (savedSoundState === 'true') {
            this.soundEnabled = true;
        } else {
            this.soundEnabled = false;
        }

        // console.log("Sound aktiviert:", this.soundEnabled); 

        if (this.soundEnabled) {
            this.startBackgroundMusic();
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 1; // Setze Lautstärke wieder hoch
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

    static playSound(sound) {
        if (this.soundEnabled) {
            sound.play();
            AudioHub.EndbossWalk.volume = 0.4;
        }
    }
}
