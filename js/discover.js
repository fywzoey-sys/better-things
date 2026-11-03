/**
 * Better Things · Discover page logic
 */

(function() {
  'use strict';

  var selectedCity = BT.getParam('city') || '';
  var selectedWish = BT.getParam('wish') || '';

  // Render city filter chips
  function renderCityChips() {
    var container = document.getElementById('filterCity');
    var html = '<button class="chip' + (!selectedCity ? ' active' : '') + '" data-city="all">全部</button>';
    BT.CITIES.forEach(function(c) {
      var active = selectedCity === c.id ? ' active' : '';
      html += '<button class="chip' + active + '" data-city="' + c.id + '">' + c.emoji + ' ' + c.name + '</button>';
    });
    container.innerHTML = html;

    container.addEventListener('click', function(e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      container.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      selectedCity = chip.dataset.city === 'all' ? '' : chip.dataset.city;
      renderPlaces();
    });
  }

  // Render wish filter chips
  function renderWishChips() {
    var container = document.getElementById('filterWish');
    var html = '<button class="chip' + (!selectedWish ? ' active' : '') + '" data-wish="all">全部</button>';
    BT.WISHES.forEach(function(w) {
      var active = selectedWish === w.id ? ' active' : '';
      html += '<button class="chip' + active + '" data-wish="' + w.id + '">' + w.icon + ' ' + w.name + '</button>';
    });
    container.innerHTML = html;

    container.addEventListener('click', function(e) {
      var chip = e.target.closest('.chip');
      if (!chip) return;
      container.querySelectorAll('.chip').forEach(function(c) { c.classList.remove('active'); });
      chip.classList.add('active');
      selectedWish = chip.dataset.wish === 'all' ? '' : chip.dataset.wish;
      renderPlaces();
    });
  }

  // Render filtered place list
  function renderPlaces() {
    var list = document.getElementById('placeList');
    var empty = document.getElementById('emptyState');
    var count = document.getElementById('resultCount');

    var places = BT.filterPlaces(selectedCity, selectedWish);

    count.textContent = places.length + ' 个地点';

    if (places.length === 0) {
      list.innerHTML = '';
      empty.style.display = '';
      return;
    }

    empty.style.display = 'none';
    list.innerHTML = places.map(function(p) {
      return BT.renderPlaceCard(p, { showCity: true });
    }).join('');
  }

  // ═══ Init ═══
  renderCityChips();
  renderWishChips();
  renderPlaces();
  BT.initReveal();

})();
