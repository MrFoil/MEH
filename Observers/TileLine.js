/**
 * Created by foil on 28/06/16.
 */
function TileLine(tileNum, tileWidth, tileHeight, startX, startY, speed, img){
   
    this.line         = [];
    this.tileWidth    = tileWidth;
    this.tileHeight   = tileHeight;
    this.firstTilePos = {x: startX, y: startY};
    this.img          = img;
    this.lastUpdateTime = null;



    for (var i=0; i<tileNum; i++){
        this.line.push(new Tile(i*tileWidth+startX, startY, tileWidth, tileHeight, speed, img));
    }
}
inheritance(Observer, TileLine);

TileLine.prototype.update = function(time){
    var deltaTime;
    if (this.lastUpdateTime == null) {
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.move(deltaTime);

    this.lastUpdateTime = new Date().getTime();
};

TileLine.prototype.destroy = function(){

};

TileLine.prototype.move = function(deltaTime){
    for (var i=0; i<this.line.length; i++){
        this.line[i].move(deltaTime);
    }
};

TileLine.prototype.draw = function(){
    for (var i=0; i<this.line.length; i++){
        this.line[i].draw();
    }
};