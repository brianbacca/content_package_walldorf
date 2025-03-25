sap.ui.define([], function () {
    "use strict";

    const MapaCABA = {
        crearMapa: function (that, dataCABAGeoJSON) {
            const contenedorMapa = that.getView().byId("mapaCABA").getDomRef();
            if (!contenedorMapa) {
                console.error("No se encontró el div para renderizar el mapa");
                return;
            }

            const mapa = L.map(contenedorMapa, {
                center: [-34.65, -58.38], // Centro entre Boedo y Barracas
                zoom: 12,                      // Zoom cercano a la zona
                minZoom: 10,                   // Zoom mínimo permitido
                maxZoom: 16,                   // Zoom máximo permitido
                zoomAnimation: true,
                scrollWheelZoom: true,
            });

            L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=mo0BnWur6ehwpK7aex1X', {
                attribution: '&copy; <a href="https://www.maptiler.com/">MapTiler</a>',
                tileSize: 512,
                zoomOffset: -1
            }).addTo(mapa);

            var rootPath = jQuery.sap.getModulePath("wall.CardMapa");
            L.Control.Watermark = L.Control.extend({
                onAdd: function (mapa) {
                    var img = L.DomUtil.create('img');
                    img.src = rootPath + "/images/logoSofttek.png";
                    img.style.width = '200px';
                    return img;
                },
                onRemove: function (mapa) {}
            });
            L.control.watermark = function (opts) {
                return new L.Control.Watermark(opts);
            };
            L.control.watermark().addTo(mapa);

            // Función para asignar un color según la cantidad de hogares sin luz
            function getColor(hogares) {
                if (hogares > 300) return "#FF0000"; // Rojo
                if (hogares > 100) return "#FFA500"; // Naranja
                if (hogares > 50) return "#FFFF00"; // Amarillo
                return "#00FF00"; // Verde (0-50)
            }

            function highlightFeature(e) {
                var layer = e.target;
                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });
                layer.bringToFront();
                info.update(layer.feature.properties);
            }

            function resetHighlight(e) {
                geojsonLayer.resetStyle(e.target);
                info.update();
            }

            function zoomToFeature(e) {
                mapa.fitBounds(e.target.getBounds());
            }

            function onEachFeature(feature, layer) {
                layer.on({
                    mouseover: highlightFeature,
                    mouseout: resetHighlight,
                    click: zoomToFeature
                });

                if (feature.properties) {
                    layer.bindPopup(
                        "<b>Barrio:</b> " + feature.properties.nombre + "<br>" +
                        "<b>Hogares sin luz afectados:</b> " + feature.properties.hogares_sin_luz
                    );
                }
            }

            let totalBarrios = dataCABAGeoJSON.features.length;
            let apagónTotalIndex = Math.floor(Math.random() * totalBarrios); // Barrio con apagón total
            
            dataCABAGeoJSON.features.forEach((feature, index) => {
                if (index === apagónTotalIndex) {
                    // Un solo barrio con apagón total
                    feature.properties.hogares_sin_luz = 300;
                } else {
                    const random = Math.random(); // Número entre 0 y 1
            
                    if (random < 0.80) {
                        feature.properties.hogares_sin_luz = Math.floor(Math.random() * 10); // 0 a 10 (80% de probabilidad)
                    } else if (random < 0.95) {
                        feature.properties.hogares_sin_luz = Math.floor(Math.random() * 90) + 10; // 11 a 100 (15% de probabilidad)
                    } else {
                        feature.properties.hogares_sin_luz = Math.floor(Math.random() * 200) + 100; // 101 a 300 (4% de probabilidad)
                    }
                }
            });

            var geojsonLayer = L.geoJSON(dataCABAGeoJSON, {
                style: function (feature) {
                    return {
                        color: getColor(feature.properties.hogares_sin_luz),
                        weight: 2,
                        opacity: 0.7,
                        dashArray: "3",
                        fillOpacity: 0.5
                    };
                },
                onEachFeature: onEachFeature
            }).addTo(mapa);

            var info = L.control();

            info.onAdd = function (mapa) {
                this._div = L.DomUtil.create('div', 'info'); // Crear un div con clase "info"
                this.update();
                return this._div;
            };
            
            // Método para actualizar la información al pasar el mouse
            info.update = function (props) {
                this._div.innerHTML = '<h4>Hogares sin luz</h4>' +  
                    (props ?  
                        '<b>' + props.nombre + '</b><br />' +  
                        props.hogares_sin_luz + ' hogares afectados'  
                        : 'Pasa el mouse sobre un barrio');
            };
            
            // Agregar el control al mapa
            info.addTo(mapa);

            var legend = L.control({ position: 'bottomright' });
            legend.onAdd = function (mapa) {
                var div = L.DomUtil.create('div', 'info legend'),
                    labels = [
                        { color: "#00FF00", text: "0 - 50" },
                        { color: "#FFFF00", text: "51 - 100" },
                        { color: "#FFA500", text: "101 - 300" },
                        { color: "#FF0000", text: "Más de 300" }
                    ];

                labels.forEach(item => {
                    div.innerHTML +=
                        '<div style="display: flex; align-items: center; gap: 5px;">' +
                        '<i style="width: 15px; height: 15px; background:' + item.color + '; display: inline-block;"></i> ' +
                        item.text +
                        '</div>';
                });

                return div;
            };
            legend.addTo(mapa);

            L.control.scale({
                metric: true,
                imperial: false,
                position: 'bottomleft'
            }).addTo(mapa);
        }
    };

    return MapaCABA;
});