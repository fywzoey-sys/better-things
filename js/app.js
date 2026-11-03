/**
 * Better Things · Shared utilities
 */

(function() {
  'use strict';

  // Local-only favorites: never uploaded or shared.
  BT.favoritesKey = 'better-things-favorites-v1';
  BT.getFavorites = function() {
    try {
      var ids = JSON.parse(localStorage.getItem(BT.favoritesKey) || '[]');
      return Array.isArray(ids) ? ids.filter(function(id) { return typeof id === 'string'; }) : [];
    } catch (e) { return []; }
  };
  BT.isFavorite = function(id) { return BT.getFavorites().indexOf(id) !== -1; };
  BT.toggleFavorite = function(id) {
    var ids = BT.getFavorites();
    var i = ids.indexOf(id);
    if (i === -1) ids.push(id); else ids.splice(i, 1);
    try { localStorage.setItem(BT.favoritesKey, JSON.stringify(ids)); return true; }
    catch (e) { return false; }
  };

  // ═══ Place card HTML generator ═══
  BT.renderPlaceCard = function(place, options) {
    options = options || {};
    var showCity = options.showCity !== false;

    var tagsHtml = place.wishes.map(function(w) {
      return '<span class="wish-tag" data-wish="' + w + '">' +
        BT.getWishIcon(w) + ' ' + BT.getWishName(w) + '</span>';
    }).join('');

    var cityBadge = showCity
      ? '<span class="place-card-city">' + BT.getCityName(place.city) + '</span>'
      : '';

    return '<a href="place.html?id=' + place.id + '" class="card card-clickable place-card">' +
      '<div class="place-card-header">' +
        '<span class="place-card-name">' + place.name + '</span>' +
        cityBadge +
      '</div>' +
      '<p class="place-card-subtitle">' + place.subtitle + '</p>' +
      '<div class="place-card-tags">' + tagsHtml + '</div>' +
    '</a>';
  };

  // ═══ Weekly card HTML generator ═══
  BT.renderWeeklyCard = function(post) {
    var place = BT.getPlaceById(post.placeId);
    var placeName = place ? place.name : '';
    var cityName = place ? BT.getCityName(place.city) : '';

    var tagsHtml = post.tags.map(function(w) {
      return '<span class="wish-tag" data-wish="' + w + '">' +
        BT.getWishIcon(w) + ' ' + BT.getWishName(w) + '</span>';
    }).join('');

    return '<div class="card weekly-card">' +
      '<div class="weekly-card-meta">' +
        '<span class="weekly-card-author">' + post.author + '</span>' +
        '<span class="weekly-card-date">' + post.date + '</span>' +
      '</div>' +
      '<h3 class="weekly-card-title">' + post.title + '</h3>' +
      '<p class="weekly-card-excerpt">' + post.excerpt + '</p>' +
      '<div class="place-card-tags mb-8">' + tagsHtml + '</div>' +
      '<div class="weekly-card-footer">' +
        '<a href="place.html?id=' + post.placeId + '" class="weekly-card-place">📍 ' + placeName + '（' + cityName + '）</a>' +
        (post.verified ? '<span class="verified-badge">✓ 已审核</span>' : '') +
      '</div>' +
    '</div>';
  };

  // ═══ Query param helpers ═══
  BT.getParam = function(key) {
    var params = new URLSearchParams(window.location.search);
    return params.get(key) || '';
  };

  // ═══ Scroll reveal observer ═══
  BT.initReveal = function() {
    var els = document.querySelectorAll('.reveal');
    if (!els.length) return;

    if ('IntersectionObserver' in window) {
      var observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

      els.forEach(function(el) { observer.observe(el); });
    } else {
      // Fallback: show immediately
      els.forEach(function(el) { el.classList.add('visible'); });
    }
  };

})();
