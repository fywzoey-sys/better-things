/**
 * Better Things · Place detail page logic
 */

(function() {
  'use strict';

  var id = BT.getParam('id');
  var place = BT.getPlaceById(id);

  if (!place) {
    document.getElementById('placeName').textContent = '地点未找到';
    document.getElementById('placeSubtitle').textContent = '请返回重新选择';
    return;
  }

  // Nav title
  document.getElementById('navTitle').textContent = place.name;

  // Hero
  // Place titles should not contain manually inserted spaces between Chinese characters.
  var displayPlaceName = String(place.name || '').replace(/[\s\u00A0\u2000-\u200B\u202F\u205F\u3000]+/g, '');
  document.getElementById('placeName').textContent = displayPlaceName;
  document.getElementById('placeSubtitle').textContent = place.subtitle;

  // Tags
  var tagsHtml = place.wishes.map(function(w) {
    return '<span class="wish-tag" data-wish="' + w + '">' +
      BT.getWishIcon(w) + ' ' + BT.getWishName(w) + '</span>';
  }).join('');
  document.getElementById('placeTags').innerHTML = tagsHtml;

  // Description
  document.getElementById('placeDesc').textContent = place.description;

  // Shared structured booking component. Independent from reviewed notice lifecycle.
  document.getElementById('bookingInfo').appendChild(BT.renderBookingInfo(place));

  // Approved official notices only; absence means "not verified", never "open".
  var noticeList = document.getElementById('noticeList');
  var notices = BT.getPublishableNotices ? BT.getPublishableNotices(place.id) : [];
  var statusLabels = { normal: '常规开放公告', adjusted: '开放安排调整', closed: '暂停开放', unknown: '待核实' };
  if (notices.length) {
    notices.forEach(function(n) {
      var block = document.createElement('div');
      block.className = 'mt-8';
      var heading = document.createElement('p'); heading.className = 'detail-text';
      heading.textContent = '【' + (statusLabels[n.status] || '公告') + '】' + n.title;
      var content = document.createElement('p'); content.className = 'detail-text'; content.textContent = n.content;
      var meta = document.createElement('p'); meta.className = 'detail-text';
      meta.textContent = '发布：' + n.publishedAt + ' · 人工核验：' + n.verifiedAt + ' · ';
      var link = document.createElement('a'); link.href = n.sourceUrl;
      link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = '查看官方原文';
      meta.appendChild(link); block.appendChild(heading); block.appendChild(content); block.appendChild(meta);
      noticeList.appendChild(block);
    });
  }

  var favoriteBtn = document.getElementById('favoriteBtn');
  function updateFavorite() {
    var active = BT.isFavorite(place.id);
    favoriteBtn.textContent = active ? '★ 已收藏 · 点击取消' : '☆ 收藏地点';
    favoriteBtn.setAttribute('aria-pressed', String(active));
  }
  favoriteBtn.addEventListener('click', function() {
    if (!BT.toggleFavorite(place.id)) {
      favoriteBtn.textContent = '收藏失败：浏览器禁止本地存储'; return;
    }
    updateFavorite();
  });
  updateFavorite();

  // Address
  document.getElementById('placeAddress').textContent = '📍 ' + place.address;

  // Customs
  var customsHtml = place.customs.map(function(c) {
    return '<li>' + c + '</li>';
  }).join('');
  document.getElementById('placeCustoms').innerHTML = customsHtml;

  // Transport
  document.getElementById('placeTransport').textContent = place.transport;

  // Source
  var sourceEl = document.getElementById('placeSource');
  sourceEl.textContent = (place.verificationStatus || '待核实') + ' · ' + (place.source || '来源待补充');
  if (place.sourceUrl && /^https?:\/\//.test(place.sourceUrl)) {
    var sourceLink = document.createElement('a'); sourceLink.href = place.sourceUrl; sourceLink.target = '_blank'; sourceLink.rel = 'noopener noreferrer'; sourceLink.textContent = '查看来源'; sourceLink.style.marginLeft = '8px'; sourceEl.appendChild(sourceLink);
  }
  document.getElementById('placeVerified').textContent =
    '核验记录：' + (place.verifiedAt || '暂无') +
    (place.sourceUrl ? ' · 已记录来源链接' : ' · 暂无可核验来源链接') + (place.verificationNote ? ' · 备注：' + place.verificationNote : '');

  // Map navigation
  window.openMap = function() {
    var url = 'https://uri.amap.com/marker?position=' + place.lng + ',' + place.lat + '&name=' + encodeURIComponent(place.name);
    window.open(url, '_blank');
  };

  BT.initReveal();

})();
