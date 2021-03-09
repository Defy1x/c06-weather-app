/*====== Psuedocode! BY CAS! <^^> =======
  By default everything on the page is hidden except the form
  When entering value form field will expand
  on click (icon) form will get the value from input
  API request is made based on the zipcode entered
  If no value then do not make API request
  On Function Date is created and added (without API)
  Main container is shown
  City Name is added
  Status is added
  Switch statment for every type of status will change background and icon accordingly
  Temp is converted from Kelvin to Fahrenheit
  Current temp is added
  Min / Max temp is added
  Temp changes color if it below 40 degrees or above 90 degrees
*/


$(document).ready(function() {
  // icons array
  let icons = new Skycons({"color": "#fff"}),
  list  = [ "clear-night","clear-day", "partly-cloudy-day","partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;
  for(i = list.length; i--; )
  icons.set(list[i], list[i]);
  icons.play();

  //Hide items on load
  $('.main').hide()
  $('#clear-day').hide()
  $('#partly-cloudy-day').hide()
  $('#cloudy').hide()
  $('#rain').hide()
  $('#sleet').hide()
  $('#snow').hide()
  $('#wind').hide()
  $('#fog').hide()


  // hide scroll bar
  setTimeout(hideURLbar, 0); }, false);
  function hideURLbar(){ window.scrollTo(0,1);


  //Animate search Bar
  let searchField = $('#zip-code')
  let icon = $('#search-btn')

  // Focus Event Handler
  $(searchField).on('focus', function(){
    $(this).animate({
      width:'55%'
    },200);
    $(icon).animate({
      right:'5px'
    }, 200);
  });

  // Blur Event Handler
  $(searchField).on('blur', function(){
    if(searchField.val() == ''){
      $(searchField).animate({
        width:'40%'
      },200, function(){})
      $(icon).animate({
        right:'5px'
      },200, function(){})
    }
  })

  // prevent Default
  $('#search-form').submit(function(e){
      e.preventDefault()
  })

  // grab value from form
  $('#search-btn').click((event) =>{
    event.preventDefault()
    zip = $('#zip-code').val().toLowerCase()
    console.log(zip)

  // if no value, exit
    if (!zip){
    return;
    }

  // parameter for call
    search(zip)

  //clear form
    $('#zip-code').val('')
    })
  }

  // async function begins
  async function search(zip) {

    try {

      const url = 'https://api.openweathermap.org/data/2.5/weather'
      const apiKey = '4159a716c99e2d3e9c669ff6a22c35db'

      let response = await axios.get(url, {
          params: {
          q: zip,
          appid: apiKey
          }
        })
        console.log(response.data)
        displayResults(response.data)

      } catch (error) {
        console.log(error)
        alert('Please enter valid city or zip')
      }
    }

  function displayResults(weatherData) {

//show main container
  $('.main').show()

// hide all icons that might already be displaying
  $('#clear-day').hide()
  $('#partly-cloudy-day').hide()
  $('#cloudy').hide()
  $('#rain').hide()
  $('#sleet').hide()
  $('#snow').hide()
  $('#wind').hide()
  $('#fog').hide()

  // add date
  // create day and date
  let mydate = new Date()
  let year = mydate.getYear()
  if(year<1000)
  year+=1900
  let hours = mydate.getHours()
  let min = mydate.getMinutes()
  let day = mydate.getDay()
  let month = mydate.getMonth()
  let daym = mydate.getDate()
  if(daym < 10)
  daym ="0"+ daym
  let dayarray = new Array("Sun","Mon","Tues","Wed","Thurs","Fri","Sat")
  let montharray = new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sept","Oct","Nov","Dec")

  function standardTimeConvert(input) {
    return moment(input, 'HH:mm').format('h:mm A');
}
  // add day to html
  $('#day').text(""+standardTimeConvert(""+hours+":"+min+"")+" "+dayarray[day]+", "+montharray[month]+" "+daym+"")

  // add city back to html
  $('#city').text(`${weatherData.name},${weatherData.sys.country}`)

// function declared for pulling in results once container is shown
  getWeatherStatus()

  // create functions for all different types of weather
  function getWeatherStatus(displayResults){
    let status = `${weatherData.weather[0].description}`

    //add status back to the html, no matter what the status
    $('#weather-status').text(status)

    //convert Kelvin to Farenheit
    function convertToF(kelvin) {

    let celcius = kelvin - 273

    let farenheit = celcius * (9/5) + 32

    return Math.floor(farenheit)
    }

    // get Temps - currentTemp, minTemp, maxTemp
    const currentTemp = convertToF(weatherData.main.temp)
    console.log(currentTemp)

    const maxTemp = convertToF(weatherData.main.temp_max)
    console.log(maxTemp)

    const minTemp = convertToF(weatherData.main.temp_min)
    console.log(minTemp)

    //Change current temp to red or blue
    if (currentTemp < 40) {
    $("#current-temp").css('color','rgba(34, 169, 239, 0.90)')
  } if (currentTemp > 90) {
    $("#current-temp").css('color','rgba(247, 62, 97, 0.90)')
  } else if (currentTemp < 89 && currentTemp > 39) {
    $("#current-temp").css('color','rgba(255, 215, 1, 0.80)')
  }

    //add back Temperatures back to HTML
    $('#current-temp').html(`${currentTemp}°`)
    $('#min-temp').html(`${minTemp}°F&nbsp;/&nbsp;`)
    $('#max-temp').html(`${maxTemp}°F`)


  // BEGIN SWITCH STATEMENT FOR ICONS AND BACKGROUND

  //CLEAR SKIES BEGINS
  switch (status) {
  case ('clear sky'):
    console.log("clear skies all day bitch")
    $("body").css('background-image','url("img/sunny.jpg")');
    $("h1").css('color','black');
    $('#clear-day').show()
    break;
// Clear skies ends fuck noooooo :(

//PARTLY CLOUDY BEGINS
  case ('scattered clouds'):
  case ('broken clouds'):
  case ('few clouds'):
    console.log("partly cloudy")
    $("body").css('background-image','url("img/partly-cloudy.jpg")');
    $("h1").css('color','black');
    $('#partly-cloudy-day').show()
    break;
// PARTLY CLOUDY ENDS

// CLOUDY BEGINS
  case ('cloudy'):
  case ('overcast clouds'):
    console.log("cloudy")
    $("body").css('background-image','url("img/cloudy.jpg")');
    $("h1").css('color','white');
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
    console.log("drizzle")
    $("body").css('background-image','url("img/drizzle.jpg")');
    $("h1").css('color','white');
    $('#rain').show()
    break;
// RAIN ENDS

// RAIN BEGINS
  case ('light rain'):
  case ('light intensity rain'):
  case ('ragged shower rain'):
    console.log("rain")
    $("body").css('background-image','url("img/rainy.jpg")');
    $("h1").css('color','white');
    $('#rain').show()
    break;
// RAIN ENDS

// HEAVY RAIN BEGINS
  case ('shower rain'):
  case ('heavy intensity rain'):
  case ('moderate rain'):
  case ('very heavy rain'):
  case ('extreme rain'):
    console.log("Heavy Rain")
    $("body").css('background-image','url("img/heavy-rain.jpg")');
    $("h1").css('color','white');
    $('#rain').show()
    break;
// HEAVY RAIN ENDS

//FOG BEGINS
  case ('fog'):
    console.log("fog")
    $("body").css('background-image','url("img/fog.jpg")');
    $("h1").css('color','black');
    $('#fog').show()
    break;
// FOG ENDS

//MIST BEGINS
  case ('mist'):
    console.log("mist")
    $("body").css('background-image','url("img/mist.jpg")');
    $("h1").css('color','black');
    $('#fog').show()
    break;
// MIST ENDS

//SAND BEGINS
  case ('sand'):
  case ('sand/ dust whirls'):
    console.log("sand")
    $("body").css('background-image','url("img/sand.jpg")');
    $("h1").css('color','black');
    $('#fog').show()
    break;
// SAND ENDS

// TORNADO BEGINS
  case ('tornado'):
    console.log("tornado")
    $("body").css('background-image','url("img/tornado.jpg")');
    $("h1").css('color','white');
    $('#wind').show()
    break;
// TORNADO ENDS

// SQUALLS BEGINS
  case ('squalls'):
    console.log("squalls")
    $("body").css('background-image','url("img/windy.jpg")');
    $("h1").css('color','black');
    $('#wind').show()
    break;
// SQUALLS ENDS

// DUST BEGINS
  case ('dust'):
    console.log("dust")
    $("body").css('background-image','url("img/dust.jpg")');
    $("h1").css('color','black');
    $('#fog').show()
    break;
// DUST ENDS

// ASH BEGINS
  case ('volcanic ash'):
    console.log("ash")
    $("body").css('background-image','url("img/ash.jpg")');
    $("h1").css('color','white');
    $('#fog').show()
    break;
// ASH ENDS

// HAZE BEGINS
  case ('haze'):
    console.log("haze")
    $("body").css('background-image','url("img/haze.jpg")');
    $("h1").css('color','black');
    $('#fog').show()
    break;
// HAZE ENDS

// SMOKE BEGINS
  case ('smoke'):
    console.log("smoke")
    $("body").css('background-image','url("img/smoke.jpg")');
    $("h1").css('color','black');
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
    console.log("thunderstorm")
    $("body").css('background-image','url("img/lightning.jpg")');
    $("h1").css('color','white');
    $('#rain').show()
    break;
// THUNDERSTORM ENDS

//SNOW BEGINS
  case ('sleet'):
  case ('light shower sleet'):
  case ('shower sleet'):
  case ('freezing rain'):
  case ('rain and snow'):
    console.log("sleet")
    $("body").css('background-image','url("img/sleet.jpg")');
    $("h1").css('color','white');
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
    console.log("snow")
    $("body").css('background-image','url("img/snow.jpg")');
    $("h1").css('color','white');
    $('#snow').show()
    break;
// SNOW ENDS

//DEFAULT JUST IN CASE IF I MISSED A VALUE
  default:
    console.log("no image")
    $("body").css('background-image','url("img/default.jpg")');
    $("h1").css('color','white');
    // end switch statement
    }
  //end display results
 }
// end document ready
}
