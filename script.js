const addressInput = document.getElementById('addressInput');
const searchButton = document.getElementById('searchButton');
const historyList = document.getElementById('historyList');
const mapDiv = document.getElementById('map');

let map;
let history = [];

function initMap(lat, lng) {
    map = L.map(mapDiv).setView([51.505, -0.09], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    history.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

searchButton.addEventListener('click', () => {
    const address = addressInput.value;

    // You would use a geocoding service API here to get latitude and longitude
    // For simplicity, let's assume you have the lat/lng already.
    const lat = 51.505; // Example latitude
    const lng = -0.09; // Example longitude
    console.log("Coordinates are: ", lat, lng);
    initMap(53.57106, 9.96518);

    history.push(address);
    updateHistoryList();
});
