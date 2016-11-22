$(document).ready(function() {
	//Inicializar el mapa
	var mapa = L.map('mapa').fitWorld();

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(mapa);
	//Geolocalización
	mapa.locate({setView: true, maxZoom:16});

	function localizacion_encontrada (e) {
		var radio = e.accuracy;
		L.marker(e.latlng).addTo(mapa)
			.bindPopup('Estás a ' + radio + ' metros de esta localización')
			.openPopup();

		L.circle(e.latlng, radio).addTo(mapa);
	}
	function error_localizacion (e) {
		e.message('Error en la localización');
	}
	mapa.on('locationfound',localizacion_encontrada);
	mapa.on('locationerror',error_localizacion);
});