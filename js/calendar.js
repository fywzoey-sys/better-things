/** V0.5 calendar helpers. No fabricated almanac, holiday or event information. */
(function(){
  'use strict';
  var tz='Asia/Shanghai';
  function parts(now,options){return new Intl.DateTimeFormat('zh-CN',Object.assign({timeZone:tz},options)).format(now);}
  BT.getCalendarInfo=function(now){
    now=now||new Date();
    var civil=parts(now,{year:'numeric',month:'long',day:'numeric',weekday:'long'});
    var lunar='', lunarDay=null, lunarMonth=null;
    try {
      lunar=parts(now,{calendar:'chinese',month:'long',day:'numeric'});
      var formatted=new Intl.DateTimeFormat('en-US-u-ca-chinese',{timeZone:tz,month:'numeric',day:'numeric'}).formatToParts(now);
      var dayPart=formatted.find(function(p){return p.type==='day';});
      var monthPart=formatted.find(function(p){return p.type==='month';});
      lunarDay=dayPart?Number(dayPart.value):null;
      lunarMonth=monthPart?monthPart.value:null;
    }catch(e){lunar='农历暂不可用';}
    var reminder=(lunarDay===1?'今日农历初一':lunarDay===15?'今日农历十五':'');
    return {civil:civil,lunar:lunar,lunarDay:lunarDay,lunarMonth:lunarMonth,reminder:reminder};
  };
  // Manually verified statutory holiday announcements may be inserted here in future.
  // Never infer statutory holiday arrangements from weekends or lunar dates.
  BT.HOLIDAY_NOTICES=[];
  BT.getApprovedHolidayNotices=function(){
    var today=new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
    return BT.HOLIDAY_NOTICES.filter(function(h){
      return h.approved===true && /^https:\/\//.test(h.sourceUrl||'') && h.startDate<=today && h.endDate>=today;
    });
  };
})();
