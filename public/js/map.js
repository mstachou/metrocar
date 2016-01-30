var Map = {};

(function(app){

  var datas = [
    "",
    "http://cyberjapandata.gsi.go.jp/xyz/gazo4/$z/$x/$y.jpg"
  ];

  var map_types = [
    google.maps.MapTypeId.SATELLITE,
    "OldMaps"
  ];

  var _condition = 0;
  var _lat = 35.693643;
  var _lng = 139.744404;
  var _zoom = 17;
  var _map = null;

  function init_map ($map) {

    var opts = {
      zoom: _zoom,
      mapTypeId: "OldMaps",
      center: new google.maps.LatLng(_lat, _lng)
    };

    var map = new google.maps.Map($map.get(0), opts);
    map.setOptions({ mapTypeControl: false });

    var w = 256;
    var h = 256;

    // 地理院タイルを Overlay する
    map.mapTypes.set("OldMaps", {
      name:"地理院地図",
      tileSize: new google.maps.Size(w, h),
      minZoom:_zoom - 2,
      maxZoom:_zoom, 
      getTile:function(tileCoord, zoom, ownerDocument) {

        var img = ownerDocument.createElement("img");
        img.style.width = w + "px";
        img.style.height = h + "px";

        var x = (tileCoord.x % Math.pow(2, zoom)).toString();
        var y = tileCoord.y.toString();

        img.src = generate_url ("http://cyberjapandata.gsi.go.jp/xyz/gazo4/$zoom/$x/$y.jpg", zoom, x, y);
        return img;
      }
    });

    _map = map;
  }

  function generate_url (url, zoom, x, y) {
    url = url.replace ("$zoom", zoom);
    url = url.replace ("$x", x);
    url = url.replace ("$y", y);
    return url;
  }

  app["init"] = function(name){
    console.log ("init:" + name);   

    var $m = $(name);

    init_map ($m);

  }
  app["set_condition"] = function (type) {
    console.log ("set_condition:" + type);   

    type %= map_types.length;

    var id = map_types[type];

    _map.setMapTypeId (id);

  }
  app["update"] = function (lat, lng) {
    console.log ("update:" + lat + ":" + lng);   

    _map.panTo(new google.maps.LatLng(lat, lng));     
  }

})(Map);
