class AudioHub {
    static backgroundmusic = new Audio('./audio/hope-cinematic-loop-273335.mp3');

    // Alle Sounds als Array
    static allSounds = [AudioHub.backgroundmusic];

    // Musik starten
    static startBackgroundMusic() {
        AudioHub.backgroundmusic.loop = true; // Musik in Schleife abspielen
        AudioHub.backgroundmusic.volume =0.4;
        AudioHub.backgroundmusic.play().catch(e => console.error("Fehler beim Abspielen der Musik: ", e));
    }

    // Alle Sounds stoppen
    static stopAll() {
        AudioHub.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0; // Optional: Setze die Wiedergabezeit zurück
        });
    }
}
