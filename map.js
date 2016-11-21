var di_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/District/MapServer";
var vd_url = "http://apps.geoportal.icimod.org/ArcGIS/rest/services/Nepal/VDC/MapServer";
var chk = "https://services.arcgis.com/V6ZHFr6zdgNZuVG0/ArcGIS/rest/services/NYCDemographics1/FeatureServer/0";

require([
        "esri/Map",
        "esri/views/MapView",
        "esri/views/SceneView",

        "esri/layers/FeatureLayer",
        "esri/renderers/SimpleRenderer",
        "esri/renderers/UniqueValueRenderer",
    "esri/symbols/SimpleFillSymbol",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/TextSymbol",
    "esri/Color",
    "dojo/on",
        "dojo/domReady!"
      ],
      function(
        Map, MapView,SceneView,
        FeatureLayer,
        SimpleRenderer, UniqueValueRenderer, 
        SimpleFillSymbol, SimpleLineSymbol,
        TextSymbol, Color,
        on
      ) {

        // var featureLayer = new FeatureLayer({
        //   url: di_url,
          
        //   id: 'dis',
        //   opacity: 0.5,
        //   visible: false,
        //   layerId: 0,
        // });
        
        // var renderer = new SimpleRenderer({
        //   symbol: new SimpleFillSymbol({
        //     style: SimpleFillSymbol.STYLE_SOLID,
        //     color: new Color([0,128,0, 0.5]),
        //     outline: new SimpleLineSymbol({
        //       style: SimpleLineSymbol.STYLE_SOLID,
        //       color: new Color([128,0,0,1]),
        //       width: 2
        //     }),
        //   }),
        // });
        var textSymbol = new TextSymbol({
          color: "white",
          haloColor: "black",
          haloSize: "1px",
          text: "You are here",
          xoffset: 3,
          yoffset: 3,
          font: {  // autocast as esri/symbols/Font
            size: 12,
            family: "sans-serif",
            weight: "bolder"
          }
        });

        var renderer = new UniqueValueRenderer({
          field: "DIST_CODE",
          defaultSymbol: new SimpleFillSymbol({
            style: SimpleFillSymbol.STYLE_SOLID,
            color: new Color([0,128,0, 0.5]),
            outline: new SimpleLineSymbol({
              style: SimpleLineSymbol.STYLE_SOLID,
              color: new Color([128,0,0,1]),
              width: 2
            }),
          }),
        });

        renderer.addUniqueValueInfo("45",
          new SimpleFillSymbol({
            color: "blue"
          })
        );

        renderer.addUniqueValueInfo("01",
          new SimpleFillSymbol({
            color: "red"
          })
        );

        var featureLayer = new FeatureLayer({
          url: di_url,
          renderer: renderer,
          // labelsVisible: true,
          // labelingInfo: [{
          //   labelExpression: "[DIST_NAME]",
          //   labelPlacement: "always-horizontal",
          //   symbol: new TextSymbol({
          //     color: [255, 255, 255, 0.7],
          //     // haloColor: [0, 0, 0, 0.7],
          //     // haloSize: 1,
          //     font: {
          //       size: 11
          //     }
          //   }),
          //   minScale: 9250000,
          //   maxScale: 2400000
          // }],
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