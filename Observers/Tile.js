/**
 * Created by foil on 28/06/16.
 */
function Tile(positionX, positionY, width, height, speed, img){

    this.position   = {x: positionX, y: positionY};
    this.width      = width;
    this.height     = height;
    this.img        = img;
    this.moveSpeed  = speed;
}
inheritance(Observer, Tile);

Tile.prototype.update = function(time){
    /*if (this.position.y >= SCREEN_HEIGHT + 200){
        // Generate new line of tiles 
    }*/

    var deltaTime;
    if (this.lastUpdateTime == null) {
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.move(deltaTime);

    this.lastUpdateTime = new Date().getTime();
};

Tile.prototype.destroy = function() {

};

Tile.prototype.move = function(deltaTime){
    this.position.y += this.moveSpeed * deltaTime;
};

Tile.prototype.draw = function(){
    context.drawImage(this.img, this.position.x, this.position.y, this.width, this.height);
};