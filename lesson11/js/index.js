const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setTimeout(() => {
    let date = new Date();
    let currentYear = date.getFullYear()

    document.querySelector("#current-year").textContent +=  currentYear 
    document.querySelector("#last-updated").textContent = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(); 

    if (date.getDay() != 5) {
        document.getElementById("banner").style.display = "none"
    }
}, 10)


function toggleMenu() {    
    document.getElementById("nav-list").classList.toggle("show-menu");
}

function rateStorm(rating) {
    document.getElementById("ratingvalue").innerHTML = rating;
  }

