fetch("https://api.openweathermap.org/data/2.5/weather?q=San Diego&appid=83f513b8e9c0bfde2e896c17f85639ab").then(function(response){
    console.log(response)
    return response.json()
}).then(function(data){

var lat = data.coord.lat
var lon = data.coord.lon

fetch("https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&appid=83f513b8e9c0bfde2e896c17f85639ab").then(function(response){
    return response.json()
}).then(function(data){
    console.log(data)
})
})




