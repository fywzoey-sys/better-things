/** Public reviewed content. Static JSON is the only publish channel. */
(function(){
  'use strict';
  function validLink(url){try {var u=new URL(url);return u.protocol==='https:';}catch(e){return false;}}
  BT.loadReviewedContent=function(){
    return fetch('data/reviewed-content.json',{cache:'no-store'}).then(function(r){if(!r.ok)throw Error('HTTP '+r.status);return r.json();}).then(function(data){
      var notices=Array.isArray(data.notices)?data.notices:[];
      var posts=Array.isArray(data.posts)?data.posts:[];
      BT.NOTICES=notices.filter(function(n){return n && n.approved===true && validLink(n.sourceUrl) && typeof n.placeId==='string' && typeof n.title==='string' && typeof n.verifiedAt==='string' && typeof n.publishedAt==='string';});
      BT.WEEKLY_POSTS=posts.filter(function(p){return p && p.approved===true && validLink(p.sourceUrl) && typeof p.date==='string';});
      return true;
    }).catch(function(e){console.warn('审核内容尚未加载:',e.message);return false;});
  };
})();
