const level1 = new Level(
    [
        new StatusBar(10, 0, 'life'),  
        new StatusBar(10, 29, 'poison')
    ],
    [
        new Start('./img/background/Start.png', -60, 345, 80, 80),
        
    ],
    [
        new Zombies(), 
        new Zombies(), 
        new Zombies(),
        new Endboss()
    ],
    [
        new Moon()
    ],
    [
        new Cloud('./img/background/cloud.png', 0, 0.4),
        new Cloud('./img/background/cloud1.png', 0, 0.5),
        new Cloud('./img/background/cloud.png', 720, 0.4),
        new Cloud('./img/background/cloud1.png', 720, 0.5)
    ],
    [   new BackgroundObject('./img/background/3.1.png', -720, 0.1),
        new BackgroundObject('./img/background/4.1.png', -720, 0.5),
        new BackgroundObject('./img/background/2.1.png', -720, 0.9),
        new BackgroundObject('./img/background/stars.png', 720, 1),
        new BackgroundObject('./img/background/3.png', 0, 0.1),
        new BackgroundObject('./img/background/4.png', 0, 0.5),
        new BackgroundObject('./img/background/2.png', 0, 0.9),
        new BackgroundObject('./img/background/stars.png', 0, 1),
        new BackgroundObject('./img/background/3.1.png', 720, 0.1),
        new BackgroundObject('./img/background/4.1.png', 720, 0.5),
        new BackgroundObject('./img/background/2.1.png', 720, 0.9),
        new BackgroundObject('./img/background/stars.png', 1440, 1),
        new BackgroundObject('./img/background/3.1.png', 1440, 0.1),
        new BackgroundObject('./img/background/4.1.png', 1440, 0.5),
        new BackgroundObject('./img/background/2.1.png', 1440, 0.9),
        new BackgroundObject('./img/background/stars.png', 1440, 1),
    ]


);

