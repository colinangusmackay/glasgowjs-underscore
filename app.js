var startTime = new Date();
console.log("start of execution : "+startTime);

var _ = require("underscore");
var data = require("./election.json");

// Two ways of calling underscore
var regionNamesFunctional = _.map(data.regions, function (region){
    return region.name;
});
//console.log(regionNamesFunctional);

var regionNamesOO = _(data.regions).map(function(region){
    return region.name;
});
//console.log(regionNamesOO);


// From the data I want a list of constituencies
var flattened = _(data.regions).flatten();
//console.log(flattened);
// Doesn't work that way.

var flattenedConstituencies = _(data.regions).reduce(function(memo, region){
    return _.union(memo,region.constituencies);
},[]);
//console.log(flattenedConstituencies);

var sortedConstitunecies = _(flattenedConstituencies).sortBy("name");
//console.log(sortedConstitunecies);

var glasgowKelvin = _(flattenedConstituencies).find(function(item){
    return item.name==="Glasgow Kelvin"
});
//console.log(glasgowKelvin);

var glasgowRegion = _(data.regions).findWhere({name:"Glasgow"});
//console.log(glasgowRegion);


var combinedConstituencies = _(flattenedConstituencies).filter(function(item){
    return item.name.indexOf("&")>0;
});
//console.log(combinedConstituencies);

var glasgowKelvinWinner = _(glasgowKelvin.results).max(function(item){ return item.votes;});
//console.log(glasgowKelvinWinner);

function wait(milliseconds){
    var time = new Date();
    while(new Date() - time < milliseconds){}
}

function aLongRunningFunction(aNumber){
    var milliseconds = new Date().getMilliseconds();
    wait(1234);
    return aNumber + milliseconds+1000;
}
var addMilliseconds = _.memoize(aLongRunningFunction);
//console.log("1 = "+addMilliseconds(1) +" at "+new Date());
//console.log("2 = "+addMilliseconds(2) +" at "+new Date());
//console.log("3 = "+addMilliseconds(3) +" at "+new Date());
//console.log("1 = "+addMilliseconds(1) +" at "+new Date());
//console.log("2 = "+addMilliseconds(2) +" at "+new Date());
//console.log("3 = "+addMilliseconds(3) +" at "+new Date());
//console.log("1 = "+addMilliseconds(1) +" at "+new Date());
//console.log("2 = "+addMilliseconds(2) +" at "+new Date());
//console.log("3 = "+addMilliseconds(3) +" at "+new Date());

var throttledCounter=0, throttleCallsCounter=0;
var  throttledFunction = _.throttle(function(){
    console.log("throttledFunction called at "+new Date());
    throttledCounter += 1;
}, 2000);

//while (throttledCounter < 3){
//    throttledFunction();
//    throttleCallsCounter += 1;
//};
//console.log("Total calls to throttledFunction = "+throttleCallsCounter);


var canBeCalledOnlyOnce = _.once(function(){
    return new Date();
});

//console.log("Once called at "+canBeCalledOnlyOnce());
//wait(2000);
//console.log("Once called at "+canBeCalledOnlyOnce());
//wait(2000);
//console.log("Once called at "+canBeCalledOnlyOnce());


console.log("End of execution : "+new Date());