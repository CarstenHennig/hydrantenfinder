const addressInput = document.getElementById('addressInput');
const searchButton = document.getElementById('searchButton');
const historyList = document.getElementById('historyList');
const mapDiv = document.getElementById('map');

let map;
let searchHistory = [];

function initMap(lat, lng) {
    if (map) {
        map.remove();
    };

    map = L.map(mapDiv).setView([lat, lng], 15);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);
    L.marker([lat, lng]).addTo(map);
}

function updateHistoryList() {
    historyList.innerHTML = '';
    searchHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        historyList.appendChild(li);
    });
}

searchButton.addEventListener('click', () => {
    const address = addressInput.value;

    // Fetch latitude and longitude from geocoding API
    const apiUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=5`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                const lat = parseFloat(data[0].lat);
                const lng = parseFloat(data[0].lon);

                // Now you can use lat and lng in your application
                console.log('Latitude:', lat);
                console.log('Longitude:', lng);

                initMap(lat, lng);

                // Add search entry to history
                searchHistory.unshift(address);

                // Keep only the last 20 search entries
                if (searchHistory.length > 20) {
                    searchHistory.pop();
                }

                // Update history list
                updateHistoryList();
            } else {
                console.error('Geocoding API error: No results found');
                window.alert('Geocoding API error: No results found. Please try again!');
            }
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
});
