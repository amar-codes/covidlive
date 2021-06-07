$.ajax({
    url: 'https://api.covid19api.com/summary',
    dataType: 'json',
    success: function(data) {
        document.getElementById("world-infected").innerHTML = data.Global.TotalConfirmed;
        document.getElementById("world-death").innerHTML = data.Global.TotalDeaths;
        document.getElementById("world-recovered").innerHTML = data.Global.TotalRecovered;
    }
});

$.ajax({
    url: 'https://api.covid19api.com/summary',
    dataType: 'json',
    success: function(data) {
        var total_confirmed = data.Countries[21].TotalConfirmed;
        var total_deaths = data.Countries[21].TotalDeaths;
        var total_recovered = data.Countries[21].TotalRecovered;
        document.getElementById("bih-infected").innerHTML = total_confirmed;
        document.getElementById("bih-deaths").innerHTML = total_deaths;
        document.getElementById("bih-recovered").innerHTML = total_recovered;

        var mymap = L.map('mapid').setView([43.915886, 17.679076], 7);

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Amar Garčević author of CovidLive' ,
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(mymap);

        L.marker([43.915886, 17.679076]).addTo(mymap)
            .bindPopup("<center><img src='img/zastava-bih.jpg' width='200'> <br> " + "Bosna i Hercegovina <br>" + "Broj zaraženih: " + total_confirmed + "<br>Broj umrlih: " + total_deaths + "<br>Broj oporavljenih: " + total_recovered + "</center>").openPopup();

        L.circle([43.915886, 17.679076], 100000, {
            color: 'red',
            fillColor: '#f03',
            fillOpacity: 0.5
        }).addTo(mymap).bindPopup("");

        L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(mymap).bindPopup("");


        var popup = L.popup();

        function onMapClick(e) {
            popup
                .setLatLng(e.latlng)
                .setContent("Pritisnuli ste na karti: " + e.latlng.toString())
                .openOn(mymap);
        }

        mymap.on('click', onMapClick);
    }
});
