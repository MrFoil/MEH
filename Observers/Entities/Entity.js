/**
 * Created by foil on 12/06/16.
 */
function Entity() {
    //console.log("Empty Entity constructor");
    this.id = generateId();
}
inheritance(Observer, Entity);
Entity.prototype.draw = function() {
    console.log("Entity's abstract draw() method");
};

Entity.prototype.update = function() {
    console.log("Entity's abstract update() method");
};

