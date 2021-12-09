


let townDataURL = `https://byui-cit230.github.io/weather/data/towndata.json`

let eventList = document.querySelector("#townEvents")
let eventInfo = null
let currentTown = null

fetch(townDataURL).then((response) => response.json())
    .then(data => {
        data.towns.forEach(town => {
            
            townCard = document.createElement("div")
            townCard.setAttribute('class', "gallery-card");
            townGallery = document.getElementById("gallery-id")
            townGallery.appendChild(townCard)
            
            townName = document.createElement("h3")
            townName.innerHTML = town.name
            townCard.appendChild(townName)
            
            townMotto = document.createElement("p")
            townMotto.innerHTML = town.motto
            townCard.appendChild(townMotto)
            
            townYearFounded = document.createElement("p")
            townYearFounded.innerHTML = "Year Founded: " + town.yearFounded
            townCard.appendChild(townYearFounded)
            
            townCurrentPopulation = document.createElement("p")
            townCurrentPopulation.innerHTML = "Current Population: " +  town.currentPopulation
            townCard.appendChild(townCurrentPopulation)
            
            townAverageRainfall = document.createElement("p")
            townAverageRainfall.innerHTML = "Average Rainfall" + town.averageRainfall
            townCard.appendChild(townAverageRainfall)
            
            townImage = document.createElement("img")
            townImage.setAttribute('class', "gallery-home");
            townImage.setAttribute('src', "images/" + town.photo)
            townImage.setAttribute('alt',  "Picture of " + town.name);
            townCard.appendChild(townImage)
                        
        })
    });