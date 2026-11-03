/**
 * Better Things · Weekly picks page logic
 */

(function() {
  'use strict';

  var container = document.getElementById('weeklyList');

  // Public weekly feed only includes reviewed, linked posts within last seven days.
  var validPosts = (BT.WEEKLY_POSTS || []).filter(function(post) {
    var t = Date.parse(post.date);
    return post.approved === true && /^https:\/\//.test(post.sourceUrl || '') && Number.isFinite(t) && Date.now() >= t && Date.now() - t <= 7*86400000;
  });
  if (validPosts.length === 0) {
    container.innerHTML = '<div class="empty-state"><div class="empty-state-icon">🍃</div><p class="empty-state-text">暂无本周精选内容</p></div>';
    return;
  }

  container.innerHTML = validPosts.map(function(post) {
    return BT.renderWeeklyCard(post);
  }).join('');

  BT.initReveal();

})();
