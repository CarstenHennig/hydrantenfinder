const addressInput = document.getElementById('addressInput');
const searchButton = document.getElementById('searchButton');
const historyList = document.getElementById('historyList');
const mapDiv = document.getElementById('map');

let map;
let history = [];

function initMap(lat, lng) {
    map = L.map(mapDiv).setView([lat, lng], 15);
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
    console.log("searchButton was clicked");
    const address = addressInput.value;

    // You would use a geocoding service API here to get latitude and longitude
    // For simplicity, let's assume you have the lat/lng already.
    const lat = 51.500620; // Example latitude
    const lng = 7.522520; // Example longitude

    initMap(lat, lng);

    history.push(address);
    updateHistoryList();
});
