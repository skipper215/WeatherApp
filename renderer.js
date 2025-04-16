
const apiKey = "520431e435bd608ac246b7baa0d4a65e";
let city = "";

const input = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");

addCard();

function addCard() {
    weatherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        city = input.value;

        if(city) {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        } 
    })
}

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const response = await fetch(apiUrl);
    if(!response.ok) {
        throw new Error("Could not fetch data");
    }
    return await response.json();   
}

function displayWeatherData(data) {
    //destructing 
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
    const cardDisplay = document.querySelector(".card");
    

    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = temp; 

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = humidity; 

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description; 

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = id; 

    cardDisplay.appendChild(cityDisplay);
    cardDisplay.appendChild(tempDisplay);
    cardDisplay.appendChild(humidityDisplay);
    cardDisplay.appendChild(descDisplay);
    cardDisplay.appendChild(weatherEmoji);

}