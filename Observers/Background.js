/**
 * Created by foil on 28/06/16.
 */
function Background(screenWidth, screenHeight, tileWidth, tileHeight, speed, img){
    
    this.lines = [];
    this.lineNumber   = Math.ceil((screenHeight+400)/tileHeight);
    this.tilesInLine  = Math.ceil(screenWidth/tileWidth) + 1;
    this.tileWidth    = tileWidth;
    this.tileHeight   = tileHeight;
    this.firstTilePos = {x: 0, y: -400};
    this.speed        = speed;
    this.img          = img;
    this.lastUpdateTime = null;


    for (var i=0; i<this.lineNumber; i++){
        this.lines.push(new TileLine(this.tilesInLine, this.tileWidth, this.tileHeight, 0, (this.lineNumber-i-1)*this.tileHeight+this.firstTilePos.y, this.speed, this.img));
    }
}
inheritance(Observer, Background);

Background.prototype.update = function(time){
    this.replacement(this);

    var deltaTime;
    if (this.lastUpdateTime == null) {
        deltaTime = 0;
    } else {
        deltaTime = time - this.lastUpdateTime;
    }

    this.move(deltaTime);

    this.lastUpdateTime = new Date().getTime();
};

Background.prototype.replacement = function(context){
    if (context.lines[0].line[0].position.y >= SCREEN_HEIGHT){
        context.lines.splice(0, 1);
        var newPosY = context.lines[context.lines.length-1].line[0].position.y - context.tileHeight;
        context.lines.push(new TileLine(context.tilesInLine, context.tileWidth, context.tileHeight, 0, newPosY, context.speed, context.img));
    }
};

Background.prototype.move = function(deltaTime){
    var i;
    for (i in this.lines){
        this.lines[i].move(deltaTime);
    }
};

Background.prototype.draw = function(){
    var i;
    for (i in this.lines){
        this.lines[i].draw();
    }
};