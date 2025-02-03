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
    [   new BackgroundObject('./img/background/3.1.png', -720, 0, 720, 480, 0.1),
        new BackgroundObject('./img/background/4.1.png', -720, 0, 720, 480, 0.5),
        new BackgroundObject('./img/background/2.1.png', -720, 0, 720, 480, 0.9),

        new BackgroundObject('./img/background/4.png', 0, 0, 720, 480, 0.5),
        new BackgroundObject('./img/background/stars.png', 0, 0, 720, 480, 1), 
        new BackgroundObject('./img/background/3.png', 0, 0, 720, 480, 0.1),        
        new BackgroundObject('./img/trees/jungle_tree_5.png', 50, 190 ,80, 220, 0.5),       
        new BackgroundObject('./img/background/2.png', 0, 0, 720, 480, 0.9),

        new BackgroundObject('./img/trees/jungle_tree_6.png', 580, 235 , 70, 180, 0.9),
      
        
        new BackgroundObject('./img/trees/winter_tree_10.png', -210, 385 ,200, 70, 0.9),
        new BackgroundObject('./img/trees/winter_tree_10.png', -150, 425 ,200, 70, 0.9),
        new BackgroundObject('./img/trees/winter_tree_10.png', -50, 450 ,200, 50, 0.9),
        new BackgroundObject('./img/trees/winter_tree_10.png', 155, 425 ,200, 70, 0.9),
        new BackgroundObject('./img/trees/winter_tree_10.png', 275, 425 ,200, 70, 0.9),
        new BackgroundObject('./img/trees/winter_tree_10.png', 675, 425 ,200, 70, 0.8),
        new BackgroundObject('./img/trees/jungle_tree_5.png', 250, 195 ,80, 220, 0.7),

        

        new BackgroundObject('./img/background/stars.png', 720, 0, 720, 480, 1),
        new BackgroundObject('./img/background/4.png', 720, 0, 720, 480, 0.5),
        new BackgroundObject('./img/trees/winter_tree_8.png', 1090, 221 ,100, 180, 0.7),
        new BackgroundObject('./img/trees/winter_tree_8.png', 1050, 225 ,100, 180, 0.7),
        new BackgroundObject('./img/background/3.1.png', 720, 0, 720, 480, 0.1),
        new BackgroundObject('./img/background/4.1.png', 720, 0, 720, 480, 0.5),
        new BackgroundObject('./img/trees/winter_tree_8.png', 1150, 190 ,150, 220, 0.7),
        new BackgroundObject('./img/trees/winter_tree_8.png', 950, 190 ,150, 220, 0.9),
        new BackgroundObject('./img/background/2.1.png', 720, 0, 720, 480, 0.9),

        
        new BackgroundObject('./img/background/stars.png', 1440, 0, 720, 480, 1),
        new BackgroundObject('./img/background/3.1.png', 1440, 0, 720, 480, 0.1),
        new BackgroundObject('./img/background/4.1.png', 1440, 0, 720, 480, 0.5),
        new BackgroundObject('./img/background/2.png', 1440, 0, 720, 480, 0.9),

        new BackgroundObject('./img/trees/winter_tree_8.png', 1250, 195 ,150, 220, 0.9),
      
       
        new BackgroundObject('./img/trees/jungle_tree_6.png', 660, 195 ,80, 220, 0.8),
        new BackgroundObject('./img/background/stars.png', 2160, 0, 720, 480, 0.1 ),
        new BackgroundObject('./img/background/3.1.png', 2160, 0, 720, 480, 0.1),
        new BackgroundObject('./img/background/4.1.png', 2160, 0, 720, 480, 0.5), 
        
        new BackgroundObject('./img/background/2.1.png', 2160, 0, 720, 480, 0.9),
    ]


);

