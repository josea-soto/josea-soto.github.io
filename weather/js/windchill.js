
function windchill(){    
    let windchill = ''
    
    if (temperature > 50 || windspeed < 3) {
        windchill = "N/A"
    }
    else {
        windchill = ((35.74) + (0.6215 * temperature) - (35.75 * (windspeed ** 0.16)) + (0.4275 * temperature * (windspeed ** 0.16))).toFixed(2)
    }
    
    return windchill
}

const temperature = parseFloat(document.getElementById("temperature").innerHTML)
const windspeed = parseFloat(document.getElementById("windspeed").innerHTML)

// setTimeout(() => {
    document.getElementById("windchill").innerHTML = windchill(temperature, windspeed);
// },10);