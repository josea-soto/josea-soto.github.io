const weatherURL = "https://api.openweathermap.org/data/2.5/weather?id=5604473&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial"
const forecastURL = "https://api.openweathermap.org/data/2.5/forecast?id=5604473&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial"
let temperature = 0
let windspeed  = 0
let newDate = '';
let weekForecast = {}
  

function windchill(){    
    let windchill = ''
    
    if (temperature > 50 || windspeed < 3) {
        windchill = "N/A"
    }
    else {
        windchill = Math.round((35.74) + (0.6215 * temperature) - (35.75 * (windspeed ** 0.16)) + (0.4275 * temperature * (windspeed ** 0.16))).toFixed(2)
    }
    return windchill
}

fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('temperature').innerText = Math.round(data.main.temp);
        document.getElementById('temp_max').innerText = Math.round(data.main.temp_max);
        document.getElementById('windspeed').innerText = data.wind.speed;
        document.getElementById('humidity').innerText = data.main.humidity;
        let currentCondition = data.weather[0].description
        document.getElementById('current-condition').innerText = currentCondition.charAt(0).toUpperCase() + currentCondition.substring(1);
    })
    .then(() => {
        temperature = parseFloat(document.getElementById("temperature").innerText)
        windspeed = parseFloat(document.getElementById("windspeed").innerText)
        
        document.getElementById("windchill").innerText = windchill(temperature, windspeed);
    });

fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {

        newDate = '';
        weekForecast = {}
          
        weekForecast = Object.assign({}, ...data.list
            .filter(el => el.dt_txt.indexOf('18:00:00') >= 0)
            .map((el, index) => {
                    newDate = new Date(el.dt_txt)
                    return({
                       [days[newDate.getDay()] + " " + newDate.getDate()] : Math.round(el.main.temp) 
                    })
                }       
            ));
    })
    .then(() =>{
        let keys =  Object.keys(weekForecast)
        let values =  Object.values(weekForecast)
        for(i=0; i< keys.length; i++){
            document.getElementById("dayName" + (i + 1)).innerText = keys[i];
            document.getElementById("dayTemp" + (i + 1)).innerText = values[i] + " °C";
        }
    });