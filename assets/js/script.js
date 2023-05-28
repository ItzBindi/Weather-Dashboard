var qInput = document.getElementById('q');
var currentWeather = document.getElementById('current-weather');
var fiveDayWeather = document.getElementById('five-day');
var searchForm = document.getElementById('search-form');
var searchedEl = document.getElementById('searched');
var resultsContainer = document.getElementById('results')
var currentCity = document.getElementById('city')
var currentCityWeather = document.getElementById('cityweather')
var forecastcity = document.getElementById('5daycurrentcity')


var handleSearch = function(event) {
    event.preventDefault();

    var userInput = qInput.value;
    console.log(userInput);

    var firstAPIURL = 'http://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=1&appid=c055c2d07b3173d39c878322108c0189'
    
    
    fetch(firstAPIURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            var lat = data[0].lat
            var lon = data[0].lon
            console.log(lat, lon);

            var secondAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c055c2d07b3173d39c878322108c0189&units=imperial'
            // console.log(secondAPIURL, 'working');

            fetch(secondAPIURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(weatherData) {
                    // console.log(weatherData);
                    console.log('Temp' + ' ' + weatherData.main.temp + '°F','Humidity' + ' ' + weatherData.main.humidity + ' ' + '%','Wind' + ' ' + weatherData.wind.speed + ' ' +'MPH', weatherData.name);
                


                var temperature = weatherData.main.temp;
                var humidity = weatherData.main.humidity;
                var wind = weatherData.wind.speed;
                var city = weatherData.name;
                console.log(temperature, humidity, wind, city);

                currentCity.textContent = city
                currentCityWeather.textContent ='Temp: ' + temperature + '°F' + '   ' + 'Wind: ' + wind + 'MPH' + '  ' + 'Humidity: ' + humidity + '%' 
                searchedEl.textContent = city
                forecastcity.textContent = city
            })



            var thirdAPIURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=c055c2d07b3173d39c878322108c0189&units=imperial'

            // console.log(thirdAPIURL,'5day');

            fetch(thirdAPIURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(forecastData) {
                    // console.log(forecastData);
                    
                    for (let i = 0; i < 5; i++) {
                        var list = forecastData.list[i];
                        // console.log(list, '5 days ');
                        console.log('Date' + ' ' + list.dt_txt,'Wind' + ' ' + list.wind.speed + ' ' + 'MPH','Humidity' + ' ' + list.main.humidity + ' ' + '%','Temp' + ' ' + list.main.temp + '°F');
                    }

                })
        })
}

searchForm.addEventListener('submit', handleSearch);






