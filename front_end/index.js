function initState() {
    document.getElementById('temperature').innerText = '';
    document.getElementById('description').innerText = '';
    document.getElementById('icon').src = './loupe.png';
    document.getElementById('errorDisplay').innerText = '';
}
initState();


document.getElementById('getWeather').addEventListener('click', async function() {
    let city = document.getElementById('city').value;
    try {
       const weatherResponse = await fetch('http://localhost:3000?city=' + city);
       const weatherData = await weatherResponse.json();

         const temperature = Math.round(weatherData.temperature);
        document.getElementById('temperature').innerText = temperature + '°C';
         document.getElementById('description').innerText = weatherData.description;
         document.getElementById('icon').src = weatherData.icon;

    } catch (error) {
        initState();
        document.getElementById('errorDisplay').innerText = "City not found";
    }

});

