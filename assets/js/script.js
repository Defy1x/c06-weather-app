$(document).ready(function() {
  // icons array
  let icons = new Skycons({"color": "#FFF"}),
  list  = [ "clear-night","clear-day", "partly-cloudy-day","partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;
  for(i = list.length; i--; )
  icons.set(list[i], list[i]);
  icons.play();
  hideAll();

//get localstorage
var savedCitiesArray = JSON.parse(localStorage.getItem("savedCities")) || [];

  $("#clearBtn").on("click", function(){
    console.log("local storage cleared")
    $('#recent-cities').empty('')
    localStorage.clear();
  });



//hide call icons
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

//prevent form from reloading the screen
  $('#search-form').submit(function(e){
      e.preventDefault()
  })


  // grab value from form
$('#search-btn').click((event) =>{
  event.preventDefault()
  city = $('#city-name').val().toLowerCase()

  console.log(city)

// if no value entered for city, then exit
  if (!city){
  return;
  }

// run search city (1st api)
search(city);

//clear city form value
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
        appid: apiKey,
        }
      })
      console.log(response.data)
      displayResults(response.data)

    } catch (error) {
      alert('Please enter a valid city')
    }
  }


  function displayResults(weatherData) {

    //run saveCity function
    saveCity();

//makes the city a button and then
    function saveCity(){
      let savedCity = (`${weatherData.name}`);
      console.log (savedCity);
      $('#recent-cities').prepend("<li><button>"+(savedCity)+"</button></li>");
      $('#recent-cities li button').on("click", function(){
        var city = this.textContent;
        console.log(city + " that is being hit")
        runSavedCity(city);
      });
}
  //runs the search on the hit city
      function runSavedCity(city) {
          search(city);
      };
      //
      var savedCitiesArray = JSON.parse(localStorage.getItem("savedCities")) || [];

         // function saveCity(savedCity) {
         //       var cityName = city;
         //       console.log("this is the new city name " + cityName)
               // if (!savedCitiesArray.includes(cityName)) {
               //     savedCitiesArray.push(cityName);
               //     localStorage.setItem("savedCities", JSON.stringify(savedCitiesArray));
               //     var savedCityButton = document.createElement('button');
               //     savedCityButton.innerText = cityName;
               //     savedCityButton.setAttribute('type', 'button');
               //     savedCities.appendChild(savedCityButton);
               //     savedCityButton.addEventListener('click', runSavedCity);
               // }

        // }
    //show containers
      showItems();

    //hide icons if function is run again
      hideIcons();
    //get current date
      getDate();

    //display city
      $('#city').text(`${weatherData.name}, ${weatherData.sys.country}`)

    //display status
      let status = `${weatherData.weather[0].description}`
      $('#today-status').text(status)




      // convert temperature from kelvin to farenheit
      function convertToF(kelvin) {
      let celcius = kelvin - 273
      let farenheit = celcius * (9/5) + 32
      return Math.floor(farenheit)
      }

      //display current temperature
      const currentTemp = convertToF(weatherData.main.temp)
      $('#today-temp').html(`${currentTemp}°F`)

      //display current Humidity
      $('#today-humidity').text(`Humidity: ${weatherData.main.humidity}%`)
      //display current windspeed
      $('#today-windspeed').text(`Windspeed: ${weatherData.wind.speed}mph`)

      let lat = `${weatherData.coord.lat}`;
      let lon = `${weatherData.coord.lon}`;

      getForecast(lat,lon)


  //Run switch statement to display animated icons based on the status
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

// show containers for everything
function showItems(){
  $('.location').show();
  $('.today-container').show();
  $('#forecast-container').show();
  $('#forecast-title').show();
};

//hide icons if they are already displaying
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

//get 5 day forecast
async function getForecast(lat, lon) {

  try {

    const url = 'https://api.openweathermap.org/data/2.5/onecall?&exclude=hourly,minutely&units=imperial'
    const apiKey = '4159a716c99e2d3e9c669ff6a22c35db'

    let forecast = await axios.get(url, {
        params: {
        lat: lat,
        lon: lon,
        appid: apiKey,
        }
      })
      console.log(forecast.data)
      displayForecast(forecast.data)

    } catch (error) {
      alert('Not a valid lat/long')
    }
  }

function displayForecast(forecastData){

  //display UV Index
  let uvIndex = (`${forecastData.current.uvi}`);

  //set UV index statements
  if (uvIndex <= 3 ){
    $('#uv-condition').text("Favorable").addClass("favorable");
  }
  else if (uvIndex > 3 && uvIndex <= 6){
    $('#uv-condition').text("Moderate").addClass("moderate");
  }
  else if(uvIndex <= 7 || uvIndex > 7 ){
    $('#uv-condition').text("Severe").addClass("severe");
  }

  //display results in 5 containers
  for (var i = 1; i < 6; i++) {
      // display future date
      var futureDate = moment.unix(`${forecastData.daily[i].dt}`).format("dddd");
      $(`#future-date${i}`).text(futureDate);

      //display future temp and round degrees down
      var futureTemp = (`${forecastData.daily[i].temp.day}`)
      var futureTempRound = Math.floor(futureTemp)+"°F";
      $(`#future-temp${i}`).text(futureTempRound);

       //display future status
      var futureStatus = (`${forecastData.daily[i].weather[0].description}`)
      $(`#future-status${i}`).text(futureStatus);

      //display future Humidity
      var futureHumidity = (`Humidity: ${forecastData.daily[i].humidity}%`)
      $(`#future-humidity${i}`).text(futureHumidity);

      //empty all the icons on the next call
      $(`#future-weather-icon${i}`).empty('');

    //display future icons using font awesome
    //DISPLAY SUNNY ICON
      switch (futureStatus) {
      case ('clear sky'):
        $(`#future-weather-icon${i}`).append('<i class="fas fa-sun fa-2x"></i>');
        break;

    //PARTLY CLOUDY BEGINS
      case ('scattered clouds'):
      case ('broken clouds'):
      case ('few clouds'):
          $(`#future-weather-icon${i}`).append('<i class="fas fa-cloud-sun fa-2x">');
        break;
    // PARTLY CLOUDY ENDS

    // CLOUDY BEGINS
      case ('cloudy'):
      case ('overcast clouds'):
      case ('volcanic ash'):
      case ('smoke'):
          $(`#future-weather-icon${i}`).append('<i class="fas fa-cloud fa-2x">');
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
      case ('light rain'):
      case ('light intensity rain'):
      case ('ragged shower rain'):
      case ('shower rain'):
      case ('heavy intensity rain'):
      case ('moderate rain'):
      case ('very heavy rain'):
      case ('extreme rain'):
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
          $(`#future-weather-icon${i}`).append('<i class="fas fa-cloud-showers-heavy fa-2x">');
        break;
    // RAIN ENDS

    //FOG BEGINS
      case ('fog'):
      case ('mist'):
      case ('sand'):
      case ('sand/ dust whirls'):
      case ('tornado'):
      case ('squalls'):
      case ('dust'):
      case ('haze'):
          $(`#future-weather-icon${i}`).append('<i class="fas fa-wind"></i>');
        break;
    // FOG ENDS

    //SNOW BEGINS
      case ('sleet'):
      case ('light shower sleet'):
      case ('shower sleet'):
      case ('freezing rain'):
      case ('rain and snow'):
      case ('snow'):
      case ('light snow'):
      case ('heavy snow'):
      case ('light rain and snow'):
      case ('rain and snow'):
      case ('light shower snow'):
      case ('shower snow'):
      case ('heavy shower snow'):
        $(`#future-weather-icon${i}`).append('<i class="far fa-snowflake fa-2x">');
        break;
    // SNOW ENDS

    //DEFAULT JUST IN CASE IF I MISSED A VALUE
      default:
        // end switch statement
    }
  }
}

// pull in today's date
function getDate(){
  var todayDate = moment().format("dddd, MMMM Do YYYY");
  $("#current-date").text(todayDate);
};
//
