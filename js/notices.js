/** Reviewed official notices only. Do not place unreviewed scraped data here. */
BT.NOTICES = [];
// Example schema (NOT an actual announcement):
// { placeId: 'sh-jing-an', title: '...', content: '...',
//   status: 'adjusted', sourceUrl: 'https://official.example/...',
//   publishedAt: 'YYYY-MM-DD', verifiedAt: 'YYYY-MM-DD', approved: true }

// Check publication/verification freshness; never infer open status from stale notices.
BT.noticeNeedsReview = function(notice, maxAgeDays) {
  if (!notice || !notice.approved || !notice.verifiedAt) return true;
  var time = Date.parse(notice.verifiedAt);
  return !Number.isFinite(time) || Date.now() - time > (maxAgeDays || 30)*86400000;
};

/** Published notices are reviewed, HTTPS-linked and recent enough for display. */
BT.getPublishableNotices=function(placeId){
  return (BT.NOTICES||[]).filter(function(n){
    return n.placeId===placeId && n.approved===true && /^https:\/\//.test(n.sourceUrl||'') &&
      n.publishedAt && n.verifiedAt && !BT.noticeNeedsReview(n,30);
  });
};
