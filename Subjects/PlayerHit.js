/**
 * Created by foil on 21/07/16.
 */
function PlayerHit(){
    this.super.constructor.apply(this, arguments);
    this.name = "PlayerHit";
}
inheritance(Subject, PlayerHit);

PlayerHit.prototype.notifyObservers = function(){
    var i;
    for (i in this.observersList){
        this.observersList[i].notify(arguments);
    }

};