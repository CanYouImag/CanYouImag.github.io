(function() {
  var input = document.getElementById('weather-input');
  var btn = document.getElementById('weather-btn');
  var result = document.getElementById('weather-result');

  if (!input || !btn || !result) return;

  function getWeather() {
    var city = input.value.trim();
    if (!city) {
      result.innerHTML = '<div class="weather-error">请输入城市名</div>';
      return;
    }

    // 中文城市名默认限定中国地区，避免同名歧义（如"白山市"会跳到日本）
    var query = city;
    if (/[\u4e00-\u9fff]/.test(city) && !/[,，]/.test(city)) {
      query = city + ',CN';
    }

    result.innerHTML = '<div class="weather-loading"><i class="fas fa-spinner fa-spin"></i> 查询中...</div>';

    fetch('https://wttr.in/' + encodeURIComponent(query) + '?format=j1')
      .then(function(r) {
        if (!r.ok) throw new Error('查询失败');
        return r.json();
      })
      .then(function(data) {
        var c = data.current_condition[0];
        var loc = data.nearest_area[0];
        var name = loc.areaName[0].value;
        var country = loc.country[0].value;
        var region = loc.region[0].value;

        var temp = c.temp_C;
        var feels = c.FeelsLikeC;
        var desc = c.weatherDesc[0].value;
        var humidity = c.humidity;
        var windSpeed = c.windspeedKmph;
        var windDir = c.winddir16Point;
        var pressure = c.pressure;
        var visibility = c.visibility;
        var uvIndex = c.uvIndex;

        var emojiMap = {
          'Sunny': '☀️', 'Clear': '🌙', 'Partly cloudy': '⛅', 'Cloudy': '☁️',
          'Overcast': '☁️', 'Mist': '🌫️', 'Fog': '🌫️', 'Light rain': '🌦️',
          'Moderate rain': '🌧️', 'Heavy rain': '🌧️', 'Light snow': '🌨️',
          'Moderate snow': '❄️', 'Heavy snow': '❄️', 'Thunderstorm': '⛈️',
          'Patchy rain possible': '🌦️', 'Light drizzle': '🌦️'
        };
        var emoji = emojiMap[desc] || '🌡️';

        result.innerHTML =
          '<div class="weather-card">' +
            '<div class="weather-header">' +
              '<div class="weather-location">' +
                '<strong>' + name + '</strong>' +
                '<span class="weather-region">' + (region !== name ? region + ', ' : '') + country + '</span>' +
              '</div>' +
              '<div class="weather-temp">' +
                '<span class="weather-emoji">' + emoji + '</span>' +
                '<span class="weather-temp-value">' + temp + '°C</span>' +
              '</div>' +
            '</div>' +
            '<div class="weather-desc">' + desc + '</div>' +
            '<div class="weather-details">' +
              '<div class="weather-detail-item"><span class="detail-label">体感温度</span><span>' + feels + '°C</span></div>' +
              '<div class="weather-detail-item"><span class="detail-label">湿度</span><span>' + humidity + '%</span></div>' +
              '<div class="weather-detail-item"><span class="detail-label">风速</span><span>' + windSpeed + ' km/h ' + windDir + '</span></div>' +
              '<div class="weather-detail-item"><span class="detail-label">气压</span><span>' + pressure + ' hPa</span></div>' +
              '<div class="weather-detail-item"><span class="detail-label">能见度</span><span>' + visibility + ' km</span></div>' +
              '<div class="weather-detail-item"><span class="detail-label">紫外线</span><span>' + uvIndex + '</span></div>' +
            '</div>' +
          '</div>';
      })
      .catch(function(err) {
        result.innerHTML = '<div class="weather-error"><i class="fas fa-exclamation-triangle"></i> 查询失败，请检查城市名是否正确</div>';
      });
  }

  btn.addEventListener('click', getWeather);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') getWeather();
  });

  // 默认加载北京天气
  getWeather();
})();
