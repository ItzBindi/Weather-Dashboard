var qInput = document.getElementById('q');
var currentWeather = document.getElementById('current-weather');
var fiveDayWeather = document.getElementById('five-day');
var searchForm = document.getElementById('search-form');
var searchedEl = document.getElementById('searched');
var resultsContainer = document.getElementById('results')
var currentCity = document.getElementById('city')
var currentCityWeather = document.getElementById('cityweather')
var forecastcity = document.getElementById('5daycurrentcity')
var forecastCards = document.querySelectorAll('#five-day .card');
var pastSearches = localStorage.getItem('history')
var emptyArray = []
emptyArray.push(pastSearches);
console.log(emptyArray);

var handleSearch = function(event) {
    event.preventDefault();
    

    var userInput = qInput.value.toLowerCase();
    // console.log(userInput);
    console.log(pastSearches);
    if (emptyArray.includes(userInput) === false) {
        emptyArray.push(userInput);
        localStorage.setItem('history', emptyArray);

    }
   

    

    var firstAPIURL = 'https://api.openweathermap.org/geo/1.0/direct?q=' + userInput + '&limit=1&appid=c055c2d07b3173d39c878322108c0189'
    
    
    fetch(firstAPIURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            // console.log(data);
            var lat = data[0].lat
            var lon = data[0].lon
            // console.log(lat, lon);

            var secondAPIURL = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&appid=c055c2d07b3173d39c878322108c0189&units=imperial'
            // console.log(secondAPIURL, 'working');
            

            fetch(secondAPIURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(weatherData) {
                    console.log(weatherData, 'working');
                    // console.log('Temp' + ' ' + weatherData.main.temp + '°F','Humidity' + ' ' + weatherData.main.humidity + ' ' + '%','Wind' + ' ' + weatherData.wind.speed + ' ' +'MPH', weatherData.name);
                
                
                var temperature = weatherData.main.temp;
                var humidity = weatherData.main.humidity;
                var wind = weatherData.wind.speed;
                var city = weatherData.name;
                var currentIcon = weatherData.weather[0].icon
                console.log(currentIcon);
                var iconURL = 'https://openweathermap.org/img/wn/' + currentIcon + '.png'
                var weatherIcon = document.getElementById('weather-icon');
                weatherIcon.setAttribute("src", iconURL);
                console.log(iconURL)
                currentCity.innerHTML = ''
                // currentCity.append(weatherIcon);

                // console.log(temperature, humidity, wind, city);
                currentCity.textContent = city + ' ' + dayjs().format('(M/D/YYYY)')
                currentCityWeather.textContent ='Temp: ' + temperature + '°F' + '   ' + 'Wind: ' + wind + 'MPH' + '  ' + 'Humidity: ' + humidity + '%' 
                searchedEl.textContent = city
                forecastcity.textContent = city
                
                // console.log(dayjs().format('M,D,YYYY'), 'working');
            })



            var thirdAPIURL = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + lon + '&appid=c055c2d07b3173d39c878322108c0189&units=imperial'

            // console.log(thirdAPIURL,'5day');

            fetch(thirdAPIURL)
            .then(function(response) {
                return response.json();
            })
            .then(function(forecastData) {
                for (let i = 0; i < 5; i++) {
                   var card = forecastCards[i];
                    var forecast = forecastData.list[i * 8];
                    console.log(forecastData.list);

                    // console.log(forecastData, 'hello');

                    var title = card.querySelector('.card-title');
                    var subtitle = card.querySelector('.card-subtitle');
                    var text = card.querySelector('.card-text');
                    


                    title.textContent = 'Date: ' + forecast.dt_txt.slice(5, 10);
                    subtitle.textContent = 'Temp: ' + forecast.main.temp + '°F';
                    text.textContent = 'Humidity: ' + forecast.main.humidity + '%' + ' ' + 'Wind: ' + forecast.wind.speed + 'MPH';
                    // console.log(forecast.dt_txt, "wokring");

                }
            });
    });
};

searchForm.addEventListener('submit', handleSearch);






