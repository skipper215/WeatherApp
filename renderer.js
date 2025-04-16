
const apiKey = "520431e435bd608ac246b7baa0d4a65e";
let city = "";

const input = document.querySelector(".cityInput");
const weatherForm = document.querySelector(".weatherForm");

addCard();

function addCard() {
    weatherForm.addEventListener("submit", async (e) => {
        e.preventDefault();
        city = input.value;
        input.value = "";

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
    console.log(data);
    //destructing
    const {name: city, main: {temp, humidity}, weather: [{description, id}]} = data;
    const cardListDisplay = document.querySelector(".cardListDisplay");
    cardListDisplay.style.display = "block"; 
    
    const {emoji, gradient} = getWeatherEmoji(id);

    const cardDisplay = document.createElement("div");
    cardDisplay.classList.add("card");
    cardDisplay.style.background = gradient;
    
    const cityDisplay = document.createElement("h1");
    cityDisplay.textContent = city;

    const tempDisplay = document.createElement("p");
    tempDisplay.textContent = `${(temp - 273.15).toFixed(1)}°C`; 
    tempDisplay.classList.add("temperature");

    const humidityDisplay = document.createElement("p");
    humidityDisplay.textContent = `Humidity: ${humidity}%`; 

    const descDisplay = document.createElement("p");
    descDisplay.textContent = description; 

    const weatherEmoji = document.createElement("p");
    weatherEmoji.textContent = emoji; 

    cardDisplay.appendChild(cityDisplay);
    cardDisplay.appendChild(tempDisplay);
    cardDisplay.appendChild(humidityDisplay);
    cardDisplay.appendChild(descDisplay);
    cardDisplay.appendChild(weatherEmoji);
    cardListDisplay.appendChild(cardDisplay);
}

function getWeatherEmoji(id) {
    let gradient = "";
    let emoji = "";

    switch(true) {
        case (id >= 200 && id < 300): // Thunderstorms
            gradient = "linear-gradient(to right, #2c3e50, #3498db)"; // Dark stormy gradient
            emoji = "⛈️";
            break;
        case (id >= 300 && id < 400): // Drizzle
            gradient = "linear-gradient(to right, #00bcd4, #1de9b6)"; // Light blue gradient
            emoji = "💧";
            break;
        case (id >= 400 && id < 500): // Light rain
            gradient = "linear-gradient(to right, #607d8b, #90a4ae)"; // Grey rainy gradient
            emoji = "🌧️";
            break;
        case (id >= 500 && id < 600): // Rain
            gradient = "linear-gradient(to right, #37474f, #607d8b)"; // Dark rainy gradient
            emoji = "🌨️";
            break;
        case (id >= 600 && id < 700 || (id >= 801 && id <= 804)): // Snow or Clouds
            gradient = "linear-gradient(to right, #ffffff, #b0bec5)"; // Light snow/cloudy gradient
            emoji = "☁️";
            break;
        case (id >= 700 && id < 800): // Clear sky
            gradient = "linear-gradient(to right, #ff9800, #ffeb3b)"; // Bright sunny gradient
            emoji = "☀️";
            break;
        default: // In case there's an unknown weather ID
            gradient = "linear-gradient(to right, #90caf9, #ffeb3b)"; // Default gradient
            emoji = "🌤️";
    }

    return {emoji: emoji, gradient: gradient};

}