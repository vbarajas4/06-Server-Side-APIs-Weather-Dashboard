var date = moment().format('L');

var searchButton = document.querySelector('#search-btn');
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
console.log(searchHistory);


//Search for current city weather
function getWeather(cityName) {
//request for city current condition from open weather map api
  var urlCityWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=83f513b8e9c0bfde2e896c17f85639ab";

      fetch(urlCityWeather)
        .then(function(response){
        return response.json()
        .then(function(data){
          console.log(data);
        })
      })

      .catch(function(err) {
        console.log(err);
       alert("Wrong city name!");
      })
}

//Display city









//saving cities searched to local storage
      searchButton.addEventListener('submit',function(){
        var searchInput = searchCity.value;
        getWeather(searchInput);
        searchHistory.push(searchInput);
        localStorage.setItem("search",JSON.stringify(searchHistory));
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
            historyItem.setAttribute("value", searchHistory[i]);
            historyItem.addEventListener("click",function() {
                getWeather(historyItem.value);
            })
            historyEl.append(historyItem);
        }
    }

    
//  When page loads, automatically generate current conditions and 5-day forecast for the last city the user searched for

    renderSearchHistory();
    if (searchHistory.length > 0) {
        getWeather(searchHistory[searchHistory.length - 1]);
    }




        
  

/*
   var urlForecast = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityname + "&units=imperial&appid=83f513b8e9c0bfde2e896c17f85639ab";
*/
