var di_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/District/MapServer";
var vd_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/VDC/MapServer";

require([
    "esri/Map",
    "esri/views/MapView",
    "esri/layers/MapImageLayer",
    "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "dojo/domReady!"
  ],
  function(
    Map, MapView, MapImageLayer, SimpleRenderer, SimpleFillSymbol, SimpleLineSymbol, Color
  ) {
    

    var permitsLyr = new MapImageLayer({
      url: "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/District/MapServer",

      sublayers: [
        {
          id: 1,
          visible: true,
        },
        {
          id: 0,
          visible: true,
        }
      ],

    });
    
    /*****************************************************************
     * Add the layer to a map
     *****************************************************************/
    var map = new Map({
      // basemap: "dark-gray",
      layers: [permitsLyr]
    });

    var view = new MapView({
      container: "viewDiv",
      map: map
    });

    permitsLyr.setRenderer(new SimpleRenderer(new SimpleLineSymbol(
                        SimpleLineSymbol.STYLE_SOLID,
                        new Color([0,128,0, 1]),3)));

    /*****************************************************************
     * Animate to the layer's full extent when the layer loads.
     *****************************************************************/
    permitsLyr.then(function() {
      view.goTo(permitsLyr.fullExtent);
      
    });


  });
