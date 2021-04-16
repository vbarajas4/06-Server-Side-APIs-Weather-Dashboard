var button = document.querySelector('#search-btn')
var searchCity = document.querySelector('#search-city')
var cityName = document.querySelector('#city-name')
var currentPic = document.querySelector('#current-pic')
var temperature = document.querySelector('#temperature')
var humidity = document.querySelector('#humidity')
var windSpeed = document.querySelector('#wind-speed')
var UV = document.querySelector('#UV-index')




    button.addEventListener('click', function(){
        fetch("https://api.openweathermap.org/data/2.5/weather?q=" + searchCity + "&appid=83f513b8e9c0bfde2e896c17f85639ab")
        .then(function (response) {
          return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
      //  .catch(function (err) {
      //      alert("Wrong city name!")
     //   })
    })


