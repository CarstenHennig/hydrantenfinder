const addressInput = document.getElementById('addressInput');
const searchButton = document.getElementById('searchButton');
const historyList = document.getElementById('historyList');
const mapDiv = document.getElementById('map');

let map;
let history = [];
let lat;
let lng;

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
    console.log("Address input value: ", address);
    // You would use a geocoding service API here to get latitude and longitude
    // For simplicity, let's assume you have the lat/lng already.
    // const lat = 51.500620; // Example latitude
    // const lng = 7.522520; // Example longitude

    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);

                // Now you can use lat and lng in your application
                console.log('Latitude:', lat);
                console.log('Longitude:', lng);
            } else {
                console.error('Geocoding API error: No results found');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });

    initMap([lat], [lng]);

    history.push(address);
    updateHistoryList();
});
