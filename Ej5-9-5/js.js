function busqueda () {
	var entrada = document.getElementById('direccion');

	$.getJSON('http://nominatim.openstreetmap.org/search?format=json&limit=5&q=' + entrada.value, function (data) {
		var elementos = [];

	$.each(data, function (key,val) {
		elementos.push(
		"<li><a href='#' onclick='elijeDireccion(" +
		    val.lat + ", " + val.lon + ", \"" + val.type + "\");return false;'>" + val.display_name +
		    '</a></li>'
	    );
	});

	$('#resultados').empty();

	if(elementos.length != 0) {
		$('<p>', {html: 'Resultados buscados: '}).appendTo('#resultados');
		$('<ul>', {
			'class': 'mi-nueva-lista',
			html: elementos.join('')
		}).appendTo('#resultados');
	} else {
		$('<p>', {html: 'No se encontraron resultados'}).appendTo('#resultados');
	}
	$('<p>', {html: '<button id="close" type="button">Cerrar</button>'}).appendTo('#resultados');
	$('#close').click(borrarResultados);
	});
}

function borrarResultados () {
	$('#resultados').empty();
}

function elijeDireccion (lat, lng, type) {
	var localizacion = new L.LatLng(lat, lng);
	mapa.panTo(localizacion);
}

$(document).ready(function() {
	$('#buscar button').click(busqueda);

	mapa = L.map('mapa');

	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
    }).addTo(mapa);

    var popup = L.popup();

    function showPopUp(e) {
    	popup
    		.setLatLng(e.latlng)
    		.setContent('Coordenadas: ' + e.latlng.toString())
    		.openOn(mapa);
    }

    mapa.on('click', showPopUp);

    function localizacion_encontrada(e) {
    	var radio = e.accuracy;
    	L.marker(e.latlng).addTo(mapa)
    			.bindPopup('Estás a: ' + radio + ' metros de este punto<br />' + 
    				'Coordenadas: ' + e.latlng.toString())
    		.openPopup();
    	L.circle(e.latlng, radio).addTo(mapa);
    }

    mapa.on('locationfound', localizacion_encontrada);

    function error_localizacion(e) {
    	alert(e.message);
    }

    mapa.on('locationerror', error_localizacion);
    mapa.locate({setView: true, maxZoom:16});
});