const fs=require('fs'),vm=require('vm'),assert=require('assert'),path=require('path');
const root=path.join(__dirname,'..');
class E{constructor(t){this.tag=t;this.children=[];this.textContent='';this.style={}}appendChild(e){this.children.push(e);return e}setAttribute(){}addEventListener(){} }
const c={window:{},URL,console,document:{createElement:t=>new E(t)}};vm.createContext(c);
for(const f of ['data','booking'])vm.runInContext(fs.readFileSync(path.join(root,'js',f+'.js'),'utf8'),c);
const BT=c.BT;function flatten(e){return [e,...e.children.flatMap(flatten)]}function links(p){return flatten(BT.renderBookingInfo(p)).filter(e=>e.tag==='a')}function content(p){return flatten(BT.renderBookingInfo(p)).map(e=>e.textContent).join('|')}
const rec=(url)=>({status:'verified',url,placeId:'test',pageType:'placeBooking',source:{url:'https://official.example/notice',note:'独立测试样例，当前地点预约产品核验依据'}});
let tests=0;function check(fn){fn();tests++}
const fixture=()=>({id:'test',name:'测试地点',bookingInfo:{openStatus:'normal',openStatusNote:'测试状态',official:rec('https://official.example/book/test'),platforms:{},verifiedAt:'2026-11-02'}});
check(()=>{let p=fixture();assert(content(p).includes('正常开放'));assert.equal(links(p).length,1)});
check(()=>{let p=fixture();p.bookingInfo={openStatus:'closed'};assert(content(p).includes('暂停开放'));assert.equal(links(p).length,0)});
check(()=>{assert(content({id:'old'}).includes('待确认'));assert(!/undefined|null/.test(content({id:'old'})))});
check(()=>{let p=fixture();p.bookingInfo.platforms={'携程':rec('https://m.ctrip.com/tickets/123')};assert.equal(links(p).length,2)});
check(()=>{let p=fixture();p.bookingInfo.platforms=Object.fromEntries([['携程','ctrip.com'],['美团','meituan.com'],['同程','ly.com'],['飞猪','fliggy.com']].map(([n,d])=>[n,rec('https://'+d+'/tickets/123')]));assert.equal(links(p).length,5)});
check(()=>{let p=fixture();delete p.bookingInfo.verifiedAt;assert(!content(p).includes('核验日期'))});
for(const url of ['javascript:alert(1)','data:text/html,bad','http://ctrip.com/ticket','https://user:pass@ctrip.com/a','https://ctrip.com/','https://ctrip.com/search?q=place','https://evil.example/ticket','https://ctrip.com\\@evil.example/ticket'])check(()=>{let p=fixture();p.bookingInfo.platforms={'携程':rec(url)};assert.equal(links(p).length,1)});
for(const status of ['pending','unavailable'])check(()=>{let p=fixture();p.bookingInfo.platforms={'携程':{...rec('https://ctrip.com/tickets/1'),status}};assert.equal(links(p).length,1)});
check(()=>{let p=fixture();p.bookingInfo.platforms={'携程':{...rec('https://ctrip.com/tickets/1'),placeId:'wrong'}};assert.equal(links(p).length,1)});
for(const status of ['not_required','unavailable'])check(()=>{let p=fixture();p.bookingInfo.official={...rec(''),status};assert(content(p).includes(status==='not_required'?'无需预约':'官方预约入口不可用'))});
for(const p of BT.PLACES)check(()=>{assert(['normal','closed','unknown'].includes(p.bookingInfo.openStatus));assert.equal(links(p).length,0);assert(!content(p).includes('第三方预约平台'));assert(!/undefined|null/.test(content(p)));assert(p.bookingInfo.originalText.bookingInfo);assert.equal(p.bookingInfo.verifiedAt,p.bookingInfo.originalText.bookingInfo.checkedAt)});
// Existing shared filtering, local favorites and map behavior: execute actual scripts.
let store={};c.localStorage={getItem:k=>store[k]||null,setItem:(k,v)=>store[k]=v};
vm.runInContext(fs.readFileSync(path.join(root,'js/app.js'),'utf8'),c);
check(()=>{assert(BT.toggleFavorite(BT.PLACES[0].id));assert(BT.isFavorite(BT.PLACES[0].id));BT.toggleFavorite(BT.PLACES[0].id);assert(!BT.isFavorite(BT.PLACES[0].id))});
check(()=>{assert.equal(BT.getPlaceById(BT.PLACES[0].id).id,BT.PLACES[0].id);assert(BT.filterPlaces('shanghai','').every(p=>p.city==='shanghai'));assert(BT.renderPlaceCard(BT.PLACES[0]).includes('place.html?id='+BT.PLACES[0].id))});
for(const p of BT.PLACES){const els={};c.document.getElementById=id=>els[id]||(els[id]=new E('div'));BT.getParam=()=>p.id;BT.getPublishableNotices=()=>[];BT.initReveal=()=>{};c.window.open=(url)=>{c.lastMap=url};vm.runInContext(fs.readFileSync(path.join(root,'js/place.js'),'utf8'),c);check(()=>{assert(els.bookingInfo.children.length);c.window.openMap();assert(c.lastMap.includes(p.lng+','+p.lat));assert.equal(els.placeDesc.textContent,p.description)})}
console.log(tests+' assertions/scenarios passed; browser rendering not tested.');
