/**
 * Created by foil on 12/06/16.
 */

function inheritance(parent, child) {
    if ((typeof parent == 'function') & (typeof child == 'function')){
        //console.log('Both arguments are functions');
    } else {
        console.log('SHIT');
        return null;
    }

    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
    child.prototype.super = parent.prototype;
}

function calculateDistance(point1, point2){
    /*var difX = (point2.x - point1.x)*(point2.x - point1.x),
        difY = (point2.y - point1.y)*(point2.y - point1.y);*/
    var vector = calculateVector(point1, point2);


    return Math.sqrt(vector.x*vector.x + vector.y*vector.y);
}

function calculateVector(start, end){
    return {x: end.x - start.x, y: end.y - start.y};
}

function normalizeVector(vector){
    var magnitude = Math.sqrt(vector.x*vector.x + vector.y*vector.y);
    return {x: vector.x/magnitude, y: vector.y/magnitude};
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function checkApproximateEquation(value1, value2, range){
    var diff = Math.abs(value1 - value2);
    if (diff <= range){
        return true;
    } else {
        return false;
    }
}

var generateId = (function () {
    return (function () {
        var id = 0;
        return function(){
            return id++;
        }
    })();
})();

var keys = {
    'W': 87,
    'S': 83,
    'A': 65,
    'D': 68,
    'LEFT': 37,
    'RIGHT': 39,
    'SPACE' : 32
};

var keyDown = {};
var setKey = function (keyCode) {
    keyDown[keyCode] = true;
};

var clearKey = function (keyCode) {
    keyDown[keyCode] = false;
};

var isKeyDown = function (keyName) {
    return keyDown[keys[keyName]] == true;
};

window.onkeydown = function (e) {
    setKey(e.keyCode);
    //console.log(keyDown);
};

window.onkeyup = function (e) {
    clearKey(e.keyCode);
};