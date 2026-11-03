/**
 * Better Things · Index page logic
 * Integrates hero animation from demo-intro.html + page content
 */

(function() {
  'use strict';

  // ═══════════ Hero Animation (from demo-intro.html) ═══════════
  var cities = [
    '北京','杭州','南京','成都','西安',
    '苏州','长沙','重庆','厦门','大理',
    '洛阳','拉萨','普陀山','五台山','开封'
  ];

  var hero = document.getElementById('hero');
  var clickCount = 0;

  var slots = [
    [0.12, 0.15], [0.75, 0.12], [0.42, 0.08],
    [0.88, 0.28], [0.22, 0.35], [0.62, 0.32],
    [0.08, 0.55], [0.48, 0.48], [0.82, 0.52],
    [0.32, 0.65], [0.68, 0.68], [0.15, 0.78],
    [0.55, 0.8], [0.85, 0.75], [0.38, 0.88]
  ];

  function getPositions(w, h) {
    var margin = 60;
    var positions = [];
    for (var i = 0; i < slots.length; i++) {
      positions.push({
        x: margin + slots[i][0] * (w - margin * 2),
        y: margin + slots[i][1] * (h - margin * 2)
      });
    }
    return positions;
  }

  function createRipple(x, y) {
    var r = document.createElement('div');
    r.className = 'ripple';
    r.style.left = x + 'px';
    r.style.top = y + 'px';
    hero.appendChild(r);
    setTimeout(function() { r.remove(); }, 1800);
  }

  function clamp(min, val, max) {
    return Math.max(min, Math.min(max, val));
  }

  function showCities() {
    var old = hero.querySelectorAll('.city-bubble');
    for (var i = 0; i < old.length; i++) old[i].remove();

    var w = hero.offsetWidth;
    var h = hero.offsetHeight;
    var positions = getPositions(w, h);
    var fontSize = clamp(1.0, w / 400, 1.5).toFixed(2) + 'rem';

    var shuffled = cities.slice();
    for (var i = shuffled.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = shuffled[i]; shuffled[i] = shuffled[j]; shuffled[j] = tmp;
    }

    var showCount = clickCount <= 1 ? 6 : shuffled.length;
    shuffled = shuffled.slice(0, showCount);

    for (var i = 0; i < shuffled.length; i++) {
      var pos = positions[i % positions.length];
      var el = document.createElement('div');
      el.className = 'city-bubble';
      el.textContent = shuffled[i];
      el.style.fontSize = fontSize;
      el.style.left = pos.x + 'px';
      el.style.top = pos.y + 'px';
      el.style.setProperty('--delay', (i * 0.12 + Math.random() * 0.15) + 's');
      el.style.setProperty('--dur', (2 + Math.random() * 0.8) + 's');
      hero.appendChild(el);
      requestAnimationFrame(function(e) {
        return function() { e.classList.add('show'); };
      }(el));
    }
  }

  hero.addEventListener('click', function(e) {
    var rect = hero.getBoundingClientRect();
    createRipple(e.clientX - rect.left, e.clientY - rect.top);

    clickCount++;
    hero.classList.add('revealed');
    showCities();

    var hint = hero.querySelector('.tap-hint');
    if (hint) {
      hint.style.animation = 'none';
      hint.style.transition = 'opacity 0.4s ease';
      hint.style.opacity = '0';
    }
  });

  window.addEventListener('scroll', function() {
    var scrollY = window.pageYOffset || document.documentElement.scrollTop;
    var heroH = hero.offsetHeight;
    var p = Math.min(scrollY / (heroH * 0.6), 1);
    hero.style.opacity = 1 - p;
    hero.style.transform = 'translateY(' + (-scrollY * 0.3) + 'px)';
  }, { passive: true });


  // ═══════════ Page Content Logic ═══════════

  var selectedCity = '';
  var selectedWish = '';

  // Render city chips
  function renderCityChips() {
    var container = document.getElementById('cityChips');
    var html = '<button class="chip active" data-city="all"><span class="chip-emoji">🌏</span>全部</button>';
    BT.CITIES.forEach(function(c) {
      html += '<button class="chip" data-city="' + c.id + '"><span class="chip-emoji">' + c.emoji + '</span>' + c.name + '</button>';
    });
    container.innerHTML = html;

    container.addEventListener('click', function(e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      container.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      selectedCity = chip.dataset.city === 'all' ? '' : chip.dataset.city;
      updateRecommendations();
      if (BT.updateWeather) BT.updateWeather(selectedCity);
    });
  }

  // Render wish chips
  function renderWishChips() {
    var container = document.getElementById('wishChips');
    var html = '<button class="chip active" data-wish="all"><span class="chip-emoji">✨</span>全部</button>';
    BT.WISHES.forEach(function(w) {
      html += '<button class="chip" data-wish="' + w.id + '"><span class="chip-emoji">' + w.icon + '</span>' + w.name + '</button>';
    });
    container.innerHTML = html;

    container.addEventListener('click', function(e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      container.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      selectedWish = chip.dataset.wish === 'all' ? '' : chip.dataset.wish;
      updateRecommendations();
    });
  }

  // Update recommendation list
  function updateRecommendations() {
    var section = document.getElementById('recommendSection');
    var list = document.getElementById('recommendList');

    if (!selectedCity && !selectedWish) {
      section.style.display = 'none';
      return;
    }

    var places = BT.filterPlaces(selectedCity, selectedWish);
    // Show max 4 on home
    places = places.slice(0, 4);

    if (places.length === 0) {
      section.style.display = 'block';
      list.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🍃</div><p class="empty-state-text">暂无匹配结果，换个组合试试？</p></div>';
      return;
    }

    section.style.display = 'block';
    list.innerHTML = places.map(function(p) {
      return BT.renderPlaceCard(p);
    }).join('');
  }

  // Calendar in China Standard Time; lunar observances are cultural reminders.
  function renderAlmanac() {
    var info = BT.getCalendarInfo ? BT.getCalendarInfo() : null;
    document.getElementById('almanacDate').textContent = info ? info.civil + ' · 农历 ' + info.lunar : '日期暂不可用';
    document.getElementById('almanacYi').textContent = '宜：尚未接入经授权的黄历数据';
    document.getElementById('almanacJi').textContent = '忌：尚未接入经授权的黄历数据';
    var reminder=document.getElementById('lunarReminder');
    if (info && info.reminder) { reminder.textContent = info.reminder + ' · 民俗日期提醒，不代表寺庙有活动'; reminder.style.display='block'; }
    else { reminder.style.display='none'; }
    document.getElementById('almanacSource').textContent='农历由浏览器历法计算 · 民俗内容仅供参考';
    // Use official date conversion when today's checked file is available; fallback to browser calculation.
    fetch('data/lunar-today.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('no lunar data');return r.json();}).then(function(d){
      var today=new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Shanghai',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
      if(d.date!==today || !d.lunarDate || !d.lunarYear)return;
      document.getElementById('almanacDate').textContent=(info?info.civil:today)+' · 农历 '+d.lunarDate;
      document.getElementById('almanacSource').textContent='农历：香港天文台官方数据 · 宜忌尚无授权来源';
    }).catch(function(){ /* offline: keep browser lunar date */ });

  }

  // Travel tips
  function renderTravelTips() {
    var container = document.getElementById('travelTips');
    container.innerHTML = BT.TRAVEL_TIPS.map(function(t) {
      return '<div class="tip-item">' +
        '<span class="tip-icon">' + t.icon + '</span>' +
        '<span class="tip-text">' + t.text + '</span>' +
      '</div>';
    }).join('');
  }

  // ═══ Init ═══
  renderCityChips();
  renderWishChips();
  renderAlmanac();
  if (BT.updateWeather) BT.updateWeather('');
  renderTravelTips();
  BT.initReveal();

})();
