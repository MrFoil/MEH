/**
 * Created by foil on 18/06/16.
 */

function Pool(){
     this.list = {};
}
inheritance(Observer, Pool);

Pool.prototype.addEntity = function(newEntity){
    this.list[newEntity.id] = newEntity;
};

Pool.prototype.removeEntity = function(entity){
    delete this.list[entity.id];
};

Pool.prototype.updateMembers = function(time){
    var i, enemiesAlive = false;

    for (i in this.list){
        if (this.list[i] instanceof Enemy){
            enemiesAlive = true;
        }
        this.list[i].update(time);
    }

    if (!enemiesAlive){
        alert("All enemies are dead, grats");
        location.reload();
    }
};

Pool.prototype.drawMembers = function(){
    var i;
    for (i in this.list){
        this.list[i].draw();
    }
};

Pool.prototype.notify = function(){
    var subject = arguments[0][0][0];
    var entity = arguments[0][0][1];
    var damage = arguments[0][0][2];
    if (subject == "Hit"){
        entity.getDamage(damage);
    } else if (subject == "DestroyEntity"){
        console.log("Pool is removing entity");
        entity.destroy();
        pool.removeEntity(entity);
    }
};