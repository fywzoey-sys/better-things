(function(){'use strict';
var state={notices:[],posts:[]};
var $=function(id){return document.getElementById(id);};
BT.PLACES.forEach(function(p){var o=document.createElement('option');o.value=p.id;o.textContent=p.name+' · '+p.id;$('place').appendChild(o);});
function update(){ $('counts').textContent='公告 '+state.notices.length+' 条 · 帖子 '+state.posts.length+' 条';$('preview').textContent=JSON.stringify(state,null,2).slice(0,4000); }
function https(v){try{return new URL(v).protocol==='https:';}catch(e){return false;}}
function date(v){return /^\d{4}-\d{2}-\d{2}$/.test(v);}
function error(s){$('message').textContent=s;}
$('file').addEventListener('change',function(e){var f=e.target.files[0];if(!f)return;f.text().then(function(t){var obj=JSON.parse(t);if(!Array.isArray(obj.notices)||!Array.isArray(obj.posts))throw Error('JSON 格式不正确');state={notices:obj.notices,posts:obj.posts};update();error('导入成功');}).catch(function(e){error(e.message);});});
$('addNotice').onclick=function(){var n={placeId:$('place').value,title:$('ntitle').value.trim(),content:$('ncontent').value.trim(),status:$('status').value,sourceUrl:$('nurl').value.trim(),publishedAt:$('published').value,verifiedAt:$('verified').value,approved:$('napproved').checked};if(!n.title||!n.content||!https(n.sourceUrl)||!date(n.publishedAt)||!date(n.verifiedAt)){error('请填写完整标题、内容、HTTPS 来源及日期');return;}state.notices.push(n);update();error('已加入本地列表，导出后才可发布');};
$('addPost').onclick=function(){var p={title:$('ptitle').value.trim(),platform:$('platform').value.trim(),sourceUrl:$('purl').value.trim(),date:$('pdate').value,approved:$('papproved').checked};if(!p.title||!https(p.sourceUrl)||!date(p.date)){error('请填写标题、HTTPS 链接和日期');return;}state.posts.push(p);update();error('已加入本地列表，导出后才可发布');};
$('download').onclick=function(){var blob=new Blob([JSON.stringify(state,null,2)+'\n'],{type:'application/json'});var url=URL.createObjectURL(blob);var a=document.createElement('a');a.href=url;a.download='reviewed-content.json';a.click();setTimeout(function(){URL.revokeObjectURL(url);},1000);error('已导出。请手动替换 data/reviewed-content.json 并重新部署');};update();
})();