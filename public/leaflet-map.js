const map = L.map("map").setView([3.950242670857808, 108.11405222751152], 5);
const tileUrl = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, {
    minZoom: 5,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
});
tiles.addTo(map);

// for locations, try DB pulls from locationDB.nedb

let layerGroup = L.layerGroup().addTo(map);

function clickPutra(){
    layerGroup.clearLayers();
    map.closePopup();
    marker = L.marker([2.9372, 101.7042]).addTo(layerGroup); // auto added to map by layergroup
    marker.bindPopup("Agensi Pengurusan Bencana Negara (NADMA)").openPopup();
    map.setView([2.9372, 101.7042],10);
}

function clickPerak(){
    layerGroup.clearLayers();
    map.closePopup();
    marker = L.marker([3.9170, 100.7488]).addTo(layerGroup); // auto added to map by layergroup
    marker.bindPopup("SK Sungai Tiang Darat").openPopup();
    map.setView([3.9170, 100.7488],10);
}

function clickKtan(){
    layerGroup.clearLayers();
    map.closePopup();
    marker = L.marker([5.7010, 101.8441]).addTo(layerGroup); // auto added to map by layergroup
    marker.bindPopup("Jeli District Health Office").openPopup();
    map.setView([5.7010, 101.8441],10);
}

// ids end with -flush
document.getElementById("putra-flush").onclick = function(){clickPutra();}
document.getElementById("perak-flush").onclick = function(){clickPerak();}
document.getElementById("ktan-flush").onclick = function(){clickKtan();}

// always updating time
function theTime(){
    const date = new Date();
    let today = date.toLocaleDateString("en-MY");
    document.getElementById("dayAndTime").textContent = today;
}
theTime();
setInterval(theTime, 60000);

// <span id="dayAndTime"></span> <- for displaying the time/date