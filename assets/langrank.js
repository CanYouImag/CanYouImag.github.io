(function() {
  var btn = document.getElementById('langrank-btn');
  var result = document.getElementById('langrank-result');

  if (!btn || !result) return;

  var colors = {
    'JavaScript': '#f1e05a',
    'TypeScript': '#3178c6',
    'Python': '#3572a5',
    'Java': '#b07219',
    'Go': '#00add8',
    'Rust': '#dea584',
    'C++': '#f34b7d',
    'C': '#555555',
    'C#': '#178600',
    'Ruby': '#701516',
    'PHP': '#4f5d95',
    'Shell': '#89e051',
    'Swift': '#ffac45',
    'Kotlin': '#a97bff',
    'Scala': '#c22d40',
    'Lua': '#000080',
    'Haskell': '#5e5086',
    'Elixir': '#6e4a7e',
    'Dart': '#00b4ab',
    'R': '#198ce7',
    'Objective-C': '#438eff',
    'Perl': '#0298c3',
    'Julia': '#a270ba',
    'Zig': '#ec915c',
    'Solidity': '#aa6746',
  };

  function getColor(lang) {
    return colors[lang] || '#666';
  }

  function fetchRanking() {
    result.innerHTML = '<div class="langrank-loading"><i class="fas fa-spinner fa-spin"></i> 获取中...</div>';

    fetch('https://api.github.com/search/repositories?q=stars:%3E10000&sort=stars&order=desc&per_page=100')
      .then(function(r) {
        if (!r.ok) {
          if (r.status === 403) throw new Error('API 频率限制，请稍后再试');
          throw new Error('请求失败 (' + r.status + ')');
        }
        return r.json();
      })
      .then(function(data) {
        var langCount = {};
        var total = 0;

        data.items.forEach(function(item) {
          var lang = item.language;
          if (lang) {
            langCount[lang] = (langCount[lang] || 0) + 1;
            total++;
          }
        });

        var sorted = Object.keys(langCount)
          .map(function(l) { return { name: l, count: langCount[l] }; })
          .sort(function(a, b) { return b.count - a.count; });

        if (sorted.length === 0) {
          result.innerHTML = '<div class="langrank-error">未获取到数据</div>';
          return;
        }

        var maxCount = sorted[0].count;
        var html = '<div class="langrank-list">';

        sorted.forEach(function(item, i) {
          var pct = (item.count / total * 100).toFixed(1);
          var barWidth = (item.count / maxCount * 100).toFixed(1);
          html +=
            '<div class="langrank-row">' +
              '<span class="langrank-rank">' + (i + 1) + '</span>' +
              '<span class="langrank-dot" style="background:' + getColor(item.name) + '"></span>' +
              '<span class="langrank-name">' + item.name + '</span>' +
              '<span class="langrank-count">' + item.count + '</span>' +
              '<div class="langrank-bar-bg">' +
                '<div class="langrank-bar" style="width:' + barWidth + '%;background:' + getColor(item.name) + '"></div>' +
              '</div>' +
            '</div>';
        });

        html += '</div>';
        html += '<div class="langrank-footer">基于 GitHub 搜索结果（stars > 10000），共统计 ' + total + ' 个项目</div>';
        result.innerHTML = html;
      })
      .catch(function(err) {
        result.innerHTML = '<div class="langrank-error"><i class="fas fa-exclamation-triangle"></i> ' + err.message + '</div>';
      });
  }

  btn.addEventListener('click', fetchRanking);
  fetchRanking();
})();
