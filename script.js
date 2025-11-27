const button = document.getElementById("button");
const currentLocation = document.getElementById("currentlocation");

const weatherCard = document.getElementById("weatherCard");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const conditions = document.getElementById("conditions");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const errorMessage = document.getElementById("errorMessage");

function getcurrentWeatherStatus(event) {
    event.preventDefault();

    const location = currentLocation.value.trim();
    if (location === "") {
        errorMessage.textContent = "Please enter a location.";
        weatherCard.classList.add("hidden");
        return;
    }

    errorMessage.textContent = "";
    weatherCard.classList.add("hidden");

    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=BX5XK2LH2DHFAS3NWGAM5239T&contentType=json`)
    .then(response => {
        if (!response.ok) throw response;
        return response.json();
    })
    .then(data => {
        cityName.textContent = data.resolvedAddress;
        temperature.textContent = data.currentConditions.temp + "°C";
        conditions.textContent = data.currentConditions.conditions;
        humidity.textContent = data.currentConditions.humidity + "%";
        wind.textContent = data.currentConditions.windspeed + " km/h";

        weatherCard.classList.remove("hidden");
    })
    .catch(err => {
        errorMessage.textContent = "Location not found or request failed.";
        weatherCard.classList.add("hidden");
        console.error(err);
    });
}

button.addEventListener("click", getcurrentWeatherStatus);
