const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const constants = require('./constants');

const app = express();

dotenv.config();

app.use(cors({
    origin: 'http://localhost:5500',
    optionsSuccessStatus: 200,
}));

app.get('/', async (req, res) => {
    const city = req.query.city;

    try {
        const cityData = await fetch(`${constants.CITYURL}?q=${city}&limit=1&appid=${process.env.API_KEY}`);
        const cityDataJson = await cityData.json();

        if (!cityDataJson && cityDataJson.length <= 0) return res.status(404).send('City not found');

        const weatherData = await fetch(`${constants.WEATHERURL}?lat=${cityDataJson[0].lat}&lon=${cityDataJson[0].lon}&appid=${process.env.API_KEY}&units=metric`);
        const weatherDataJson = await weatherData.json();

        return res.json({
            temperature: weatherDataJson.main.temp,
            description: weatherDataJson.weather[0].description,
            icon: `http://openweathermap.org/img/w/${weatherDataJson.weather[0].icon}.png`
        });

    } catch (error) {
        console.error(error);
        res.status(404).send('City not found');
    }

});

app.listen(constants.PORT, () => {
    console.log(`Server is running on port ${constants.PORT}`);
});