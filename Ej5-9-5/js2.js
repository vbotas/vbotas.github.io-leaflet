




var buscar = function() {
	var entrada = document.getElementById('direccion');

	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' +
		entrada.value, function(data) {
			var elementos = [];

			$.each(data, function(key, val) {
				elementos.push("<li><a href='#' onclick='elijeDireccion(" + val.lat + ", " + val .lon + ", \"" + val.type + "\"); return false; '>" + val.display_name + '</a></li>');
			});

			$('#resultados').empty();

			if(elementos.length != 0) {
				$('<p>', {html: 'Resultados Encontrados: '}).appendTo('#resultados');
				$('<ul>', {'class': 'mi-nueva-lista', html: elementos.join('')}).appendTo('#resultados');
			} else {
				$('<p>', {html: 'No se encontraron resultados'}).appendTo('#resultados');
			}
			$('<p>', {hmtl: '<button type=button" id="cerrar">Cerrar</button>'}).appendTo('#resultados');
			$('#cerrar').click(borrarResultados);
		});

};

var borrarResultados = function () {
	$('#resultados').empty();
};

var elijeDireccion = function (lat, lng, type) {
	var localizacion = new L.LatLng(lat, lng);
	mapa.panTo(localizacion);

}


$(document).ready(function () {

	$('#buscar button').click(buscar);

	var mapa = L.map('mapa');
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">Cloudmade</a>'}).addTo(mapa);

	var mostrar_popup = function (e) {
		L.popup.setLatLng(e.latlng);
		L.popup.setContent('Coordenadas: ' + e.latlng.toString());
		L.popup.openOn(mapa);		
	}
	mapa.on('click',mostrar_popup);

	var localizacion_encontrada = function(e) {
		var radio = e.accuracy;
		L.marker(e.latlng).addTo(mapa)
				.bindPopup('Estás a: ' + radio + ' metros de: ' + e.latlng.toString())
			.openPopup();
		L.circle(e.latlng, radio).addTo(mapa);	
	}
	mapa.on('click',localizacion_encontrada);

	var error_localizacion = function(e) {
		alert(e.message);
	}
	mapa.on('click',error_localizacion);

	mapa.locate({setView: true, maxZoom: 15});
});