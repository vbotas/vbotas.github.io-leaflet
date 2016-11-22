$(document).ready(function() {
	var mapa = L.map('mapa', {
		center: [40.2838, -3.8215],
		zoom :16
	});
	
	L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://cloudmade.com">CloudMade</a>',
maxZoom: 18
}).addTo(mapa);
	L.control.scale().addTo(mapa);
	L.marker([40.2838,-3.8215]).addTo(mapa)
	        .bindPopup('Aulario III. Universidad Rey Juan Carlos (Campus Funelabrada).')
	        .openPopup();

mapa.on('click', function(e) {
    //alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
    var latitud_click = e.latlng.lat;
    var longitud_click = e.latlng.lng;
    //console.log(latitud_click);
    //console.log(longitud_click);
    L.marker([latitud_click,longitud_click]).addTo(mapa)
			.bindPopup('Latitud: ' + latitud_click + ', Longitud: ' + longitud_click)
	        .openPopup();
});

});