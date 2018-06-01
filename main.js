/**
 * Created by foil on 12/06/16.
 */
// HERE ARE GLOBALS
var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");
var subjectHandler = new SubjectHandler();
var SCREEN_WIDTH = 1300, SCREEN_HEIGHT = 650, ENEMY_AMOUNT = 5;

// Set the background
context.fillStyle = "#4d4dff";
context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

var enemyImage = new Image();
enemyImage.src = "NICE.jpg";

var playerImage = new Image();
playerImage.src = "Player.png";

var tileImage = new Image();
tileImage.src = "space-tile.jpg";

var background = new Background(SCREEN_WIDTH, SCREEN_HEIGHT, 360, 360, 0.05, tileImage);
// Creating a pool of entities
var pool = new Pool();
pool.addEntity(new Player(SCREEN_WIDTH/2, SCREEN_HEIGHT-60, 100, 50, playerImage));

for (var i=0; i<ENEMY_AMOUNT; i++){
    pool.addEntity(new Enemy(SCREEN_WIDTH/ENEMY_AMOUNT*i, 30, 52, 62, enemyImage));
}

subjectHandler.addSubject(new Hit());
subjectHandler.registerObserver("Hit", pool);

subjectHandler.addSubject(new DestroyEntity());
subjectHandler.registerObserver("DestroyEntity", pool);

// Creating a CollisionDetector
var collider = new CollisionDetector();

renderLoop();

function renderLoop() {
    requestAnimationFrame(renderLoop);
    var currentTime = new Date().getTime();
    
    // CLEAN UP THE SHEET
    context.fillStyle = "#4d4dff";
    context.fillRect(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
    // ------------------------------

    background.update(currentTime);
    background.draw();

    pool.updateMembers(currentTime);
    collider.checkCollisions(pool);
    pool.drawMembers();
}


