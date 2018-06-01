/**
 * Created by foil on 17/06/16.
 */
function CollisionDetector(){
    //this.pool = pool;
    this.keys = Object.keys(pool.list);
}
inheritance(Observer, CollisionDetector);

CollisionDetector.prototype.updateKeys = function(){
    this.keys = Object.keys(pool.list);
};

CollisionDetector.prototype.checkCollisions = function(pool){
    var i;
    this.updateKeys();

    for (i = 0; i < this.keys.length; i++){
        var j;
        for (j = i; j < this.keys.length; j++){

            var firstObject = pool.list[this.keys[i]], secondObject = pool.list[this.keys[j]];
            var result = false;
            if ((firstObject.shapeType == "Rectangle") && (secondObject.shapeType == "Rectangle")){
                result = this.checkRectangleXRectangleCollision(firstObject, secondObject);
                //console.log(result + " Rectangle and Rectangle");

            } else if (((firstObject.shapeType == "Rectangle") && (secondObject.shapeType == "Circle"))){
                result = this.checkCircleXRectangleCollision(secondObject, firstObject);

                if (result && firstObject instanceof Enemy && (secondObject.bulletType == "PlayerBullet")){
                    subjectHandler.notifyObservers("Hit", secondObject, 1);
                    subjectHandler.notifyObservers("Hit", firstObject, 1);
                    this.updateKeys();
                } else if (result && firstObject instanceof Player && (secondObject.bulletType == "EnemyBullet")){
                    //firstObject.incrementHitsCounter();
                    subjectHandler.notifyObservers("Hit", secondObject, 1);
                    subjectHandler.notifyObservers("Hit", firstObject, 1); //  Damage
                    this.updateKeys();
                }



            } else if (((firstObject.shapeType == "Circle") && (secondObject.shapeType == "Rectangle"))){
                result = this.checkCircleXRectangleCollision(firstObject, secondObject);
                //console.log(result + " Circle and Rectangle");

            } else if ((firstObject.shapeType == "Circle") && (secondObject.shapeType == "Circle")){
                result = this.checkCircleXCircleCollision(firstObject, secondObject);
                //console.log(result + " Circle and Circle");
            }
        }
    }
};

CollisionDetector.prototype.checkCollisionCase = function(firstObject, secondObject, keys){
    var result = false;
    if ((firstObject.shapeType == "Rectangle") && (secondObject.shapeType == "Rectangle")){
        result = this.checkRectangleXRectangleCollision(firstObject, secondObject);
        //console.log(result + " Rectangle and Rectangle");

    } else if (((firstObject.shapeType == "Rectangle") && (secondObject.shapeType == "Circle"))){
        result = this.checkCircleXRectangleCollision(secondObject, firstObject);
        //console.log(result + " Rectangle and Circle");
        if (result && firstObject instanceof Enemy){
            secondObject.destroy();
            firstObject.hits++;
            keys = Object.keys(pool.list);
            //console.log(pool.list);
            //break;
        }

    } else if (((firstObject.shapeType == "Circle") && (secondObject.shapeType == "Rectangle"))){
        result = this.checkCircleXRectangleCollision(firstObject, secondObject);
        //console.log(result + " Circle and Rectangle");

    } else if ((firstObject.shapeType == "Circle") && (secondObject.shapeType == "Circle")){
        result = this.checkCircleXCircleCollision(firstObject, secondObject);
        //console.log(result + " Circle and Circle");
    }
};

CollisionDetector.prototype.checkRectangleXRectangleCollision = function(firstRec, secondRec){
    var halfheight1 = firstRec.height/2, halfwidth1 = firstRec.width/2,
        halfheight2 = secondRec.height/2, halfwidth2 = secondRec.width/2;

    var centre1 = {x: firstRec.position.x + halfwidth1, y: firstRec.position.y + halfheight1},
        centre2 = {x: secondRec.position.x + halfwidth2, y: secondRec.position.y + halfheight2};

    var distance = calculateDistance(centre1, centre2);

    if ((distance < (halfheight1 + halfheight2)) && (distance < (halfwidth1 + halfwidth2))){
        return true;
    } else {
        return false;
    }
};

CollisionDetector.prototype.checkCircleXRectangleCollision = function(circle, rectangle){
    var halfheight = rectangle.height/2, halfwidth = rectangle.width/2;

    var halfdiagonal = (Math.sqrt(rectangle.width*rectangle.width + rectangle.height*rectangle.height))/2;
    var centre = {x: rectangle.position.x + halfwidth, y: rectangle.position.y + halfheight};
    var distance = calculateDistance(centre, circle.position);
    var distanceY = calculateDistance(circle.position, {x: circle.position.x, y: centre.y});
    var distanceX = calculateDistance(circle.position, {x: centre.x, y: circle.position.y});
    //console.log(distance);
    if ((circle.position.x > rectangle.position.x) && (circle.position.x < rectangle.position.x+rectangle.width)){
        if (distanceY < (circle.radius + halfheight)){
            return true;
        }
    } else if ((circle.y > rectangle.position.y) && (circle.y < rectangle.position.y+rectangle.height)){
        if (distanceX < (circle.radius + halfwidth)){
            return true;
        }
    } else {
        if ((circle.radius + halfdiagonal) > distance){
            return true;
        }
    }

    return false;
};

CollisionDetector.prototype.checkCircleXCircleCollision = function(firstCircle, secondCircle){
    var distance = calculateDistance(firstCircle.position, secondCircle.position);

    if ((firstCircle.radius+secondCircle.radius) > distance){
        return true;
    }

    return false;
};