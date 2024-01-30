const getWeatherBtn = document.getElementById('getWeather');
const temperatureDiv = document.getElementById('temperature');
const descriptionDiv = document.getElementById('description');
const iconDiv = document.getElementById('icon');
const errorDisplayDiv = document.getElementById('errorDisplay');

function resetState() {
    temperatureDiv.innerText = '';
    descriptionDiv.innerText = '';
    iconDiv.src = './loupe.png';
    errorDisplayDiv.innerText = '';
};

getWeatherBtn.addEventListener('click', async () => {
    resetState();
    try {
        let city = document.getElementById('city').value;
        const weatherResponse = await fetch('http://localhost:3000?city=' + city);
        const { temperature, description, icon } = await weatherResponse.json();

        const roundedTemp = Math.round(temperature);
        temperatureDiv.innerText = roundedTemp + '°C';
        descriptionDiv.innerText = description;
        iconDiv.src = icon;

    } catch (error) {
        errorDisplayDiv.innerText = "City not found";
    }
});

resetState();