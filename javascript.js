mapboxgl.accessToken = 'pk.eyJ1Ijoiam9zZWJlbmF2aWRlcyIsImEiOiJjbDRicTZiZjQxb2c4M2ttd2Q4ZnVtcTY1In0.nVr_HQOMWaqnfkiTKNu5pA';
const miMapa = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/satellite-v9',
    center: [-84, 10],
    zoom: 10
    
});

miMapa.addControl(new mapboxgl.NavigationControl());
miMapa.addControl(new mapboxgl.FullscreenControl());
miMapa.addControl(new mapboxgl.ScaleControl({
    maxWidth: 80,
    unit: 'metric'
}));

miMapa.addControl(new MapboxGeocoder({
    accessToken: mapboxgl.accessToken
}), 'top-left');

const cuadroCoords = document.querySelector('#cuadro-coordenadas')

miMapa.on('mousemove', function(e) {
    cuadroCoords.innerHTML = 'Lon'+ e.lngLat.lng + ',Lat' + e.lngLat.lat;
});

miMapa.on('style.load', function() {
    miMapa.addSource('capaCurvas', {
        type: 'vector',
        url: 'mapbox//mapbox.mapbox-terrain-v2'
    });
    miMapa.addLayer({
        'id': 'curvasnivel',
        'type': 'line',
        'source': 'capaCurvas',
        'source-layer': 'contour',
        'paint': {
            'line-color': '#fec44f',
            'line-width' : 2
        }
    })
});

const menu = document.querySelector('#control-capas')

function abrirMenu(){
    menu.style.display = 'inherit';
}

function cerrarMenu(){
    menu.style.display = 'none';
}

function cambiarCapaBase(valor){
    miMapa.setStyle('mapbox://styles/mapbox/'+ valor);
}

function cambiarCapaOverlay(valor){
    if (valor == true) {
        miMapa.setLayoutProperty('curvasnivel', 'visibility', 'visible');
    } else if (valor == false) {
        miMapa.setLayoutProperty('curvasnivel', 'visibility', 'none');
    }
}
