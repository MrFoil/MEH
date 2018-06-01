/**
 * Created by foil on 26.07.2016.
 */
function DestroyEntity() {
    this.super.constructor.apply(this, arguments);
    this.name = "DestroyEntity";
}
inheritance(Subject, DestroyEntity);

DestroyEntity.prototype.notifyObservers = function() {
    //console.log(this.observerList);
    var i;
    for (i in this.observersList){
        this.observersList[i].notify(arguments);
    }
};