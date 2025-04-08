/**
 * Initializes the level with various objects such as status bars, start image, poison objects, life objects, zombies, background objects, etc.
 * 
 * This function creates a new instance of the `Level` with all the necessary objects and places them at the appropriate positions in the game.
 * It creates objects for status bars (e.g., life bar, poison bar, endboss life), start objects, poison and life objects, zombies, background elements, and special objects such as moons and clouds.
 *
 * @function initLevel
 * @returns {void} This function does not return anything. It simply initializes the level and places all the objects.
 * 
 * @example
 * // Calling the function to initialize the level
 * initLevel();
 * 
 * @description
 * - Creates a level with a set of objects:
 *    - `StatusBar`: Bars for life, poison, and endboss life.
 *    - `Start`: A start image placed at the specified position.
 *    - `PoisonObjects`: Poison objects appearing at different positions.
 *    - `LifeObjects`: Life objects appearing at different positions.
 *    - `Zombies`: Enemy zombies appearing in the level.
 *    - `Moon`: A moon object that appears in the background.
 *    - `Cloud`: Cloud objects that move across the background.
 *    - `BackgroundObject`: Various background objects such as trees, stars, and landscapes.
 *    - `ZombieHand`: Objects representing zombie hands.
 * 
 * @see {@link Level} for details about the `Level` class.
 * @see {@link StatusBar} for details about the `StatusBar` class.
 * @see {@link PoisonObjects} for details about the `PoisonObjects` class.
 * @see {@link LifeObjects} for details about the `LifeObjects` class.
 * @see {@link Zombies} for details about the `Zombies` class.
 * @see {@link Moon} for details about the `Moon` class.
 * @see {@link Cloud} for details about the `Cloud` class.
 * @see {@link BackgroundObject} for details about the `BackgroundObject` class.
 * @see {@link ZombieHand} for details about the `ZombieHand` class.
 */
function initLevel() {

    level1 = new Level(
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
        ],
        [
            new Zombies(), 
            new Zombies(), 
            new Zombies(),
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
        [   
            new BackgroundObject('./img/background/3.1.png', -720, 0, 720, 480, 0.1),
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
        ],
        [
            new ZombieHand(695, 405, 20, 45),
            new ZombieHand(705, 400, 30, 35),
        ],
        [
            new BackgroundObject('./img/background/ground.png', 645, 432, 100, 100, 0.9),
            new BackgroundObject('./img/trees/winter_tree_10.png', 675, 425 ,200, 70, 0.8),
            new BackgroundObject('./img/trees/winter_tree_10.png', 625, 425 ,200, 90, 0.9)
        ],
    );
}
