/**
 * Created by foil on 20/07/16.
 */
function HealthBar(positionX, positionY, length, height, hitPoints, ownerEntity){
    this.position       = {x: positionX, y: positionY};
    this.hitPoints      = hitPoints;
    this.GREEN          = "#00e600";
    this.YELLOW         = "#ffcc00";
    this.RED            = "#e60000";
    this.length         = length;
    this.height         = height;
    this.hitPointLength = length/hitPoints - 1;
    this.colorDelimeter = Math.floor(this.hitPoints/3);

    this.ownerEntity    = ownerEntity;
    console.log("My owner is: ", this.ownerEntity);
}
inheritance(Observer, HealthBar);

HealthBar.prototype.notify = function(){
    console.log(arguments);
    this.hitPoints -= arguments[0][0][1]; // Subtract damage from hitPoints
    this.length    -= arguments[0][0][1] * this.hitPointLength; // Calculate length of hitBar

    if (this.hitPoints == 0){
        alert("GAME OVER");
    }
};

HealthBar.prototype.update = function(damage) {
    this.hitPoints -= damage; // Subtract damage from hitPoints
    this.length    -= damage * this.hitPointLength; // Calculate length of hitBar
    if (this.hitPoints == 0){
        subjectHandler.notifyObservers("DestroyEntity", this.ownerEntity);
    }
};

HealthBar.prototype.setPosition = function(newPosition){
    this.position = newPosition;
};

//HealthBar.prototype.

HealthBar.prototype.draw = function(){

    if (this.hitPoints >= 2*this.colorDelimeter){
        context.fillStyle = this.GREEN;
    } else if ((this.hitPoints >= this.colorDelimeter) && (this.hitPoints < 2*this.colorDelimeter)){
        context.fillStyle = this.YELLOW;
    } else if (this.hitPoints <= this.colorDelimeter){
        context.fillStyle = this.RED;
    }
    context.fillRect(this.position.x, this.position.y, this.length, this.height);
};