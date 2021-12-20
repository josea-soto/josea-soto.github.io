let cozumelID = 3530103

let temperature = 0
let windspeed  = 0
let newDate = '';
let weekForecast = {}

let weatherURL = `https://api.openweathermap.org/data/2.5/weather?id=${cozumelID}&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial`
let forecastURL = `https://api.openweathermap.org/data/2.5/forecast?id=${cozumelID}&appid=92e8868f277c47300b3b3258e89d9053&lang=en&units=imperial`

fetch(weatherURL)
    .then((response) => response.json())
    .then((data) => {
        document.getElementById('temperature').innerText = Math.round(data.main.temp);
        document.getElementById('humidity').innerText = data.main.humidity;
        let currentCondition = data.weather[0].description
        document.getElementById('current-condition').innerText = currentCondition.charAt(0).toUpperCase() + currentCondition.substring(1);
    })

fetch(forecastURL)
    .then((response) => response.json())
    .then((data) => {
        newDate = new Date();
        newDate.setDate(newDate.getDate() + 5)

        weekForecast = {}
        
        weekForecast = Object.assign({}, ...data.list
            .filter(el => el.dt_txt.indexOf(`${newDate.getFullYear()}-${newDate.getMonth() + 1}-${newDate.getDate()} 00:00:00`) >= 0)
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
            
            // Day of the week
            dayName = document.createElement("span")
            dayName.innerText = keys[i] + ' --- '
            dayName.setAttribute('class', "col-head");
            
            // Temperature
            dayTemp = document.createElement("span")
            dayTemp.innerText = values[i].temp + " °F";
            dayTemp.setAttribute('class', "data");

            forecastDay.appendChild(dayName)
            // forecastDay.appendChild(image)
            forecastDay.appendChild(dayTemp)
            forecastTable.appendChild(forecastDay)
        }
    });

