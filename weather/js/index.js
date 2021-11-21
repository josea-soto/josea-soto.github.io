setTimeout(() => {
    const lastModified = document.lastModified;
    const currentYear = new Date().getFullYear()

    document.querySelector("#current-year").textContent +=  currentYear 
    document.querySelector("#last-updated").textContent = lastModified 
}, 10)


function toggleMenu() {    
    document.getElementById("nav-list").classList.toggle("show-menu");
}



