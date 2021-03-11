$(document).ready(function() {
  // icons array
  let icons = new Skycons({"color": "#FFF"}),
  list  = [ "clear-night","clear-day", "partly-cloudy-day","partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;
  for(i = list.length; i--; )
  icons.set(list[i], list[i]);
  icons.play();

$('#search-form').submit(function(e){
    e.preventDefault()
})

  // grab value from form
$('#search-btn').click((event) =>{
  event.preventDefault()
  city = $('#city-name').val().toLowerCase()
  console.log(city)

// if no value, exit
  if (!city){
  return;
  }

// parameter for call
  search(city)

//clear form
  $('#city-name').val('')
  })
});

// async function begins
async function search(city) {

  try {

    const url = 'https://api.openweathermap.org/data/2.5/weather'
    const apiKey = '4159a716c99e2d3e9c669ff6a22c35db'

    let response = await axios.get(url, {
        params: {
        q: city,
        appid: apiKey
        }
      })
      console.log(response.data)
      displayResults(response.data)

    } catch (error) {
      console.log(error)
      alert('Please enter a valid city')
    }
  }

  function displayResults(weatherData) {

      $('#city').text(`${weatherData.name},${weatherData.sys.country}`)
      let status = `${weatherData.weather[0].description}`
      $('#today-status').text(status)
      getDate()

      function convertToF(kelvin) {
      let celcius = kelvin - 273
      let farenheit = celcius * (9/5) + 32
      return Math.floor(farenheit)
      }

      const currentTemp = convertToF(weatherData.main.temp)
      console.log(currentTemp)

      $('#today-temp').html(`${currentTemp}°F`)
      $('#today-humidity').text(`Humidity: ${weatherData.main.humidity}%`)
      $('#today-windspeed').text(`Windspeed: ${weatherData.wind.speed}`)
  }

// pull in today's date
  function getDate(){
    var todayDate = moment().format("dddd, MMMM Do");
    $("#current-date").text(todayDate);
  }
