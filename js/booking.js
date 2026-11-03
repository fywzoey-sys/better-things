/** Structured booking UI. Verification is editorial evidence, never inferred from URL shape. */
(function () {
  'use strict';
  var names = ['携程', '美团', '同程', '飞猪'];
  function text(v) { return typeof v === 'string' ? v.trim() : ''; }
  function safeUrl(value) {
    if (!text(value) || /[\s\\]/.test(value)) return '';
    try {
      var u = new URL(value);
      if (u.protocol !== 'https:' || u.username || u.password || !u.hostname.includes('.')) return '';
      return u.href;
    } catch (_) { return ''; }
  }
  function sourceUrl(record) { return safeUrl(record && record.source && record.source.url); }
  function verifiedLink(record, id, platform) {
    if (!record || record.status !== 'verified' || record.placeId !== id || !sourceUrl(record)) return '';
    var url = safeUrl(record.url);
    if (!url) return '';
    if (platform) {
      // Explicit place/product evidence plus a non-home, non-search destination.
      var u = new URL(url);
      if (record.pageType !== 'placeBooking' || !text(record.source.note) || u.pathname === '/' || /search|\/s\/?$|index\.(html?|php)$/i.test(u.pathname)) return '';
      var domains = {'携程':['ctrip.com','trip.com'],'美团':['meituan.com'],'同程':['ly.com'],'飞猪':['fliggy.com','alitrip.com']};
      if (!domains[platform].some(function(d){return u.hostname===d || u.hostname.endsWith('.'+d);})) return '';
    }
    return url;
  }
  BT.bookingSafeUrl = safeUrl;
  BT.bookingVerifiedLink = verifiedLink;
  BT.renderBookingInfo = function(place) {
    var bi = place.bookingInfo || {}, root = document.createElement('div');
    root.className = 'booking-info';
    function node(tag, cls, value, parent) {
      var el = document.createElement(tag); el.className = cls;
      if (value) el.textContent = value;
      (parent || root).appendChild(el); return el;
    }
    function group(title) { var g=node('div','booking-group');node('h3','booking-heading',title,g);return g; }
    function link(parent,label,url,cls){var a=node('a',cls,label,parent);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a;}
    node('h2','detail-label','预约与票务');
    var status = {normal:'正常开放',closed:'暂停开放',unknown:'待确认'};
    var g=group('开放状态');
    node('p','booking-status',status[bi.openStatus] || status.unknown,g);
    if(text(bi.openStatusNote)) node('p','detail-text',bi.openStatusNote,g);
    if(text(bi.openScheduleNote)) {
      var detail=node('details','booking-history','',g);
      node('summary','','已收录开放安排（非实时状态）',detail);
      node('p','detail-text',bi.openScheduleNote,detail);
    }
    g=group('官方预约');
    var official=bi.official || {}, url=verifiedLink(official,place.id);
    var evidence=!!sourceUrl(official) && !!text(official.source.note);
    if(url) link(g,'官方预约入口',url,'booking-official-link');
    else if(official.status==='not_required' && evidence) node('p','detail-text','无需预约',g);
    else if(official.status==='unavailable' && evidence) node('p','detail-text','官方预约入口不可用',g);
    else node('p','detail-text','官方预约入口待核实',g);
    if(text(official.note)) node('p','booking-note',official.note,g);
    if(text(official.bookingNote)) node('p','booking-note',official.bookingNote,g);
    if(text(bi.ticketNote)) node('p','detail-text mt-8','票务记录：'+bi.ticketNote,g);
    var entries=names.map(function(name){var record=(bi.platforms||{})[name];return {name:name,url:verifiedLink(record,place.id,name)};}).filter(function(x){return !!x.url;});
    if(entries.length){g=group('第三方预约平台');var grid=node('div','booking-platform-grid','',g);entries.forEach(function(e){var a=link(grid,e.name+' · 查看预约',e.url,'booking-platform-card');a.setAttribute('aria-label',e.name+'：'+place.name+'预约页面（新窗口）');});}
    if(text(bi.verifiedAt)) node('p','booking-date','核验日期：'+bi.verifiedAt);
    return root;
  };
})();
