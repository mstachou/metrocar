var Map = {};

(function(app){

  var _condition = 0;
  var _lat = 0;
  var _lng = 0;

  app["init"] = function(name){
    
  }

  app["set_condition"] = function (type) {
    console.log ("set_condition:" + type);   

  }

  app["update"] = function (lat, lng) {
    console.log ("update:"+lat+":"+lng);   
    
  }

})(Map);
