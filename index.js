const express = require('express');
const app = express();
const path = require("path");
const request = require("request");
const PORT = process.env.PORT || 3000

const static_path = path.join(__dirname, "/public");

app.set('view engine', "hbs");
app.use(express.static(static_path));


app.get("/", (req, res) => {
   res.render('index');
});

app.get("/about", (req, res) => {
   res.render('about');
});

// app.get("/weather", (req, res) => {
//    res.render('weather');
// });

app.get('/weather', (req, res) => {
const city = req.query.city;
console.log(city);

if(!city) {
   return res.render('weather');
}
   
   const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=d30a4f72c654dec5229fd4e8b57eed63`;

   // // Fetch weather data for the selected city
   request(apiURL, (error, response, body) => {
       if (error) {
           return res.status(500).send('Error occurred while fetching weather data.');
       }

       const data = JSON.parse(body);
       

       // Extract temperature or any other info from the API response
       const gettemp = data.main.temp;
       let temp = gettemp - 273.15;
       temp = temp.toFixed(1);
       let weather_type = data.weather[0].main;
       let weather_des = data.weather[0].description;

       // Render the get_weather page with the fetched weather data
       res.render('weather_output', {city_name: city, temperature: temp, weathertype: weather_type, weatherdes: weather_des});
      // res.send(data);
   });
});

app.get("/contact", (req, res) => {
   res.render('contact');
});

app.get("*", (req, res) => {
   res.render('error');
});

app.listen(PORT, () => {
   console.log("Listening...");
});

