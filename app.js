const express = require('express')
const app = express()
const path = require('path')
const API_KEY = require('./config.js')

app.use(express.static(path.join(__dirname, 'public')));

app.get('/weather',async (req,res)=>{
    let {location} = req.query;

    if(!location){
        return res.status(404).json({error : "Missing the country query"})
    }

    const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${location}`
    try{
        const response = await fetch(apiUrl);

        const data = await response.json();

        const weatherData = {
            location : data.location.name,
            temp : data.current.temp_c,
            description: data.current.condition.text,
        };
        console.log(weatherData)
        return res.status(200).json(weatherData);
    }catch(error){
        console.log(error);
        return res.status(500).json({error : 'Failed to fetch weather data'})
    }
});

app.listen(5000,()=>{
    console.log(`Server is running at port 5000`);
})