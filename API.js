$(document).ready(function() {

  //Set global variables.
  var geoLat = null;
  var geoLong = null;
  var isEff = true;
  var tempF = "";
  var tempC = "";
  var weekday = [];
  var weekdayConditions = [];
  var forecastIcon = [];
  var weekdayTemp = [];
  
  //Get geolocation for use in following functions.
  navigator.geolocation.getCurrentPosition(function(position) {
      geoLat = position.coords.latitude;
      geoLong = position.coords.longitude;

      //Begin get function. Weather underground api. See weatherUnderground API documentation for info.
      $.get("https://api.wunderground.com/api/3431adef2da78c54/geolookup/forecast10day/conditions//q/" + geoLat + "," + geoLong + ".json", function(data) {
          console.log(data); //End API call.

        //Loop to iterate through forecast array in api data, then apply those data in sequence to the HTML elements corresponding.
        
          for (i = 0; i < 10; i++) {
          weekdayTemp[i] = data.forecast.simpleforecast.forecastday[i].high.fahrenheit
          forecastIcon[i] = data.forecast.simpleforecast.forecastday[i].icon_url
          weekdayConditions[i] = data.forecast.simpleforecast.forecastday[i].conditions
          weekday[i] = data.forecast.simpleforecast.forecastday[i].date.weekday;
          $('#day' + [i] + '').prepend("<h4>" + weekday[i] + "</h4>");
          $('#conditions' + [i] + '').append(weekdayConditions[i]);
          $('#icon' + [i] + '').attr('src', forecastIcon[i]);
          $('#temp' + [i] + '').append(weekdayTemp[i] + "°");
        };

        var city = data.location.city;
        var state = data.location.state; tempF = data.current_observation.temp_f; tempC = data.current_observation.temp_c;
        var weather = data.current_observation.weather;
        var currentIcon = data.current_observation.icon_url; $("#cityName").append(city + ", " + state); $("#precip").append(weather); $('#temp').append(tempF + "°"); $('#todaysIcon').attr('src', currentIcon);
      }); //Append api data to HTML elements.

    $('.button').click(function() {
      if (isEff == true) {
        $('.button').empty();
        $('.button').append("C");
        $('#temp').empty();
        $("#temp").append(tempC + "°");
        isEff = false;
        console.log(isEff);
      } else if (isEff == false) {
        $('.button').empty();
        $('.button').append("F");
        $('#temp').empty();
        $("#temp").append(tempF + "°");
        isEff = true;
        console.log(isEff);
      }

    }); //Function to switch between celcius and fahrenheit.

  }); //End of geolocation function.

}); // End of Document Ready Function.
