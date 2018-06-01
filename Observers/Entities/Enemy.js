/**
 * Created by foil on 17/06/16.
 */
function Enemy(startX, startY, width, height, img){
    console.log("Enemy constructor");
    this.super.constructor.apply(this, arguments);
    
    this.position       = {x: startX, y: startY};
    this.directionPoint = {x: null, y: null};
    this.moveDirection  = {x: null, y: null};
    this.shootDirection = {x: 0, y: 1};

    this.width          = width;
    this.height         = height;
    this.img            = img;

    this.moveSpeed      = 0.1;
    this.moveDirection  = true;

    this.lastUpdateTime = null;
    this.shootTime      = 0;   // Initial shootTime that is needed for shoot timer
    this.SHOOT_PERIOD   = 880;

    this.shapeType      = "Rectangle";

    //this.hitsCounter    = 0;
    this.hitsPoints     = 2;

    this.healthBar      = new HealthBar(this.position.x, this.position.y - 5, this.width, 5, this.hitsPoints, this);
}
inheritance(Entity, Enemy);

Enemy.prototype.update = function(time){
    //console.log(this.hitsCounter);
    var deltaTime;
    if (this.lastUpdateTime == null){
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.healthBar.setPosition({x: this.position.x, y: this.position.y - 5});
    this.calculateMoveDirection();
    this.move(deltaTime);
    this.shoot();

    this.lastUpdateTime = new Date().getTime();
};

Enemy.prototype.getDamage = function(damage){
    this.healthBar.update(damage);
};

Enemy.prototype.generateDirectionPoint = function(){
    this.directionPoint.x = getRandomInt(0, SCREEN_WIDTH - 50);
    this.directionPoint.y = getRandomInt(0, SCREEN_HEIGHT - 300);
};

Enemy.prototype.calculateMoveDirection = function(){
    var temp = {};
    if (this.directionPoint.x == null || this.directionPoint.y == null){
        this.generateDirectionPoint();
        temp = calculateVector(this.position, this.directionPoint);
        this.moveDirection = normalizeVector(temp);
        //console.log(this.directionPoint);
    }
    if (checkApproximateEquation(this.position.x, this.directionPoint.x, 10) && checkApproximateEquation(this.position.y, this.directionPoint.y, 10)){
        this.generateDirectionPoint();
        temp = calculateVector(this.position, this.directionPoint);
        this.moveDirection = normalizeVector(temp);
    }

};

Enemy.prototype.move = function(deltaTime){
    this.position.x += this.moveDirection.x * this.moveSpeed * deltaTime;
    this.position.y += this.moveDirection.y * this.moveSpeed * deltaTime;
};

Enemy.prototype.shoot = function(){
    var currentTime = new Date().getTime();

    if (currentTime >= (this.shootTime + this.SHOOT_PERIOD)){
        //console.log("Fire!");

        var bulletPosX = this.position.x + (this.width/2),
            bulletPosY = this.position.y + this.height;
        new Bullet(bulletPosX, bulletPosY, 0.2, 10, "#ff0000", this.shootDirection, "EnemyBullet");

        this.shootTime = new Date().getTime();
    }
};

Enemy.prototype.destroy = function(){
    
};

Enemy.prototype.draw = function(){
    //this.healthBar.draw();
    //context.fillStyle = this.color;
    context.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
    this.healthBar.draw();
};

