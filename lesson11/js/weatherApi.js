let townID = null

switch (document.title) {
    case 'Soda Springs':
        townID = 5607916
        break;
    case 'Fish Haven':
        townID = 5585010
        break;
    default:
        // 'Preston':
        townID = 5604473
        break;
};

let temperature = 0
let windspeed  = 0
let newDate = '';
let weekForecast = {}

let weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${townID}&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial`
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${townID}&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial`
let townDataURL = `https://byui-cit230.github.io/weather/data/towndata.json`


function windchill(){    
    let windchill = ''
    
    if (temperature > 50 || windspeed < 3) {
        windchill = "N/A"
    }
    else {
        windchill = Math.round((35.74) + (0.6215 * temperature) - (35.75 * (windspeed ** 0.16)) + (0.4275 * temperature * (windspeed ** 0.16)))
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
                    [days[newDate.getDay()] + " " + newDate.getDate()] : {
                        temp: Math.round(el.main.temp),
                        icon: el.weather[0].icon,
                        description: el.weather[0].description
                    } 
                })
            }       
            ));
    })
    .then(() =>{
        let keys =  Object.keys(weekForecast)
        let values =  Object.values(weekForecast)
        let imageSrc = ''
        let image = null

        let forecastTable = document.getElementById('forecast-table');
        let forecastDay = null

        for(i=0; i< keys.length; i++){
            forecastDay = document.createElement("div");
            forecastDay.setAttribute('class', "forecast-day");

            // Weather icon for the day
            imageSrc = `https://openweathermap.org/img/w/${values[i].icon}.png`;
            image = document.createElement("img");
            image.setAttribute('src', imageSrc);
            image.setAttribute('class', "sun");
            image.setAttribute('alt', values[i].description);
            
            // Day of the week
            dayName = document.createElement("span")
            dayName.innerText = days[i+1];
            dayName.setAttribute('class', "col-head");
            
            // Temperature
            dayTemp = document.createElement("span")
            dayTemp.innerText = values[i].temp + " °F";
            dayTemp.setAttribute('class', "data");

            forecastDay.appendChild(dayName)
            forecastDay.appendChild(image)
            forecastDay.appendChild(dayTemp)
            forecastTable.appendChild(forecastDay)
        }
    });


let eventList = document.querySelector("#townEvents")
let eventInfo = null
let currentTown = null

fetch(townDataURL).then((response) => response.json())
    .then((data) => {
        currentTown = data.towns.filter(town => town.name === document.title)[0]
        currentTown.events.forEach(event => {
            eventInfo = document.createElement("p")
            eventInfo.innerHTML = event
            eventList.appendChild(eventInfo)
        })
    });