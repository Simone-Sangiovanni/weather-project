const fs = require('fs');
const { City } = require('./City.js');

function searchCity(city) {
    let location = [];
    let file = fs.readFileSync('./cities.json', 'utf8'); // legge il file json che contiene le città
    let data = JSON.parse(file); // parsa il file in un array di oggetti javascript
    // parsa l'array "data" e se trova una corrisppondenza con la città cercata la aggiunge all'array
    data.forEach(element => {
        if (element.city.toLowerCase() == city.toLowerCase()) {
            location.push(new City(
                element.city,
                element.country,
                element.region,
                element.id
            ));
        }
    });
    return location;
};

function getLocation(cityID) {
    let file = fs.readFileSync('./cities.json', 'utf8');
    let data = JSON.parse(file);
    let lat;
    let lon;
    data.forEach(element => {
        if (element.id == cityID) {
            lat = element.lat;
            lon = element.lng;
        }
    });
    return { latitude: lat, longitude: lon };
};

module.exports = {
    searchCity,
    getLocation
};