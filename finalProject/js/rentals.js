
let rentalsURL = './data/rentalData.js'


fetch(rentalsURL)
    .then((response) => response.json())
    .then((data) => {

        let keys =  Object.keys(data[0])
        let values =  Object.values(data[0])

        for(i=0; i< keys.length; i++){
            rentalRow = document.createElement("tr");
            
            // Rental type
            typeName = document.createElement("td")
            typeName.innerText = keys[i]
            
            // Max Persons
            maxPersons = document.createElement("td")
            maxPersons.innerText = values[i].maxPersons;

            // Reservation Half Day Prices
            resHalfDay = document.createElement("td")
            resHalfDay.innerText = values[i].reservation.halfDay;

            // Reservation Full Day Prices
            resFullDay = document.createElement("td")
            resFullDay.innerText = values[i].reservation.fullDay;

            // Walkin Half Day Prices
            walkHalfDay = document.createElement("td")
            walkHalfDay.innerText = values[i].walkIn.halfDay;

            // Walkin Full Day Prices
            walkFullDay = document.createElement("td")
            walkFullDay.innerText = values[i].walkIn.fullDay;

            rentalRow.appendChild(typeName)
            rentalRow.appendChild(maxPersons)
            rentalRow.appendChild(resHalfDay)
            rentalRow.appendChild(resFullDay)
            rentalRow.appendChild(walkHalfDay)
            rentalRow.appendChild(walkFullDay)


            rentalDetail = document.getElementById('rentalDetails')
            rentalDetail.appendChild(rentalRow)
        }

    })