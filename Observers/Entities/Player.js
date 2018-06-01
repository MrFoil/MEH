/**
 * Created by foil on 12/06/16.
 */
function Player(startX, startY, width, height, img) {
    console.log("Player constructor");
    this.super.constructor.apply(this, arguments);

    this.position       = {x: startX, y: startY};
    this.moveDirection  = {x: 1, y: 0};
    this.shootDirection = {x: 0, y: -1};
    
    this.width          = width;
    this.height         = height;
    this.img            = img;
    
    this.moveSpeed      = 0.5;
    
    this.shootTime      = 0;   // Initial shootTime that is needed for shoot timer
    this.SHOOT_PERIOD   = 180;
    this.lastUpdateTime = null;
    
    this.shapeType      = "Rectangle";
    
    this.hitsCounter    = 15;
    this.hitsPoint      = 15;

    this.healthBar      = new HealthBar(10, SCREEN_HEIGHT-40, 140, 20, this.hitsPoint, this);
    //subjectHandler.addSubject("PlayerHit", new PlayerHit());
    //subjectHandler.registerObserver("PlayerHit", this.healthBar);
}
inheritance(Entity, Player);

Player.prototype.update = function (time){
    var deltaTime;
    if (this.lastUpdateTime == null){
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.move(deltaTime);
    this.shoot();

    this.lastUpdateTime = new Date().getTime();
};

Player.prototype.getDamage = function(damage) {
    this.healthBar.update(damage);
};

Player.prototype.destroy = function() {
    alert("GAME OVER, BITHC");
    location.reload();
};


Player.prototype.shoot = function() {
    if (isKeyDown("SPACE")){
        var currentTime = new Date().getTime();
        
        if (currentTime >= (this.shootTime + this.SHOOT_PERIOD)){
            //console.log("Fire!");
            
            var bulletPosX = this.position.x + (this.width/2),
                bulletPosY = this.position.y;
            new Bullet(bulletPosX, bulletPosY, 0.8, 10, "#d2ff4d", this.shootDirection, "PlayerBullet");

            this.shootTime = new Date().getTime();
        }
    }
};

Player.prototype.move = function(deltaTime) {
    if (isKeyDown("LEFT")){
        this.position.x += -this.moveDirection.x * deltaTime * this.moveSpeed;
    }

    if (isKeyDown("RIGHT")){
        this.position.x += this.moveDirection.x * deltaTime * this.moveSpeed;
    }

    if (this.position.x >= SCREEN_WIDTH - 100){
        this.position.x += -this.moveDirection.x * deltaTime * this.moveSpeed;
    }

    if (this.position.x <= 0){
        this.position.x += this.moveDirection.x * deltaTime * this.moveSpeed;
    }
};

Player.prototype.draw = function() {
    this.healthBar.draw();
    //context.fillStyle = this.color;
    context.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
};