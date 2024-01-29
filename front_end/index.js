document.getElementById('getWeather').addEventListener('click', async function() {
    let city = document.getElementById('city').value;
    try {
       const weatherResponse = await fetch('http://localhost:3000?city=' + city);
         const weatherData = await weatherResponse.json();

         document.getElementById('temperature').innerText = weatherData.temperature;
         document.getElementById('description').innerText = weatherData.description;
         document.getElementById('icon').src = weatherData.icon;

    } catch (error) {
        alert('City not found');
    }

});
