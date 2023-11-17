
let weather = {
    "apiKey": "c3454ae569ad7262e6a93f43a84002ae",
    fetchWeather: function(city){
        fetch( "https://api.openweathermap.org/data/2.5/weather?q=" 
        + city 
        + "&appid=" 
        + this.apiKey 
        + "&units=metric"
        )
        .then((response) => response.json() )
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data){
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity, temp_min, temp_max} = data.main;
    const {speed} = data.wind;
    console.log(name,icon,description,temp,humidity,speed);
    document.querySelector(".city").innerText = "Weather in "  + name;
    document.querySelector(".icon").src = "https://openweathermap.org/img/wn/" + icon + ".png"; 
    document.querySelector(".descreption").innerText = description;
    document.querySelector(".temp").innerText = temp + "°C";
    document.querySelector(".humidity").innerText = "Humidity:" + humidity + "%";
    document.querySelector(".wind").innerText = "Wind Speed: " +speed +  "km/h";
    document.querySelector(".temp_min").innerText ="Low " +  temp_min + "°C";
    document.querySelector(".temp_max").innerText = "High " +  temp_max + "°C";
    document.querySelector(".weather").classList.remove("loading");
    document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?"+description+ "')";
    
 },
 search: function() {
    this.fetchWeather(document.querySelector(".search-bar").value);
 }
};

document
.querySelector((".search button"))
.addEventListener("click",function(){
weather.search();
});

document
.querySelector(".search-bar")
.addEventListener("keyup", function(event){
if (event.key == "Enter"){
    weather.search();
}
});

weather.fetchWeather("Lagos")

document.addEventListener("DOMContentLoaded", function() {
    document.querySelector(".search-bar").value = "Search City";
    document.querySelector(".search-bar").addEventListener("focus", function() {
        if (this.value === "Search City") {
            this.value = "";
        }
    });
});

function updateBackgroundImage() {
    const screenSize = window.innerWidth;
    const description = document.querySelector(".descreption").innerText.toLowerCase();

    const backgroundImageURL = screenSize < 600
        ? `url('https://source.unsplash.com/800x600/?${description}')`
        : `url('https://source.unsplash.com/1600x900/?${description}')`;

    document.body.style.backgroundImage = backgroundImageURL;
}

// Call the function on page load
updateBackgroundImage();

// Add an event listener for window resize
window.addEventListener("resize", updateBackgroundImage);

