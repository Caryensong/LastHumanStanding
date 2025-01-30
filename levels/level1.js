const level1 = new Level(
    [
        new StatusBar(10, 0, 200, 40, 'life'),  
        new StatusBar(10, 29, 200, 40, 'poison'),
        new StatusBar(490, 15, 200, 70, 'endbossLife')

    ],
    [
        new Start('./img/background/Start.png', -60, 345, 80, 80),
        
    ],
    [
        new PoisonObjects(10, 200),
        new PoisonObjects(10, 200),
        new PoisonObjects(720, 200),
        new PoisonObjects(720, 200 ),
        new PoisonObjects(1440, 200),
        new PoisonObjects(1440, 200),

        new LifeObjects(720, 200),
        new LifeObjects(720, 200),
        new LifeObjects(1440, 200),
        //unterwasser 
        new LifeObjects(60, 500),
        new LifeObjects(30, 600),
    ],
    [
        new Zombies(), 
        new Zombies(), 
        new Zombies(),
    ],
    [
        new ZombieHand(740, 405, 20, 45),
        new ZombieHand(750, 400, 30, 35),
    ],
    [
        new Moon()
    ],
    [
        new Cloud('./img/background/cloud.png', 0, 0.4),
        new Cloud('./img/background/cloud1.png', 0, 0.5),
        new Cloud('./img/background/cloud.png', 720, 0.4),
        new Cloud('./img/background/cloud1.png', 720, 0.5),
        new Cloud('./img/background/cloud.png', 1440, 0.4),
        new Cloud('./img/background/cloud1.png', 1440, 0.5),
        new Cloud('./img/background/cloud.png', 2160, 0.4),
        new Cloud('./img/background/cloud1.png', 2160, 0.5)
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
        new BackgroundObject('./img/background/stars.png', 2160, 1),
        new BackgroundObject('./img/background/3.1.png', 2160, 0.1),
        new BackgroundObject('./img/background/4.1.png', 2160, 0.5),
        new BackgroundObject('./img/background/2.1.png', 2160, 0.9),
    ]


);

