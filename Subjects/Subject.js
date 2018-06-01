/**
 * Created by foil on 22/06/16.
 */
function Subject(){
    console.log("Subject constructor");
    this.observersList = [];
    this.name = "";
}

Subject.prototype.registerObserver = function(observer){
    console.log("Registering " + observer + " in subject")
    this.observersList.push(observer);
};

Subject.prototype.unregisterObserver = function(observer){
    var index = this.observersList.indexOf(observer);
    this.observersList.splice(index, 1);
};

Subject.prototype.notifyObservers = function(){
    
};