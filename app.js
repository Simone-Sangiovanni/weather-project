require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser'); //middleware che parsa richieste in arrivo
const axios = require('axios'); // esegue http request

const {searchCity, getLocation} = require('./utils/dbInteraction.js');

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs"); //setta il view engine
app.use(express.static('public')); //dice dove trovare i file
app.use(bodyParser.urlencoded({ extended: true })); //usato per parsare i dati durante la POST



// Routing
//GET
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/city/:cityName/:cityID', (req, res) => {
    let cityName = req.params.cityName;
    let position = getLocation(req.params.cityID);
    let currentWeatherData = {};
    let forecastDay = [];
    let url = `${process.env.API_BASE_URL}key=${process.env.API_KEY}&q=${position.latitude},${position.longitude}&days=3`;
    
    axios.get(url).then(response => {
        let newTime;
        currentWeatherData = response.data;
        forecastDay = response.data.forecast.forecastday;

        //rende più leggibile l'orario
        forecastDay.forEach(element => {
            for (let i = 0; i < 24; i++) {
                newTime = element.hour[i].time.split(" "); 
                element.hour[i].time = newTime[1];                
            }
        });
    }).then(() => {
        res.render('city', { 
            title: 'City', 
            cityName: cityName,
            currentWeather: currentWeatherData,
            forecastDay: forecastDay,
            forecastDayLength: forecastDay.length
        });
    }).catch(err => {
        console.log(err);
        res.redirect('/errorPage/2');
    })
});

/**
 * errorID = 0 -> page not found
 * errorID = 1 -> city not found
 * errorID = 2 -> error getting data from API
 * */
app.get('/errorPage/:errorID', (req,res) => {
    let errorID = req.params.errorID;
    let error;

    switch(errorID) {
        case '0':
            error = "The page you are looking for does not exist";
            break;
        case '1':
            error = "Error: city not found";
            break;
        case '2':
            error = "Error: something went wrong while retriving data";
            break;
    }

    res.render('errorPage', {
        title: 'Error', 
        error: error
    });
});

app.get('*', (req,res) => {
    res.redirect('errorPage/0');
});

//POST
app.post('/', (req, res) => {
    let location = searchCity(req.body.city);
    if (location.length == 1) {
        res.redirect(`/city/${location[0].name}/${location[0].id}`);
    } else { 
        if (location.length == 0) {
            res.redirect('/errorPage/1');  
        } else {
            res.render('cityList', {
                title: "City List", 
                content: location, 
                length: location.length, 
                cityName: location[0].name
            });
        }
    }   
});

app.post('/cityList/:cityName', (req,res) =>{
    res.redirect(`/city/${req.params.cityName}/${req.body.cityId}`);
});



// il server viene messo in ascolto sulla porta specificata
app.listen(port, () => {
    console.log(`server listening on port ${port}...`);
});