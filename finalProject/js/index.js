const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

setTimeout(() => {
    let date = new Date();
    let currentYear = date.getFullYear()

    document.querySelector("#current-year").textContent +=  currentYear 
    document.querySelector("#last-updated").textContent = days[date.getDay()] + ", " + date.getDate() + " " + months[date.getMonth()] + " " + date.getFullYear(); 
}, 10)


function toggleMenu() {        
    document.getElementById("nav-list").classList.toggle("show-menu");
    
    let hero = document.getElementById("hero")
    if (hero) document.getElementById("hero").classList.toggle("blur");
    
    let menuImage = document.getElementById("menu-logo")

    if (menuImage.src.indexOf ("x.svg") >= 0) {
        menuImage.src = "./images/menu.svg";
    }
    else 
    {
        menuImage.src = "./images/x.svg";
    }
}

