var di_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/District/MapServer";
var vd_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/VDC/MapServer";
var chk = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0";

require([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",

        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/Color",
    "dojo/on",
        "dojo/domReady!"
      ],
      function(
        Map, MapView,SceneView,
        FeatureLayer,
        SimpleRenderer, SimpleFillSymbol, SimpleLineSymbol, Color,
        on
      ) {

        // var featureLayer = new FeatureLayer({
        //   url: di_url,
          
        //   id: 'dis',
        //   opacity: 0.5,
        //   visible: false,
        //   layerId: 0,
        // });
        
        var featureLayer = new FeatureLayer({
          url: di_url,
          renderer: new SimpleRenderer({
            symbol: new SimpleFillSymbol({
              style: SimpleFillSymbol.STYLE_SOLID,
              color: new Color([0,128,0, 0.5]),
            })
          }),
          id: 'nam',
          opacity: 1,
          visible: true,
          layerId: 1,
        });

        var map = new Map({
          // basemap: "hybrid"
          layers: [
            featureLayer
            // featureLayer2
          ]
        });
        // map.add(featureLayer2);

        // featureLayer.renderer = 

        var view = new MapView ({
          container: "viewDiv",
          map: map,
        });

        /********************
         * Add feature layer
         ********************/

        featureLayer.then(function(){
          view.goto(featureLayer.fullExtent);
          // featureLayer2.labelsVisible = true;
          // featureLayer.visible = false;
        })

        view.on("layerview-create", function(event) {
          if (event.layer.id === "dis") {
            // Explore the properties of the housing layer's layer view here
            console.log("LayerView for district!", event.layerView);
          }
          if (event.layer.id === "nam") {
            // Explore the properties of the transportation layer's layer view here
            console.log("LayerView for name!", event.layerView);
          }
        });
      });