$(document).ready(function() {
  // icons array
  let icons = new Skycons({"color": "#FFF"}),
  list  = [ "clear-night","clear-day", "partly-cloudy-day","partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;
  for(i = list.length; i--; )
  icons.set(list[i], list[i]);
  icons.play();
  hideAll();
  getLocalStorage();

function hideAll(){
  $('.location').hide();
  $('.today-container').hide();
  $('#forecast-container').hide();
  $('#forecast-title').hide();
  $('#clear-day').hide()
  $('#partly-cloudy-day').hide()
  $('#cloudy').hide()
  $('#rain').hide()
  $('#sleet').hide()
  $('#snow').hide()
  $('#wind').hide()
  $('#fog').hide()
}

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
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}
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
      alert('Please enter a valid city')
    }
  }

  function displayResults(weatherData) {
      showItems();
      hideIcons();
      getDate();
      addToLocalStorage();

      $('#city').text(`${weatherData.name},${weatherData.sys.country}`)
      let status = `${weatherData.weather[0].description}`
      $('#today-status').text(status)

      function convertToF(kelvin) {
      let celcius = kelvin - 273
      let farenheit = celcius * (9/5) + 32
      return Math.floor(farenheit)
      }

      let uvIndex = 10;

      console.log (uvIndex)

      if (uvIndex <= 3 ){
        $('#uv-condition').text("Favorable").addClass("favorable");
      }
      else if (uvIndex > 3 && uvIndex <= 6){
        $('#uv-condition').text("Moderate").addClass("moderate");
      }
      else if(uvIndex <= 7 || uvIndex > 7 ){
        $('#uv-condition').text("Danger").addClass("danger");
      }

      const currentTemp = convertToF(weatherData.main.temp)

      $('#today-temp').html(`${currentTemp}°F`)
      $('#today-humidity').text(`Humidity: ${weatherData.main.humidity}%`)
      $('#today-windspeed').text(`Windspeed: ${weatherData.wind.speed}mph`)

      //CLEAR SKIES BEGINS
      switch (status) {
      case ('clear sky'):
        $('#clear-day').show()
        break;
    // Clear skies ends fuck noooooo :(

    //PARTLY CLOUDY BEGINS
      case ('scattered clouds'):
      case ('broken clouds'):
      case ('few clouds'):
        $('#partly-cloudy-day').show()
        break;
    // PARTLY CLOUDY ENDS

    // CLOUDY BEGINS
      case ('cloudy'):
      case ('overcast clouds'):
        $('#cloudy').show()
        break;
    // CLOUDY ENDS

    // RAIN BEGINS
      case ('drizzle'):
      case ('light intensity drizzle'):
      case ('heavy intensity drizzle'):
      case ('light intensity drizzle rain'):
      case ('drizzle rain'):
      case ('heavy intensity drizzle rain'):
      case ('shower rain and drizzle'):
      case ('light intensity shower rain'):
      case ('heavy shower rain and drizzle'):
      case ('shower drizzle'):
        $('#rain').show()
        break;
    // RAIN ENDS

    // RAIN BEGINS
      case ('light rain'):
      case ('light intensity rain'):
      case ('ragged shower rain'):
        $('#rain').show()
        break;
    // RAIN ENDS

    // HEAVY RAIN BEGINS
      case ('shower rain'):
      case ('heavy intensity rain'):
      case ('moderate rain'):
      case ('very heavy rain'):
      case ('extreme rain'):
        $('#rain').show()
        break;
    // HEAVY RAIN ENDS

    //FOG BEGINS
      case ('fog'):
        $('#fog').show()
        break;
    // FOG ENDS

    //MIST BEGINS
      case ('mist'):
        $('#fog').show()
        break;
    // MIST ENDS

    //SAND BEGINS
      case ('sand'):
      case ('sand/ dust whirls'):
        $('#fog').show()
        break;
    // SAND ENDS

    // TORNADO BEGINS
      case ('tornado'):
        $('#wind').show()
        break;
    // TORNADO ENDS

    // SQUALLS BEGINS
      case ('squalls'):
        $('#wind').show()
        break;
    // SQUALLS ENDS

    // DUST BEGINS
      case ('dust'):
        $('#fog').show()
        break;
    // DUST ENDS

    // ASH BEGINS
      case ('volcanic ash'):
        $('#fog').show()
        break;
    // ASH ENDS

    // HAZE BEGINS
      case ('haze'):
        $('#fog').show()
        break;
    // HAZE ENDS

    // SMOKE BEGINS
      case ('smoke'):
        $('#fog').show()
        break;
    // SMOKE ENDS

    //THUNDERSTORM BEGINS
      case ('thunderstorm'):
      case ('thunderstorm with rain'):
      case ('thunderstorm with light rain'):
      case ('thunderstorm with heavy rain'):
      case ('light thunderstorm'):
      case ('heavy thunderstorm'):
      case ('ragged thunderstorm'):
      case ('thunderstorm with light drizzle'):
      case ('thunderstorm with drizzle'):
      case ('thunderstorm with heavy drizzle'):
        $('#rain').show()
        break;
    // THUNDERSTORM ENDS

    //SNOW BEGINS
      case ('sleet'):
      case ('light shower sleet'):
      case ('shower sleet'):
      case ('freezing rain'):
      case ('rain and snow'):
        $('#sleet').show()
        break;
    // SNOW ENDS

    //SNOW BEGINS
      case ('snow'):
      case ('light snow'):
      case ('heavy snow'):
      case ('light rain and snow'):
      case ('rain and snow'):
      case ('light shower snow'):
      case ('shower snow'):
      case ('heavy shower snow'):
        $('#snow').show()
        break;
    // SNOW ENDS

    //DEFAULT JUST IN CASE IF I MISSED A VALUE
      default:
        // end switch statement
        }
  }

function showItems(){
  $('.location').show();
  $('.today-container').show();
  $('#forecast-container').show();
  $('#forecast-title').show();
};

function hideIcons(){
  $('#clear-day').hide()
  $('#partly-cloudy-day').hide()
  $('#cloudy').hide()
  $('#rain').hide()
  $('#sleet').hide()
  $('#snow').hide()
  $('#wind').hide()
  $('#fog').hide()
};

// pull in today's date
function getDate(){
  var todayDate = moment().format("dddd, MMMM Do");
  $("#current-date").text(todayDate);
};

function getLocalStorage(){
  console.log("get local storage")
}

function addToLocalStorage(){
  console.log("add to local storage")
}
