$(document).ready(function() {

	var mapa = L.map('mapa');

	mapa.setView([40.2838, -3.8215], 15);

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
		maxZoom:18		
	}).addTo(mapa);

	var geojsonFeature = {
	"type": "Feature",
	"properties": {
            "name": "Aulario III",
            "amenity": "Classrooms Building",
            "popupContent": "Most of the classes of ETSIT are taught here."
	},
	"geometry": {
            "type": "Point",
            "coordinates": [-3.8215, 40.2838]
	}
    };

	var nombrePopUp = function (feature, layer) {
		if (feature.properties && feature.properties.Name) {
			layer.bindPopup(feature.properties.Name);
		}
	}

	var mi_capa = L.geoJson().addTo(mapa);
	mi_capa.addData(geojsonFeature);

	$.getJSON("buildings-urjc.json", function(data) {
		capa_edificios = L.geoJson(data, {
			onEachFeature: nombrePopUp
		}).addTo(mapa);
	});

	var popup = L.popup();
	
	var mostrar_popup = function() {
		popup
				.setLatLng(e.latlng)
				.setContent("Coordenadas: " + e.latlng.toString())
				.openOn(mapa);
	}

	mapa.on('click',mostrar_popup);

})