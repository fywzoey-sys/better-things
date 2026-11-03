/** Live weather; no API key or GPS. City coordinates are approximate city centres. */
(function () {
  'use strict';
  var coords = { shanghai:[31.23,121.47,'上海'], beijing:[39.90,116.40,'北京'], hangzhou:[30.27,120.16,'杭州'] };
  var controller = null;
  var weatherCodes = {0:'晴',1:'大致晴朗',2:'局部多云',3:'阴',45:'有雾',48:'雾凇',51:'小毛毛雨',53:'毛毛雨',55:'较强毛毛雨',61:'小雨',63:'中雨',65:'大雨',71:'小雪',73:'中雪',75:'大雪',80:'阵雨',81:'较强阵雨',82:'强阵雨',95:'雷暴',96:'雷暴伴冰雹',99:'强雷暴伴冰雹'};
  var cache = {};
  function setText(id, value) { var el = document.getElementById(id); if (el) el.textContent = value; }
  BT.updateWeather = async function (city) {
    if (controller) controller.abort();
    if (!coords[city]) {
      setText('weatherTitle','请选择城市查看天气');
      setText('weatherDetails','选择上海、北京或杭州后自动更新');
      setText('weatherUpdated','数据来源：Open-Meteo · 仅供出行参考'); return;
    }
    var entry = coords[city], key = city;
    if (cache[key] && Date.now() - cache[key].time < 15 * 60 * 1000) { show(cache[key].data,entry); return; }
    controller = new AbortController();
    setText('weatherTitle',entry[2]+' · 正在获取天气…');
    setText('weatherDetails','请稍候');
    var url = 'https://api.open-meteo.com/v1/forecast?latitude='+entry[0]+'&longitude='+entry[1]+'&current=temperature_2m,weather_code,wind_speed_10m&daily=precipitation_probability_max,temperature_2m_max,temperature_2m_min&timezone=Asia%2FShanghai&forecast_days=1';
    try {
      var res = await fetch(url,{signal:controller.signal});
      if (!res.ok) throw Error('weather API '+res.status);
      var data = await res.json();
      if (!data.current || !data.daily) throw Error('missing data');
      cache[key]={time:Date.now(),data:data};
      show(data,entry);
    } catch (e) {
      if (e.name === 'AbortError') return;
      setText('weatherTitle',entry[2]+' · 天气暂不可用');
      setText('weatherDetails','请稍后重试；不影响地点浏览');
      setText('weatherUpdated','数据来源：Open-Meteo · 未获取到实时数据');
    }
  };
  function show(d,entry) {
    var c=d.current,day=d.daily;
    setText('weatherTitle',entry[2]+' · '+(weatherCodes[c.weather_code]||'天气信息'));
    setText('weatherDetails',Math.round(c.temperature_2m)+'°C · 今日 '+Math.round(day.temperature_2m_min[0])+'–'+Math.round(day.temperature_2m_max[0])+'°C · 降雨概率 '+day.precipitation_probability_max[0]+'% · 风速 '+Math.round(c.wind_speed_10m)+' km/h');
    setText('weatherUpdated','数据来源：Open-Meteo · 更新时间 '+(c.time||'未知')+'（北京时间） · 不代表地点开放状态');
  }
})();
