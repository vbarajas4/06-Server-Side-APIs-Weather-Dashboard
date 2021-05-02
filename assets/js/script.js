

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

var weatherPic = data.weather[0].icon;
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
    .then(function(info){
     console.log(info);
     getUv(info)
 })

}

function getUv(info){
  console.log(info)
 //uvEl.textContent = info.current.uvi;

  $("#UV-index").text(info.current.uvi);

 
  var currentUvi = info.current.uvi;
  var bgcolor;
  if (currentUvi <= 3) {
      bgcolor = "green";
     
  }
  else if (currentUvi >= 3 || currentUvi <= 6) {
      bgcolor = "yellow";
      
  }
  else if (currentUvi >= 6 || currentUvi <= 8) {
      bgcolor = "orange";
      
  }
  else {
      bgcolor = "red";
  }
  $("#UV-index").css("background-color", bgcolor);
 



//5days forecast
/*
//Get the necessary weather data that is to be displayed on the page
  fetch(urlOneCall)
  .then(function(resp) {
  return resp.json()
  .then(function(info) {
      console.log(info);*/
    
      
      //Five Day Forecast
      var day2 = (info.daily[1].dt)*1000;
      var day = moment(day2).format('L');
      $('#date0').text(day);
      var icon = info.daily[1].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#image0').attr('src', iconurl);
      $('#main0').text(info.daily[1].weather[0].main);
      $('#temperature0').text(info.daily[1].temp.day);                    
      $('#humidity0').text(info.daily[1].humidity + "%");
      
      var day2 = (info.daily[2].dt)*1000;
      var day = moment(day2).format('L');
      $('#date1').text(day);
      var icon = info.daily[2].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#image1').attr('src', iconurl);
      $('#main1').text(info.daily[2].weather[0].main);
      $('#temperature1').text(info.daily[2].temp.day);
      $('#humidity1').text(info.daily[2].humidity + "%");

      var day2 = (info.daily[3].dt)*1000;
      var day = moment(day2).format("MMM-DD-YYYY");
      $('#date2').text(day);
      var icon = info.daily[3].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#image2').attr('src', iconurl);
      $('#main2').text(info.daily[3].weather[0].main);
      $('#temperature2').text(info.daily[3].temp.day);
      $('#humidity2').text(info.daily[3].humidity + "%");

      var day2 = (info.daily[4].dt)*1000;
      var day = moment(day2).format("MMM-DD-YYYY");
      $('#date3').text(day);
      var icon = info.daily[4].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#image3').attr('src', iconurl);
      $('#main3').text(info.daily[4].weather[0].main);
      $('#temperature3').text(info.daily[4].temp.day);
      $('#humidity3').text(info.daily[4].humidity + "%");

      var day2 = (info.daily[5].dt)*1000;
      var day = moment(day2).format("MMM-DD-YYYY");
      $('#date4').text(day);
      var icon = info.daily[5].weather[0].icon;
      var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
      $('#image4').attr('src', iconurl);
      $('#main4').text(info.daily[5].weather[0].main);
      $('#temperature4').text(info.daily[5].temp.day);
      $('#humidity4').text(info.daily[5].humidity + "%");
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
  