/**
 * Created by foil on 22/06/16.
 */
// TODO: Should be singletone!
function Hit(){
    this.super.constructor.apply(this, arguments);
    this.name = "Hit";
}
inheritance(Subject, Hit);

Hit.prototype.notifyObservers = function(){
    var i;
    console.log(this.observersList);
    for (i in this.observersList){
        this.observersList[i].notify(arguments);
    }
    
};
