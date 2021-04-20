

var searchButton = document.querySelector('#search-btn');
var clearEl = document.querySelector("#clear-history");
var searchCity = document.querySelector('#search-city');
var cityName = document.querySelector('#city-name');
var currentPic = document.querySelector('#current-pic');
var temperature = document.querySelector('#temperature');
var humidity = document.querySelector('#humidity');
var windSpeed = document.querySelector('#wind-speed');
var uvEl = document.querySelector('#UV-index');
var historyEl = document.querySelector('#searchhistory')
//var apiKey = '83f513b8e9c0bfde2e896c17f85639ab';

//save search history of cities (will be used later)
var searchHistory = JSON.parse(localStorage.getItem("search")) || [];
//console.log(searchHistory);

//Display Today's Date
$(document).ready(function(){
  $("#current-date").text(moment().format('L'));   
});

//Search for current city weather
function getWeather(cityName) {
 // console.log(cityName)
//request for city current condition from open weather map api
  var urlCityWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=83f513b8e9c0bfde2e896c17f85639ab";

      fetch(urlCityWeather)
        .then(function(response){
        return response.json()
        })
        .then(function(data){
          console.log(data);
          displayCity(data);
        })
      

      .catch(function(err) {
        console.log(err);
         
      })
}

//Displays searched city current weather: icon, temperature, humidity, wind, uv index
function displayCity(data){
  console.log(data)
cityName.textContent = data.name
 
$("#current-pic").text(data.weather[0].icon);
$("#temperature").text(data.main.temp);   
$("#humidity").text(data.main.humidity);   
$("#wind-speed").text(data.wind.speed);

let weatherPic = data.weather[0].icon;
  currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
  currentPic.setAttribute("alt",data.weather[0].description);

//getting uv-index
var lat = data.coord.lat;
var lon = data.coord.lon;

var urlOneCall = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=83f513b8e9c0bfde2e896c17f85639ab";

  fetch(urlOneCall)
    .then(function(res){
    return res.json()
 })
    .then(function(uvdata){
     console.log(uvdata);
     getUv(uvdata)
 })

}

function getUv(uvdata){
  console.log(uvdata)
  uvEl.textContent = uvdata.current.uvi;

  $("#UV-Index").text(uvdata.current.uvi);
}
/*   Not working
  let uvIndex = document.createElement("span");
  uvIndex.setAttribute("class","badge badge-danger");
  uvIndex.innerHTML = data.current.uvi;
  currentUV.innerHTML = "uvIndex: ";
  currentUV.append(uvIndex);
  
var uvColors = document.createElement("button");
var buttonColor;

//Condtional to display UV index color variations
if(data.current.uvi <= 2)
{
 buttonColor = "btn-success";
} else if (data.current.uvi >= 3 && data.current.uvi <= 7) {
 buttonColor = "btn-warning";
} else {
 buttonColor = "btn-danger";
}
uvColors.setAttribute("type", "button");
uvColors.setAttribute("class", `btn ${buttonColor}`);
uvColors.textContent = data.current.uvi;
$("#uv-Index").replaceWith(uvColors);
console.log(uvColors)

}*/

//5days forecast
/*  Needs fixing 
var searchHistory = [];

function fiveDayForecast (){

  var forecastEl = document.querySelectorAll(".forecast");
  for (i=0; i<forecastEl.length; i++) {
      forecastEl[i].innerHTML = "";
      var forecastIndex = [i]; ???
      
      
      var forecastDateEl = document.createElement("p");
      forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
      forecastDateEl.innerHTML = (uvdata.daily[0].dt).text(moment().format('L'));
      forecastEl[i].append(forecastDateEl);
      
      var forecastIconEl = document.createElement("img");
      forecastIconEl.setAttribute("src","https://openweathermap.org/img/wn/" + uvdata.daily[i].weather[0].icon + "@2x.png");
      forecastIconEl.setAttribute("alt",uvdata.daily[i].weather[0].description);
      forecastEl[i].append(forecastIconEl);

      var forecastTempEl = document.createElement("p");
      forecastTempEl.innerHTML = "Temperature: " + (uvdata.daily[i].temp) + " &deg;F";
      forecastEl[i].append(forecastTempEl);

      var forecastHumidityEl = document.createElement("p");
      forecastHumidityEl.innerHTML = "Humidity: " + uvdata.daily[0].humidity + "%";
      forecastEls[i].append(forecastHumidityEl);
      }
  }*/


//saving cities searched to local storage
      searchButton.addEventListener('click',function(){
        console.log('click')
        var searchInput = searchCity.value;
        console.log(searchInput);
        getWeather(searchInput);
        searchHistory.push(searchInput);
        localStorage.setItem("search",JSON.stringify(searchHistory));
        renderSearchHistory();
      })


    //clear history button
      clearEl.addEventListener("click",function() {
        searchHistory = [];
        renderSearchHistory();
      })

     //  Save user's search requests and display them underneath search form  
      function renderSearchHistory() {
        historyEl.innerHTML = "";
        for (var i=0; i<searchHistory.length; i++) {
            var historyItem = document.createElement("input");
            //setting attributes and styling how history list will look displayed
            historyItem.setAttribute("type","text");
            historyItem.setAttribute("readonly",true);
            historyItem.setAttribute("class", "form-control d-block bg-white");
           // console.log(searchHistory[i]);
            
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function(event) {
              console.log(event.target.value);
                getWeather(event.target.value);
            })
            historyEl.append(historyItem);
        }
    }


    
//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }
  