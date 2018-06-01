/**
 * Created by foil on 22/06/16.
 */
// TODO: Should be singletone!
function SubjectHandler(){
    this.subjectList = {};
}

SubjectHandler.prototype.addSubject = function(subject){
    this.subjectList[subject.name] = subject;
    console.log("Adding " + subject.name + " to subjectList");
};

SubjectHandler.prototype.registerObserver = function(subjectName, observer){
    this.subjectList[subjectName].registerObserver(observer);
};

SubjectHandler.prototype.notifyObservers = function(){
    var subjectName = arguments[0];
    //console.log(this.subjectList);

    this.subjectList[subjectName].notifyObservers(arguments);
};

