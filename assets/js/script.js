$(document).ready(function() {
  // icons array
  let icons = new Skycons({"color": "#FFF"}),
  list  = [ "clear-night","clear-day", "partly-cloudy-day","partly-cloudy-night", "cloudy", "rain", "sleet", "snow", "wind", "fog"], i;
  for(i = list.length; i--; )
  icons.set(list[i], list[i]);
  icons.play();
});

//load in today's date"
var todayDate = moment().format("dddd, MMMM Do");
$("#current-date").text(todayDate);
