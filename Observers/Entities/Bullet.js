function Bullet(startX, startY, moveSpeed, radius, color, moveDirection, bulletType){
    //console.log(this.bulletType);
    this.super.constructor.apply(this, arguments);
    
    this.position       = {x: startX, y: startY};
    this.moveDirection  = moveDirection;
    this.moveSpeed      = moveSpeed;
    this.radius         = radius;
    this.color          = color;
    this.lastUpdateTime = null;
    this.shapeType      = "Circle";
    this.bulletType     = bulletType;

    pool.addEntity(this);
}
inheritance(Entity, Bullet);

Bullet.prototype.getDamage = function(damage){
    //console.log("DESTROY THE BULLET");
    subjectHandler.notifyObservers("DestroyEntity", this);
};

Bullet.prototype.move = function(deltaTime) {
    this.position.x += this.moveDirection.x * this.moveSpeed * deltaTime;
    this.position.y += this.moveDirection.y * this.moveSpeed * deltaTime;
};

Bullet.prototype.update = function(time) {
    if (this.position.y <= -200 || (this.position.y >= SCREEN_HEIGHT + 100)) {
        subjectHandler.notifyObservers("DestroyEntity", this);
    }
    
    var deltaTime;
    if (this.lastUpdateTime == null) {
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.move(deltaTime);

    this.lastUpdateTime = new Date().getTime();

};

Bullet.prototype.destroy = function(){

};

Bullet.prototype.draw = function() {
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI);
    context.fillStyle = this.color;
    context.fill();
};