const express = require('express');
const app = express();
const port = 3000;

app.get('/', async (req, res) => {
    const city = req.query.city;
    const apiKey = '3f69524796494d9b7fe0468f645703ba';
    try {
        const cityData = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apiKey}`);
        const cityDataJson = await cityData.json();

        const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${cityDataJson[0].lat}&lon=${cityDataJson[0].lon}&appid=${apiKey}&units=metric`);

        const weatherDataJson = await weatherData.json();

        const data = {
            temperature: weatherDataJson.main.temp,
            description: weatherDataJson.weather[0].description,
            icon: `http://openweathermap.org/img/w/${weatherDataJson.weather[0].icon}.png`
        };
        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(404).send('City not found');
    }

});

app.listen(port, () => {
    console.log("Server is running");
});