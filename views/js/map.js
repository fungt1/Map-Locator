mapboxgl.accessToken = '';
//Initalized function map before switching
function IniMap() {
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11',
        zoom: 9,
        center: [-73.935242, 40.730610]
    });

    async function getStores() {

        const res = await fetch('/api/v1/stores');
        const data = await res.json();

        const stores = data.data.map(store => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        store.location.coordinates[0],
                        store.location.coordinates[1]
                    ]
                },
                properties: {
                    placeId: store.placeId,
                    place: store.place,
                    description: store.description,
                    icon: store.marker
                }
            };
        });

        loadMap(stores);
    }
    // Load map with stores
    function loadMap(stores) {
        map.on('load', function () {
            map.addLayer({
                id: 'points',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: stores
                    }
                },
                layout: {
                    'icon-image': '{icon}-15',
                    'icon-size': 1.5,
                    'text-field': '{placeId}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.9],
                    'text-anchor': 'top'
                },

            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map.on('click', 'points', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var place = e.features[0].properties.place;
                var about = e.features[0].properties.description;


                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML('<h3>' + place + '</h3>' + '<p>' + about + '</p>')
                    .addTo(map);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map.on('mouseenter', 'points', function () {
                map.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map.on('mouseleave', 'points', function () {
                map.getCanvas().style.cursor = '';
            });

        });
    }
    getStores();
}
// When switch layer funciton activates, it will go through this "switchlayer" function
var layerList = document.getElementById('menu');
var inputs = layerList.getElementsByTagName('input');
function switchLayer(layer) {
    var layerId = layer.target.id;
    if (IniMap() == true) {
        map.remove();
    }
    const map1 = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/' + layerId,
        zoom: 9,
        center: [-73.935242, 40.730610]
    })

    async function getStores() {

        const res = await fetch('/api/v1/stores');
        const data = await res.json();

        const stores = data.data.map(store => {
            return {
                type: 'Feature',
                geometry: {
                    type: 'Point',
                    coordinates: [
                        store.location.coordinates[0],
                        store.location.coordinates[1]
                    ]
                },
                properties: {
                    placeId: store.placeId,
                    place: store.place,
                    description: store.description,
                    icon: store.marker
                }
            };
        });

        loadMap(stores);
    }
    // Load map with stores
    function loadMap(stores) {
        map1.on('load', function () {
            map1.addLayer({
                id: 'points',
                type: 'symbol',
                source: {
                    type: 'geojson',
                    data: {
                        type: 'FeatureCollection',
                        features: stores
                    }
                },
                layout: {
                    'icon-image': '{icon}-15',
                    'icon-size': 1.5,
                    'text-field': '{placeId}',
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.9],
                    'text-anchor': 'top'
                }

            });

            // When a click event occurs on a feature in the places layer, open a popup at the
            // location of the feature, with description HTML from its properties.
            map1.on('click', 'points', function (e) {
                var coordinates = e.features[0].geometry.coordinates.slice();
                var place = e.features[0].properties.place;
                var about = e.features[0].properties.description;

                // Ensure that if the map is zoomed out such that multiple
                // copies of the feature are visible, the popup appears
                // over the copy being pointed to.
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                new mapboxgl.Popup()
                    .setLngLat(coordinates)
                    .setHTML('<h3>' + place + '</h3>' + '<p>' + about + '</p>')
                    .addTo(map1);
            });

            // Change the cursor to a pointer when the mouse is over the places layer.
            map1.on('mouseenter', 'points', function () {
                map1.getCanvas().style.cursor = 'pointer';
            });

            // Change it back to a pointer when it leaves.
            map1.on('mouseleave', 'points', function () {
                map1.getCanvas().style.cursor = '';
            });

        });
    }
    getStores();
}


for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchLayer;
    IniMap();
}

