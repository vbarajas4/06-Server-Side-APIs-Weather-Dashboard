

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

//Display city 
function displayCity(data){
  console.log(data)
cityName.textContent = data.name


 //Displays searched city current weather: icon, temperature, humidity, wind, uv index

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
      .then(function(response){
      return response.json()
   })
      .then(function(data){
       console.log(data)
   })
  
var uvColors = document.createElement("button");
var buttonColor;

//Condtional to display UV index color variations
if(response.data.current.uvi <= 2)
{
   buttonColor = "btn-success";
} else if (response.data.current.uvi >= 3 && response.data.current.uvi <= 7) {
   buttonColor = "btn-warning";
} else {
   buttonColor = "btn-danger";
}
uvColors.setAttribute("type", "button");
uvColors.setAttribute("class", `btn ${buttonColor}`);
uvColors.textContent = response.data.current.uvi;
$("#uv-Index").replaceWith(uvColors);
}







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
  