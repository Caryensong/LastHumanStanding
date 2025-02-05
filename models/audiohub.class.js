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

    static soundEnabled = true;

    static startBackgroundMusic() {
        AudioHub.backgroundmusic.loop = true; // Musik in Schleife abspielen
        AudioHub.backgroundmusic.volume = 0.4;
        AudioHub.backgroundmusic.play();
    }

    static stopAllSound() {
        this.soundEnabled = false;
        this.allSounds.forEach(sound => {
            sound.pause();
            sound.volume = 0;
            sound.currentTime = 0;
        });
    }

    static toggleSound() {
        this.soundEnabled = !this.soundEnabled; // Umschalten

        if (this.soundEnabled) {
            this.startBackgroundMusic();
            this.allSounds.forEach(sound => {
                if (sound !== this.backgroundmusic) {
                    sound.volume = 1; // Setze Lautstärke wieder hoch
                    sound.play();
                }
            });
        } else {
            this.stopAllSound();
        }
    }

    static playSound(sound) {
        if (this.soundEnabled) {
            sound.play();
            AudioHub.EndbossWalk.volume = 0.4;
        }
    }
}
