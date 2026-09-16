(function() {
  var input = document.getElementById('weather-input');
  var btn = document.getElementById('weather-btn');
  var result = document.getElementById('weather-result');

  if (!input || !btn || !result) return;

  // WMO 天气代码 → 描述 & 表情
  var codeMap = {
    0: { desc: '晴', emoji: '☀️' },
    1: { desc: '基本晴朗', emoji: '☀️' },
    2: { desc: '局部多云', emoji: '⛅' },
    3: { desc: '阴', emoji: '☁️' },
    45: { desc: '雾', emoji: '🌫️' },
    48: { desc: '雾凇', emoji: '🌫️' },
    51: { desc: '小毛毛雨', emoji: '🌦️' },
    53: { desc: '中等毛毛雨', emoji: '🌦️' },
    55: { desc: '大毛毛雨', emoji: '🌦️' },
    56: { desc: '冻毛毛雨', emoji: '🌦️' },
    57: { desc: '冻毛毛雨', emoji: '🌦️' },
    61: { desc: '小雨', emoji: '🌦️' },
    63: { desc: '中雨', emoji: '🌧️' },
    65: { desc: '大雨', emoji: '🌧️' },
    66: { desc: '冻雨', emoji: '🌧️' },
    67: { desc: '冻雨', emoji: '🌧️' },
    71: { desc: '小雪', emoji: '🌨️' },
    73: { desc: '中雪', emoji: '🌨️' },
    75: { desc: '大雪', emoji: '❄️' },
    77: { desc: '雪粒', emoji: '🌨️' },
    80: { desc: '小阵雨', emoji: '🌦️' },
    81: { desc: '中阵雨', emoji: '🌧️' },
    82: { desc: '强阵雨', emoji: '⛈️' },
    85: { desc: '小阵雪', emoji: '🌨️' },
    86: { desc: '大阵雪', emoji: '❄️' },
    95: { desc: '雷阵雨', emoji: '⛈️' },
    96: { desc: '雷阵雨伴小冰雹', emoji: '⛈️' },
    99: { desc: '雷阵雨伴大冰雹', emoji: '⛈️' }
  };

  var dirNames = ['北', '东北', '东', '东南', '南', '西南', '西', '西北'];

  function direction(deg) {
    return dirNames[Math.round(deg / 45) % 8];
  }

  function emojiFor(code, isDay) {
    var item = codeMap[code];
    if (!item) return '🌡️';
    if ((code === 0 || code === 1) && isDay === 0) return '🌙';
    return item.emoji;
  }

  function getWeather() {
    var city = input.value.trim();
    if (!city) {
      result.innerHTML = '<div class="weather-error">请输入城市名</div>';
      return;
    }

    result.innerHTML = '<div class="weather-loading"><i class="fas fa-spinner fa-spin"></i> 查询中...</div>';

    // 中文城市名默认限定中国地区，避免同名歧义（如"白山市"会跳到别国）
    var geoUrl = 'https://geocoding-api.open-meteo.com/v1/search?name=' +
      encodeURIComponent(city) + '&count=1&language=zh&format=json';
    if (/[\u4e00-\u9fff]/.test(city) && !/[,，]/.test(city)) {
      geoUrl += '&countryCode=CN';
    }

    fetch(geoUrl)
      .then(function(r) {
        if (!r.ok) throw new Error('地理编码失败');
        return r.json();
      })
      .then(function(geo) {
        if (!geo.results || geo.results.length === 0) {
          result.innerHTML = '<div class="weather-error"><i class="fas fa-map-marker-alt"></i> 未找到该城市，请检查城市名</div>';
          return;
        }
        var loc = geo.results[0];
        return fetch('https://api.open-meteo.com/v1/forecast?latitude=' + loc.latitude +
          '&longitude=' + loc.longitude +
          '&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m,surface_pressure,visibility,uv_index,is_day&timezone=auto')
          .then(function(r) {
            if (!r.ok) throw new Error('查询失败');
            return r.json();
          })
          .then(function(data) {
            var c = data.current;
            var name = loc.name;
            var region = loc.admin1 || loc.admin2;
            var country = loc.country || '';
            var code = c.weather_code;
            var desc = (codeMap[code] || {}).desc || '未知';
            var emoji = emojiFor(code, c.is_day);

            result.innerHTML =
              '<div class="weather-card">' +
                '<div class="weather-header">' +
                  '<div class="weather-location">' +
                    '<strong>' + name + '</strong>' +
                    '<span class="weather-region">' + (region !== name ? region + ', ' : '') + country + '</span>' +
                  '</div>' +
                  '<div class="weather-temp">' +
                    '<span class="weather-emoji">' + emoji + '</span>' +
                    '<span class="weather-temp-value">' + c.temperature_2m + '°C</span>' +
                  '</div>' +
                '</div>' +
                '<div class="weather-desc">' + desc + '</div>' +
                '<div class="weather-details">' +
                  '<div class="weather-detail-item"><span class="detail-label">体感温度</span><span>' + c.apparent_temperature + '°C</span></div>' +
                  '<div class="weather-detail-item"><span class="detail-label">湿度</span><span>' + c.relative_humidity_2m + '%</span></div>' +
                  '<div class="weather-detail-item"><span class="detail-label">风速</span><span>' + c.wind_speed_10m + ' km/h ' + direction(c.wind_direction_10m) + '</span></div>' +
                  '<div class="weather-detail-item"><span class="detail-label">气压</span><span>' + c.surface_pressure + ' hPa</span></div>' +
                  '<div class="weather-detail-item"><span class="detail-label">能见度</span><span>' + (c.visibility / 1000).toFixed(1) + ' km</span></div>' +
                  '<div class="weather-detail-item"><span class="detail-label">紫外线</span><span>' + c.uv_index + '</span></div>' +
                '</div>' +
              '</div>';
          });
      })
      .catch(function() {
        result.innerHTML = '<div class="weather-error"><i class="fas fa-exclamation-triangle"></i> 查询失败，请稍后再试或检查城市名是否正确</div>';
      });
  }

  btn.addEventListener('click', getWeather);
  input.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') getWeather();
  });

  // 默认加载北京天气
  getWeather();
})();