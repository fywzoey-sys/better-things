/**
 * Better Things · 好运地图
 * 内容核验版 — 各地点信息按核验表记录；请留意每条记录的核验状态与备注。
 * Reviewed content draft — check each place verification status and notes.
 */

var BT = window.BT || {};

BT.CITIES = [
  { id: 'shanghai', name: '上海', emoji: '🏙' },
  { id: 'beijing',  name: '北京', emoji: '🏯' },
  { id: 'hangzhou', name: '杭州', emoji: '🌿' }
];

BT.WISHES = [
  { id: 'career',   name: '事业求职', icon: '💼', color: '#5B7D65' },
  { id: 'study',    name: '学业考试', icon: '📖', color: '#7A9E87' },
  { id: 'love',     name: '姻缘感情', icon: '💕', color: '#C27C7C' },
  { id: 'health',   name: '平安健康', icon: '🍀', color: '#6B9B78' }
];

BT.PLACES = [
  {
    "id": "sh-longhua",
    "city": "shanghai",
    "name": "龙华寺",
    "subtitle": "上海现存历史最悠久的佛寺之一",
    "wishes": [
      "career",
      "health"
    ],
    "cover": "",
    "description": "相传始建于三国吴赤乌年间，现存殿宇多为清同治、光绪年间重建；寺前龙华塔建于北宋太平兴国二年（977年），2006年作为宋代古建筑列入第六批全国重点文物保护单位。",
    "address": "上海市徐汇区龙华路2853号",
    "lat": 31.1754,
    "lng": 121.4494,
    "customs": [
      "入寺按单向顺时针行进",
      "外来香烛不得带入，只能在弥勒殿前大香炉焚烧",
      "绕塔顺时针三圈祈福（民间说法）",
      "初一、十五及春节香客极多，建议错峰",
      "殿内佛像不宜拍照，着装得体"
    ],
    "transport": "地铁11号线、12号线龙华站步行约3-5分钟；公交41、44、104、733、932路「龙华」站",
    "source": "玉巳纳福 上海龙华古寺二零二五乙巳年新春开放通告（寺方公众号）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（需现场确认）",
    "sourceUrl": "http://mp.weixin.qq.com/s?__biz=MjM5MzYxNzk1NA==&mid=2650961630&idx=1&sn=205135a424ecdf2e3659dceef47d1923",
    "verificationNote": "① 平日07:00-16:30未找到2026年官方单页，出行前查「上海龙华古寺」公众号；② 香期开门时间存在6:00/6:30两说；③ 请香价格为自愿消费，非门票。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "07:00-16:30；农历初一、十五香期提前开门（2022年官方通告为6:30，部分平台记6:00）⚠️；平日无需预约；除夕夜与正月初一需在「上海龙华古寺」微信服务号按时间段免费预约",
      "ticketNote": "免费入寺（寺方通告全年免费开放，2025年春节亦为免票入寺）；香烛自愿购买，自助请香约20元/组⚠️（价格可能调整）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-longhua",
        "source": {
          "url": "http://mp.weixin.qq.com/s?__biz=MjM5MzYxNzk1NA==&mid=2650961630&idx=1&sn=205135a424ecdf2e3659dceef47d1923",
          "label": "玉巳纳福 上海龙华古寺二零二五乙巳年新春开放通告（寺方公众号）",
          "note": "① 平日07:00-16:30未找到2026年官方单页，出行前查「上海龙华古寺」公众号；② 香期开门时间存在6:00/6:30两说；③ 请香价格为自愿消费，非门票。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-longhua",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-longhua",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-longhua",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-longhua",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "07:00-16:30；农历初一、十五香期提前开门（2022年官方通告为6:30，部分平台记6:00）⚠️；平日无需预约；除夕夜与正月初一需在「上海龙华古寺」微信服务号按时间段免费预约",
        "ticket": "免费入寺（寺方通告全年免费开放，2025年春节亦为免票入寺）；香烛自愿购买，自助请香约20元/组⚠️（价格可能调整）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "免费入寺（寺方通告全年免费开放，2025年春节亦为免票入寺）；香烛自愿购买，自助请香约20元/组⚠️（价格可能调整）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（需现场确认）",
        "source": {
          "url": "http://mp.weixin.qq.com/s?__biz=MjM5MzYxNzk1NA==&mid=2650961630&idx=1&sn=205135a424ecdf2e3659dceef47d1923",
          "label": "玉巳纳福 上海龙华古寺二零二五乙巳年新春开放通告（寺方公众号）",
          "note": "① 平日07:00-16:30未找到2026年官方单页，出行前查「上海龙华古寺」公众号；② 香期开门时间存在6:00/6:30两说；③ 请香价格为自愿消费，非门票。"
        }
      }
    }
  },
  {
    "id": "sh-jing-an",
    "city": "shanghai",
    "name": "静安寺",
    "subtitle": "闹中取静的千年古刹",
    "wishes": [
      "career",
      "health"
    ],
    "cover": "",
    "description": "相传始建于三国吴赤乌十年（247年），初名沪渎重玄寺，北宋大中祥符元年（1008年）改名静安寺，南宋嘉定九年（1216年）迁至今址；1983年被国务院列为汉族地区佛教全国重点寺院。",
    "address": "上海市静安区南京西路1686号",
    "lat": 31.2244,
    "lng": 121.4482,
    "customs": [
      "香花券已含三支清香，无需在门外另购高价香",
      "殿内拍摄不宜开闪光灯、勿扰他人礼佛",
      "初一、十五与佛诞日香客极多",
      "着装得体，勿穿背心短裤"
    ],
    "transport": "地铁2号线、7号线、14号线静安寺站（1、2、5号口出站即到）；公交20、37、57、921路「静安寺」站",
    "source": "2025年「必玩榜」榜单出炉 上海上榜17个（上海市文化和旅游局）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（需现场确认）",
    "sourceUrl": "https://cmp.whlyj.sh.gov.cn/CMP/tpr_traceInit.ac?tripId=a8c314d9e7614fb6ae53fada758da9c6",
    "verificationNote": "① 50元为2025年公示价，节假日另计，建议以「静安寺」公众号香花券请购页为准；② 停止入场时间与免票日为平台信息，非官方逐条公示。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "平日07:30-17:00；农历初一、十五香期04:30-17:00；约16:30停止入场⚠️；无需预约，现场购香花券",
      "ticketNote": "香花券50元/人（2025年上海市文旅局公示价，含3支清香）；初一、十五及部分佛诞日免票⚠️；春节等节假日票价上浮",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-jing-an",
        "source": {
          "url": "https://cmp.whlyj.sh.gov.cn/CMP/tpr_traceInit.ac?tripId=a8c314d9e7614fb6ae53fada758da9c6",
          "label": "2025年「必玩榜」榜单出炉 上海上榜17个（上海市文化和旅游局）",
          "note": "① 50元为2025年公示价，节假日另计，建议以「静安寺」公众号香花券请购页为准；② 停止入场时间与免票日为平台信息，非官方逐条公示。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-jing-an",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-jing-an",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-jing-an",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-jing-an",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "平日07:30-17:00；农历初一、十五香期04:30-17:00；约16:30停止入场⚠️；无需预约，现场购香花券",
        "ticket": "香花券50元/人（2025年上海市文旅局公示价，含3支清香）；初一、十五及部分佛诞日免票⚠️；春节等节假日票价上浮",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "香花券50元/人（2025年上海市文旅局公示价，含3支清香）；初一、十五及部分佛诞日免票⚠️；春节等节假日票价上浮",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（需现场确认）",
        "source": {
          "url": "https://cmp.whlyj.sh.gov.cn/CMP/tpr_traceInit.ac?tripId=a8c314d9e7614fb6ae53fada758da9c6",
          "label": "2025年「必玩榜」榜单出炉 上海上榜17个（上海市文化和旅游局）",
          "note": "① 50元为2025年公示价，节假日另计，建议以「静安寺」公众号香花券请购页为准；② 停止入场时间与免票日为平台信息，非官方逐条公示。"
        }
      }
    }
  },
  {
    "id": "sh-chenghuang",
    "city": "shanghai",
    "name": "城隍庙",
    "subtitle": "沪上香火最旺的道观",
    "wishes": [
      "career",
      "love",
      "health"
    ],
    "cover": "",
    "description": "始建于明永乐年间（1403-1424），由供奉汉代霍光的金山神庙（霍光行祠）改建而成，主祀上海县城隍秦裕伯；1995年恢复为道教正一派宫观。",
    "address": "上海市黄浦区方浜中路249号（豫园商城内）",
    "lat": 31.2271,
    "lng": 121.4924,
    "customs": [
      "庙方文明敬香，免费提供三支清香，谢绝自带香烛锡箔",
      "点燃的香火不得带入殿堂",
      "春节等高峰设临时单行路线",
      "衣着得体、殿内勿拍神像"
    ],
    "transport": "地铁10号线、14号线豫园站步行约5-8分钟；公交11、26、64路「新北门」站",
    "source": "上海城隍庙开放时间调整（上海市黄浦区人民政府，2025-04-25）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（票价需现场确认）",
    "sourceUrl": "https://www.shhuangpu.gov.cn/xw/001015/20250425/7311cc13-daa4-4f6b-ab9e-0ee03e89f0c9.html",
    "verificationNote": "① 官网仍写「每日8:30-16:30」，未同步2025年分季时间，以政府转载的庙方公告为准；② 10元香花券无官方公示页，需现场确认；③ 官网交通栏写「豫园路站步行12分钟」，实为「豫园」站且步行5-8分钟，需修正。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "分季开放：5月1日-9月30日 09:00-17:00；10月1日-次年4月30日 08:30-16:30；农历初一、十五 06:00起开放；全年无休，无需提前预约",
      "ticketNote": "香花券10元/人（2026年，含庙内三支清香）⚠️未在政府公告与官网公示；学生、60-69岁半价，70岁以上免票（以现场公示为准）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-chenghuang",
        "source": {
          "url": "https://www.shhuangpu.gov.cn/xw/001015/20250425/7311cc13-daa4-4f6b-ab9e-0ee03e89f0c9.html",
          "label": "上海城隍庙开放时间调整（上海市黄浦区人民政府，2025-04-25）",
          "note": "① 官网仍写「每日8:30-16:30」，未同步2025年分季时间，以政府转载的庙方公告为准；② 10元香花券无官方公示页，需现场确认；③ 官网交通栏写「豫园路站步行12分钟」，实为「豫园」站且步行5-8分钟，需修正。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-chenghuang",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-chenghuang",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-chenghuang",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-chenghuang",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "分季开放：5月1日-9月30日 09:00-17:00；10月1日-次年4月30日 08:30-16:30；农历初一、十五 06:00起开放；全年无休，无需提前预约",
        "ticket": "香花券10元/人（2026年，含庙内三支清香）⚠️未在政府公告与官网公示；学生、60-69岁半价，70岁以上免票（以现场公示为准）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "香花券10元/人（2026年，含庙内三支清香）⚠️未在政府公告与官网公示；学生、60-69岁半价，70岁以上免票（以现场公示为准）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（票价需现场确认）",
        "source": {
          "url": "https://www.shhuangpu.gov.cn/xw/001015/20250425/7311cc13-daa4-4f6b-ab9e-0ee03e89f0c9.html",
          "label": "上海城隍庙开放时间调整（上海市黄浦区人民政府，2025-04-25）",
          "note": "① 官网仍写「每日8:30-16:30」，未同步2025年分季时间，以政府转载的庙方公告为准；② 10元香花券无官方公示页，需现场确认；③ 官网交通栏写「豫园路站步行12分钟」，实为「豫园」站且步行5-8分钟，需修正。"
        }
      }
    }
  },
  {
    "id": "sh-yufo",
    "city": "shanghai",
    "name": "玉佛禅寺",
    "subtitle": "闹市中的清净道场",
    "wishes": [
      "study",
      "health"
    ],
    "cover": "",
    "description": "清光绪八年（1882年）普陀山慧根法师自缅甸请回玉佛，先于张华浜建茅蓬；1918年可成法师于槟榔路（今安远路）募建新寺，1928年建成迁入，改称玉佛禅寺。",
    "address": "上海市普陀区安远路170号",
    "lat": 31.2434,
    "lng": 121.4401,
    "customs": [
      "入寺不带荤腥（肉类及葱、蒜、韭等五辛）与烟酒",
      "佛像拍摄须殿堂无「请勿拍照」提示、不开闪光灯、不打扰他人",
      "初一、十五及法会日人多"
    ],
    "transport": "地铁13号线江宁路站3号口，沿江宁路步行约5分钟；寺内无对外停车位",
    "source": "上海玉佛禅寺官网（地址、开放时间与免香花券通告）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "已核实",
    "sourceUrl": "https://www.yufotemple.com/",
    "verificationNote": "① 初一、十五 07:00 开放来自寺方入寺须知（媒体转载），官网仅标8:00-16:30；② 春节等重大节日时间另行公告。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "全年08:00-16:30（16:30停止入寺，重大节日除外）；农历初一、十五 07:00-16:30⚠️；全年免香花券、无需预约",
      "ticketNote": "免费（2023年6月起实行免香花券入寺，寺方官网通告）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-yufo",
        "source": {
          "url": "https://www.yufotemple.com/",
          "label": "上海玉佛禅寺官网（地址、开放时间与免香花券通告）",
          "note": "① 初一、十五 07:00 开放来自寺方入寺须知（媒体转载），官网仅标8:00-16:30；② 春节等重大节日时间另行公告。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-yufo",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-yufo",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-yufo",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-yufo",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "全年08:00-16:30（16:30停止入寺，重大节日除外）；农历初一、十五 07:00-16:30⚠️；全年免香花券、无需预约",
        "ticket": "免费（2023年6月起实行免香花券入寺，寺方官网通告）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "免费（2023年6月起实行免香花券入寺，寺方官网通告）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "已核实",
        "source": {
          "url": "https://www.yufotemple.com/",
          "label": "上海玉佛禅寺官网（地址、开放时间与免香花券通告）",
          "note": "① 初一、十五 07:00 开放来自寺方入寺须知（媒体转载），官网仅标8:00-16:30；② 春节等重大节日时间另行公告。"
        }
      }
    }
  },
  {
    "id": "sh-confucius",
    "city": "shanghai",
    "name": "上海文庙",
    "subtitle": "上海中心城区的孔庙历史建筑（开放状态待确认）",
    "wishes": [
      "study"
    ],
    "cover": "",
    "description": "前身为元至元三十一年（1294年）设立的上海县学，清咸丰五年（1855年）于今址重建，是上海中心城区唯一「庙学合一」的孔庙建筑群；2002年列为上海市文物保护单位。",
    "address": "上海市黄浦区文庙路215号（近学前街）",
    "lat": 31.2192,
    "lng": 121.4894,
    "customs": [
      "历史上大成殿前挂满学子祈愿符，考试季家长与考生前来祈愿（民间说法）",
      "⚠️闭馆期间勿靠近施工围挡"
    ],
    "transport": "地铁8号线、10号线老西门站步行约8分钟；公交24、715、775、969路「老西门复兴东路」站",
    "source": "黄浦区人民政府对市政协十四届四次会议第0933号提案的答复（2026-04-28）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "开放状态待确认",
    "sourceUrl": "https://www.shhuangpu.gov.cn/zw/009001/009001015/009001015006/20260428/26671075-88be-4917-9f39-cc23b824aefa.html",
    "verificationNote": "⚠️ 高优先级：该点位当前很可能无法参访。上线前必须电话（021-63771815，闭馆前号码）或查「上海黄浦」公众号确认开放状态；若仍未开放，建议前端置灰并提示「改造中」。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "⚠️ 自2021年10月8日起闭馆实施改扩建，截至2026-11-02 是否重新开放无法确认（黄浦区2026年度物业招标文件载明「目前在装修改造，改造期间暂停对外开放」；区政府2026年4月答复仍在推进「文庙焕新开放」）",
      "ticketNote": "⚠️ 未知。闭馆前为10元（学生5元），重新开放后价格未公布",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-confucius",
        "source": {
          "url": "https://www.shhuangpu.gov.cn/zw/009001/009001015/009001015006/20260428/26671075-88be-4917-9f39-cc23b824aefa.html",
          "label": "黄浦区人民政府对市政协十四届四次会议第0933号提案的答复（2026-04-28）",
          "note": "⚠️ 高优先级：该点位当前很可能无法参访。上线前必须电话（021-63771815，闭馆前号码）或查「上海黄浦」公众号确认开放状态；若仍未开放，建议前端置灰并提示「改造中」。"
        },
        "note": "",
        "bookingNote": "改造/重新开放状态待确认；不展示预约或正常开放承诺"
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-confucius",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-confucius",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-confucius",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-confucius",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "⚠️ 自2021年10月8日起闭馆实施改扩建，截至2026-11-02 是否重新开放无法确认（黄浦区2026年度物业招标文件载明「目前在装修改造，改造期间暂停对外开放」；区政府2026年4月答复仍在推进「文庙焕新开放」）",
        "ticket": "⚠️ 未知。闭馆前为10元（学生5元），重新开放后价格未公布",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "改造/重新开放状态待确认；不展示预约或正常开放承诺",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "⚠️ 未知。闭馆前为10元（学生5元），重新开放后价格未公布",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "开放状态待确认",
        "source": {
          "url": "https://www.shhuangpu.gov.cn/zw/009001/009001015/009001015006/20260428/26671075-88be-4917-9f39-cc23b824aefa.html",
          "label": "黄浦区人民政府对市政协十四届四次会议第0933号提案的答复（2026-04-28）",
          "note": "⚠️ 高优先级：该点位当前很可能无法参访。上线前必须电话（021-63771815，闭馆前号码）或查「上海黄浦」公众号确认开放状态；若仍未开放，建议前端置灰并提示「改造中」。"
        }
      }
    }
  },
  {
    "id": "sh-donglin",
    "city": "shanghai",
    "name": "东林寺",
    "subtitle": "金山的元代码头古刹",
    "wishes": [
      "love",
      "health"
    ],
    "cover": "",
    "description": "始建于元至大元年（1308年），原名观音堂，元皇庆二年（1313年）仁宗赐额改称「东林禅寺」；1987年老大殿列为上海市文物保护单位，2005年扩建、2007年9月重新开放，现为国家4A级旅游景区。",
    "address": "上海市金山区朱泾镇东林街150号",
    "lat": 30.895,
    "lng": 121.1691,
    "customs": [
      "谢绝自带香烛，寺内提供免费环保香，只在广场指定区域点香，明火不得入殿",
      "圆通宝殿、观音阁内禁止拍摄佛像",
      "着装不露肩、不穿短裤短裙（观音阁可借围裙）"
    ],
    "transport": "无地铁直达：地铁1号线莲花路站换乘莲朱专线至朱泾汽车站步行约10分钟；金山铁路金山北站打车约10分钟；区内朱泾1、3、5路至东林寺站",
    "source": "旅游景区（上海市金山区人民政府，2020）+ 2025年12月元旦活动公告",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（票价体系冲突）",
    "sourceUrl": "https://www.jinshan.gov.cn/jsgk-rmsh/20201007/784852.html",
    "verificationNote": "① 30元为2020年旧价，2025年后多渠道称「入寺免费+联票20元」，需以「文旅金山」公众号订票页或021-57314019确认；② 停止入园时间两说，需统一。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "08:00-16:30（⚠️16:00 与 16:30 两种停止入园说法并存）；农历初一、十五 05:00-16:30；无需预约",
      "ticketNote": "入寺免费；观音阁+五佛冠联票20元/人（2025-12活动公告）；⚠️另有渠道与区政府2020年页面标「门票30元/人」，票价体系疑似已改为分景点售票，需现场确认",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "sh-donglin",
        "source": {
          "url": "https://www.jinshan.gov.cn/jsgk-rmsh/20201007/784852.html",
          "label": "旅游景区（上海市金山区人民政府，2020）+ 2025年12月元旦活动公告",
          "note": "① 30元为2020年旧价，2025年后多渠道称「入寺免费+联票20元」，需以「文旅金山」公众号订票页或021-57314019确认；② 停止入园时间两说，需统一。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-donglin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "sh-donglin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "sh-donglin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "sh-donglin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "08:00-16:30（⚠️16:00 与 16:30 两种停止入园说法并存）；农历初一、十五 05:00-16:30；无需预约",
        "ticket": "入寺免费；观音阁+五佛冠联票20元/人（2025-12活动公告）；⚠️另有渠道与区政府2020年页面标「门票30元/人」，票价体系疑似已改为分景点售票，需现场确认",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "入寺免费；观音阁+五佛冠联票20元/人（2025-12活动公告）；⚠️另有渠道与区政府2020年页面标「门票30元/人」，票价体系疑似已改为分景点售票，需现场确认",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（票价体系冲突）",
        "source": {
          "url": "https://www.jinshan.gov.cn/jsgk-rmsh/20201007/784852.html",
          "label": "旅游景区（上海市金山区人民政府，2020）+ 2025年12月元旦活动公告",
          "note": "① 30元为2020年旧价，2025年后多渠道称「入寺免费+联票20元」，需以「文旅金山」公众号订票页或021-57314019确认；② 停止入园时间两说，需统一。"
        }
      }
    }
  },
  {
    "id": "bj-yonghegong",
    "city": "beijing",
    "name": "雍和宫",
    "subtitle": "京城香火最旺的藏传佛教寺院",
    "wishes": [
      "career",
      "study",
      "health"
    ],
    "cover": "",
    "description": "清康熙三十三年（1694年）在此建雍亲王府，雍正三年（1725年）改为行宫称雍和宫，乾隆九年（1744年）改建为藏传佛教格鲁派寺院；1961年被国务院公布为第一批全国重点文物保护单位。",
    "address": "北京市东城区雍和宫大街28号⚠️（原表为12号，多个来源与地图数据均为28号，建议以官网/预约页复核）",
    "lat": 39.9477,
    "lng": 116.4175,
    "customs": [
      "寺内设免费赠香处，可用三支清香，禁止自带高香、殿内燃香",
      "按顺时针方向依次参拜",
      "殿内多禁止拍照",
      "农历初一、十五上午为例行法会，春节及初一、十五人流集中，官方提示错峰"
    ],
    "transport": "地铁2号线、5号线雍和宫站C口/F口出，步行约2-5分钟；公交13、116、117路「雍和宫」站",
    "source": "雍和宫参观须知（北京雍和宫官网）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（地址与周一安排需确认）",
    "sourceUrl": "https://www.yonghegong.cn/2021-03/13/content_77298987.htm",
    "verificationNote": "① 地址由「雍和宫大街12号」更正为「28号」，上线前请以预约页复核；② 周一开放情况来源冲突，需以官网最新须知确认；③ 官网须知页为2021年发布，票价25元另由多个2026年渠道印证。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "夏秋季（4月1日-10月31日）09:00-17:00，16:30停止入园；冬春季（11月1日-3月31日）09:00-16:30，16:00停止入园；⚠️周一是否闭馆各来源冲突（多数来源为「周一正常开放」，个别平台误传闭馆）；需实名预约购票",
      "ticketNote": "25元（半价12元；6周岁以下或1.2米以下儿童、残疾人、现役军人、离休干部等凭证免票）；预约渠道为公众号「雍和宫游客信众服务」，可提前7天",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-yonghegong",
        "source": {
          "url": "https://www.yonghegong.cn/2021-03/13/content_77298987.htm",
          "label": "雍和宫参观须知（北京雍和宫官网）",
          "note": "① 地址由「雍和宫大街12号」更正为「28号」，上线前请以预约页复核；② 周一开放情况来源冲突，需以官网最新须知确认；③ 官网须知页为2021年发布，票价25元另由多个2026年渠道印证。"
        },
        "note": "公众号「雍和宫游客信众服务」（当前链接与开放状态仍需核验）",
        "bookingNote": "实名预约购票；当前是否开放需以最新官方公告为准"
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-yonghegong",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-yonghegong",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-yonghegong",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-yonghegong",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "夏秋季（4月1日-10月31日）09:00-17:00，16:30停止入园；冬春季（11月1日-3月31日）09:00-16:30，16:00停止入园；⚠️周一是否闭馆各来源冲突（多数来源为「周一正常开放」，个别平台误传闭馆）；需实名预约购票",
        "ticket": "25元（半价12元；6周岁以下或1.2米以下儿童、残疾人、现役军人、离休干部等凭证免票）；预约渠道为公众号「雍和宫游客信众服务」，可提前7天",
        "bookingInfo": {
          "officialEntry": "公众号「雍和宫游客信众服务」（当前链接与开放状态仍需核验）",
          "bookingConclusion": "实名预约购票；当前是否开放需以最新官方公告为准",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "25元（半价12元；6周岁以下或1.2米以下儿童、残疾人、现役军人、离休干部等凭证免票）；预约渠道为公众号「雍和宫游客信众服务」，可提前7天",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（地址与周一安排需确认）",
        "source": {
          "url": "https://www.yonghegong.cn/2021-03/13/content_77298987.htm",
          "label": "雍和宫参观须知（北京雍和宫官网）",
          "note": "① 地址由「雍和宫大街12号」更正为「28号」，上线前请以预约页复核；② 周一开放情况来源冲突，需以官网最新须知确认；③ 官网须知页为2021年发布，票价25元另由多个2026年渠道印证。"
        }
      }
    }
  },
  {
    "id": "bj-tanzhe",
    "city": "beijing",
    "name": "潭柘寺",
    "subtitle": "先有潭柘寺，后有北京城",
    "wishes": [
      "career",
      "health"
    ],
    "cover": "",
    "description": "始建于西晋永嘉元年（307年），是北京地区最古老的佛寺之一，素有「先有潭柘寺，后有北京城」之说；2001年被列为第五批全国重点文物保护单位。",
    "address": "北京市门头沟区潭柘寺镇潭柘山下（潭柘寺景区）⚠️（该镇无门牌号，注册地址全称未在官方渠道查到）",
    "lat": 39.8912,
    "lng": 116.0447,
    "customs": [
      "寺内提供免费环保香，无需在山下购买高香",
      "龙王殿石鱼「哪痛摸哪」（民间说法）",
      "帝王树、配王树两株古银杏为祈福重点，秋季银杏季人流集中"
    ],
    "transport": "地铁S1线石厂站换乘931路直达潭柘寺站；或地铁6号线/11号线金安桥站换931路；节假日可在六里桥东乘通游专线21路",
    "source": "潭柘寺景区春节期间入园须知（潭柘寺风景区官方微信公众号）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（无独立官网）",
    "sourceUrl": "http://mp.weixin.qq.com/s?__biz=Mzk0OTc0OTE5NA==&mid=2247493093&idx=3&sn=aa2c74ac446b52a78da73030bd89dfe5",
    "verificationNote": "① 未检索到可访问的独立官网，信息以「潭柘寺风景区」公众号为准；② 所引为2026年春节专项公告，平日是否提前开园未核实；③ 建议补门头沟区文旅局页面作为第二来源。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "全年08:30-16:30，16:30停止检票；实行实名制分时预约；春节等节假日提前开园（2026年春节初一7:00、初五6:00），以景区公告为准",
      "ticketNote": "50元（学生、60-65岁半价25元；65岁以上、6周岁以下或1.2米以下免票）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-tanzhe",
        "source": {
          "url": "http://mp.weixin.qq.com/s?__biz=Mzk0OTc0OTE5NA==&mid=2247493093&idx=3&sn=aa2c74ac446b52a78da73030bd89dfe5",
          "label": "潭柘寺景区春节期间入园须知（潭柘寺风景区官方微信公众号）",
          "note": "① 未检索到可访问的独立官网，信息以「潭柘寺风景区」公众号为准；② 所引为2026年春节专项公告，平日是否提前开园未核实；③ 建议补门头沟区文旅局页面作为第二来源。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-tanzhe",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-tanzhe",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-tanzhe",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-tanzhe",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "全年08:30-16:30，16:30停止检票；实行实名制分时预约；春节等节假日提前开园（2026年春节初一7:00、初五6:00），以景区公告为准",
        "ticket": "50元（学生、60-65岁半价25元；65岁以上、6周岁以下或1.2米以下免票）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "50元（学生、60-65岁半价25元；65岁以上、6周岁以下或1.2米以下免票）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（无独立官网）",
        "source": {
          "url": "http://mp.weixin.qq.com/s?__biz=Mzk0OTc0OTE5NA==&mid=2247493093&idx=3&sn=aa2c74ac446b52a78da73030bd89dfe5",
          "label": "潭柘寺景区春节期间入园须知（潭柘寺风景区官方微信公众号）",
          "note": "① 未检索到可访问的独立官网，信息以「潭柘寺风景区」公众号为准；② 所引为2026年春节专项公告，平日是否提前开园未核实；③ 建议补门头沟区文旅局页面作为第二来源。"
        }
      }
    }
  },
  {
    "id": "bj-guozijian",
    "city": "beijing",
    "name": "国子监·孔庙",
    "subtitle": "元明清三代最高学府与祭孔场所",
    "wishes": [
      "study"
    ],
    "cover": "",
    "description": "孔庙始建于元大德六年（1302年），为元明清三代皇家祭孔场所；国子监始建于元至元二十四年（1287年），是元明清三代国家最高学府兼教育管理机构；1961年被列为第一批全国重点文物保护单位。",
    "address": "北京市东城区安定门内国子监街15号",
    "lat": 39.9476,
    "lng": 116.4132,
    "customs": [
      "此处不烧香，祭孔行四拜礼",
      "琉璃牌坊下石雕鳌头可摸，取「独占鳌头」之意（民间说法）",
      "辟雍池锦鲤常被投喂祈福（民间说法）",
      "每日10:00、14:00有免费讲解（以馆方当日安排为准）"
    ],
    "transport": "地铁2号线、5号线雍和宫站步行约700米；公交13、84路「国子监」站，104、108、113、124、141路「安定门内」站",
    "source": "参观须知（孔庙和国子监博物馆官网）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "已核实",
    "sourceUrl": "http://www.kmgzj.com/cgzn/index.aspx?nodeid=96",
    "verificationNote": "① 每周三免费名额的放票时间官网未写明；② 是否有展厅因修缮临时关闭，需查当期公告。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "09:00-17:00（16:30停止入馆）；每周一闭馆（法定节假日除外）；通过博物馆公众号「票务服务」购票，可购当日起3日内门票",
      "ticketNote": "30元（全日制本专科学生15元；60岁以上、18岁以下未成年人等凭证免票；每周三200名散客免费名额需提前在公众号申请）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-guozijian",
        "source": {
          "url": "http://www.kmgzj.com/cgzn/index.aspx?nodeid=96",
          "label": "参观须知（孔庙和国子监博物馆官网）",
          "note": "① 每周三免费名额的放票时间官网未写明；② 是否有展厅因修缮临时关闭，需查当期公告。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guozijian",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guozijian",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guozijian",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guozijian",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "09:00-17:00（16:30停止入馆）；每周一闭馆（法定节假日除外）；通过博物馆公众号「票务服务」购票，可购当日起3日内门票",
        "ticket": "30元（全日制本专科学生15元；60岁以上、18岁以下未成年人等凭证免票；每周三200名散客免费名额需提前在公众号申请）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "30元（全日制本专科学生15元；60岁以上、18岁以下未成年人等凭证免票；每周三200名散客免费名额需提前在公众号申请）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "已核实",
        "source": {
          "url": "http://www.kmgzj.com/cgzn/index.aspx?nodeid=96",
          "label": "参观须知（孔庙和国子监博物馆官网）",
          "note": "① 每周三免费名额的放票时间官网未写明；② 是否有展厅因修缮临时关闭，需查当期公告。"
        }
      }
    }
  },
  {
    "id": "bj-hongluosi",
    "city": "beijing",
    "name": "红螺寺",
    "subtitle": "京北千年古刹，秋日银杏与求姻缘胜地",
    "wishes": [
      "love",
      "health"
    ],
    "cover": "",
    "description": "始建于东晋（⚠️具体年份未在官方渠道核实），现存寺院依山而建、保留清代以前格局；以御竹林、雌雄银杏（树龄均逾1100年）、紫藤寄松「三绝景」著称，现为国家4A级旅游景区。",
    "address": "北京市怀柔区怀柔镇卢庄村北红螺东路2号",
    "lat": 40.3782,
    "lng": 116.636,
    "customs": [
      "三绝景为看点，千年雌雄银杏常系红绳祈福",
      "民间有到红螺寺祈求姻缘、家庭和顺的说法（民间说法）",
      "登山礼佛走观音路较平缓",
      "寺内提供免费香，不建议在山下购买高价大香"
    ],
    "transport": "地铁15号线后沙峪站换乘H57路直达；或东直门乘916快至怀柔汽车站换H57；867路红螺寺专线；自驾京承高速怀柔出口",
    "source": "综合报价（红螺寺景区官网）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（开放时间来源不一）",
    "sourceUrl": "http://hongluosi.com/?p=4523/",
    "verificationNote": "① 票价54元取自官网报价页，可信度高；② 开放时间冲突（17:00/17:30），出行前拨010-60681639确认；③ 「始建于东晋」为通行说法，具体年份缺官方出处。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "08:30-17:30，16:00停止入园⚠️（官网2022年公告与地图平台为08:30-17:00）；实行实名制分时预约",
      "ticketNote": "54元（半价27元：6-18周岁未成年人、全日制本科及以下、持老年证老人、现役军人等；6周岁以下或1.2米以下、残疾人、离休人员、65周岁及以上老人凭证免票）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-hongluosi",
        "source": {
          "url": "http://hongluosi.com/?p=4523/",
          "label": "综合报价（红螺寺景区官网）",
          "note": "① 票价54元取自官网报价页，可信度高；② 开放时间冲突（17:00/17:30），出行前拨010-60681639确认；③ 「始建于东晋」为通行说法，具体年份缺官方出处。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-hongluosi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-hongluosi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-hongluosi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-hongluosi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "08:30-17:30，16:00停止入园⚠️（官网2022年公告与地图平台为08:30-17:00）；实行实名制分时预约",
        "ticket": "54元（半价27元：6-18周岁未成年人、全日制本科及以下、持老年证老人、现役军人等；6周岁以下或1.2米以下、残疾人、离休人员、65周岁及以上老人凭证免票）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "54元（半价27元：6-18周岁未成年人、全日制本科及以下、持老年证老人、现役军人等；6周岁以下或1.2米以下、残疾人、离休人员、65周岁及以上老人凭证免票）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（开放时间来源不一）",
        "source": {
          "url": "http://hongluosi.com/?p=4523/",
          "label": "综合报价（红螺寺景区官网）",
          "note": "① 票价54元取自官网报价页，可信度高；② 开放时间冲突（17:00/17:30），出行前拨010-60681639确认；③ 「始建于东晋」为通行说法，具体年份缺官方出处。"
        }
      }
    }
  },
  {
    "id": "bj-guangji",
    "city": "beijing",
    "name": "广济寺",
    "subtitle": "中国佛教协会所在地",
    "wishes": [
      "career",
      "health"
    ],
    "cover": "",
    "description": "始建于金代，初名西刘村寺，明天顺元年（1457年）原址重建，明成化二年（1466年）宪宗赐名「弘慈广济寺」；1953年中国佛教协会成立会后址设于此；2006年作为清代古建筑列为第六批全国重点文物保护单位。",
    "address": "北京市西城区阜成门内大街25号",
    "lat": 39.9234,
    "lng": 116.3636,
    "customs": [
      "入口右手边设免费赠香处，可取一支或三支香",
      "殿内禁止拍照，衣着得体、保持安静",
      "此处为佛教协会驻地与僧人日常修行场所，不宜喧哗拥挤",
      "农历初一、十五及佛教节日法会期间人流较多"
    ],
    "transport": "地铁4号线西四站A口出，步行约200米；公交13、42、102、603、604、619路「西四路口西」站",
    "source": "北京广济寺（中国佛教协会官网·直属寺院）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（开放时间来源冲突）",
    "sourceUrl": "https://www.chinabuddhism.com.cn/web/details/53376",
    "verificationNote": "⚠️ 官网介绍页为2012年发布，仅含地址与沿革，无开放时间与票务信息；开放时间三说并存，建议电话010-66173330确认后再上线。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "⚠️ 各来源冲突：08:00-15:50（法会期间06:00起）、07:00-16:30、08:00-17:00 三种说法并存，需现场或电话确认",
      "ticketNote": "免费（未见强制预约要求，凭有效证件入寺）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-guangji",
        "source": {
          "url": "https://www.chinabuddhism.com.cn/web/details/53376",
          "label": "北京广济寺（中国佛教协会官网·直属寺院）",
          "note": "⚠️ 官网介绍页为2012年发布，仅含地址与沿革，无开放时间与票务信息；开放时间三说并存，建议电话010-66173330确认后再上线。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guangji",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guangji",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guangji",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-guangji",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "⚠️ 各来源冲突：08:00-15:50（法会期间06:00起）、07:00-16:30、08:00-17:00 三种说法并存，需现场或电话确认",
        "ticket": "免费（未见强制预约要求，凭有效证件入寺）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "免费（未见强制预约要求，凭有效证件入寺）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（开放时间来源冲突）",
        "source": {
          "url": "https://www.chinabuddhism.com.cn/web/details/53376",
          "label": "北京广济寺（中国佛教协会官网·直属寺院）",
          "note": "⚠️ 官网介绍页为2012年发布，仅含地址与沿革，无开放时间与票务信息；开放时间三说并存，建议电话010-66173330确认后再上线。"
        }
      }
    }
  },
  {
    "id": "bj-baiyun",
    "city": "beijing",
    "name": "白云观",
    "subtitle": "道教全真龙门派祖庭",
    "wishes": [
      "career",
      "love",
      "health"
    ],
    "cover": "",
    "description": "始建于唐开元二十七年（739年），金正大四年（1227年）丘处机逝世后弟子尹志平在长春宫东侧建道院，名「白云观」，明正统八年（1443年）正式定名并沿用；为道教全真龙门派祖庭，2001年列为第五批全国重点文物保护单位。",
    "address": "北京市西城区白云观街9号",
    "lat": 39.8962,
    "lng": 116.3397,
    "customs": [
      "山门斗拱东侧、山门西侧影壁、窝风桥东侧石碑基座各有一处石猴，摸石猴祈福为老北京习俗（民间说法）",
      "窝风桥下「打金钱眼」投铜钱，寓意财运亨通（民间说法）",
      "摸西院铜特对应部位可祛病（民间说法）",
      "行道教稽首礼或抱拳礼，不可双手合十",
      "不可自带香火，使用观内赠香，禁止焚烧纸钱",
      "殿内禁止拍照"
    ],
    "transport": "地铁1号线南礼士路站D2口步行约1.7公里（约20分钟）或骑行约10分钟；公交26、45、80、320路「白云观」站",
    "source": "漫说「国保」｜白云观：北京第一道观（北京文博·北京市文物局，2026-10-20）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "已核实",
    "sourceUrl": "https://www.toutiao.com/article/7698716518086902299/",
    "verificationNote": "① 旺季起止日期各来源略有差异（5月1日-9月30日 / 4月-10月）；② 春节期间庙会期间开放时间与限流另行公告；③ 建议把「北京文博」原文链接替换为市文物局官网原文地址。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "5月1日-9月30日 08:30-17:00，16:30停止入观；10月1日-次年4月30日 08:30-16:30，16:00停止入观；无网络售票，需到门口线下购票",
      "ticketNote": "10元（门口扫码或窗口购票；60岁以上老人及1.2米以下儿童免大门票⚠️免票年龄口径各来源有60/65岁差异）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-baiyun",
        "source": {
          "url": "https://www.toutiao.com/article/7698716518086902299/",
          "label": "漫说「国保」｜白云观：北京第一道观（北京文博·北京市文物局，2026-10-20）",
          "note": "① 旺季起止日期各来源略有差异（5月1日-9月30日 / 4月-10月）；② 春节期间庙会期间开放时间与限流另行公告；③ 建议把「北京文博」原文链接替换为市文物局官网原文地址。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-baiyun",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-baiyun",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-baiyun",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-baiyun",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "5月1日-9月30日 08:30-17:00，16:30停止入观；10月1日-次年4月30日 08:30-16:30，16:00停止入观；无网络售票，需到门口线下购票",
        "ticket": "10元（门口扫码或窗口购票；60岁以上老人及1.2米以下儿童免大门票⚠️免票年龄口径各来源有60/65岁差异）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "10元（门口扫码或窗口购票；60岁以上老人及1.2米以下儿童免大门票⚠️免票年龄口径各来源有60/65岁差异）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "已核实",
        "source": {
          "url": "https://www.toutiao.com/article/7698716518086902299/",
          "label": "漫说「国保」｜白云观：北京第一道观（北京文博·北京市文物局，2026-10-20）",
          "note": "① 旺季起止日期各来源略有差异（5月1日-9月30日 / 4月-10月）；② 春节期间庙会期间开放时间与限流另行公告；③ 建议把「北京文博」原文链接替换为市文物局官网原文地址。"
        }
      }
    }
  },
  {
    "id": "bj-wutasi",
    "city": "beijing",
    "name": "五塔寺",
    "subtitle": "明代金刚宝座塔，现为北京石刻艺术博物馆",
    "wishes": [
      "study",
      "health"
    ],
    "cover": "",
    "description": "明永乐年间建真觉寺，成化九年（1473年）建成金刚宝座塔，因塔顶五座小塔俗称五塔寺；1961年被列为第一批全国重点文物保护单位，1987年在此基础上成立北京石刻艺术博物馆。",
    "address": "北京市海淀区五塔寺路24号（北京石刻艺术博物馆）",
    "lat": 39.9425,
    "lng": 116.3335,
    "customs": [
      "金刚宝座塔为密檐式佛塔，绕塔礼佛按顺时针方向",
      "堂内及塔身石刻禁止触摸、拓印",
      "秋季古银杏与柿树为热门取景对象，官方提示文明拍照、勿攀折",
      "室内展厅禁止使用闪光灯"
    ],
    "transport": "地铁4号线、9号线、16号线国家图书馆站C口出，沿五塔寺路步行约500米路北；馆前及五塔寺路无停车位，建议公共交通",
    "source": "导览与服务 / 参观门票（北京石刻艺术博物馆官网）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "已核实",
    "sourceUrl": "https://bjstoneartmuseum.org.cn/CN/service/canguanmenpiao",
    "verificationNote": "① 官网票务页未标注更新日期；2023年公告曾要求全员实名分时段预约，现行是否仍需预约以公众号为准；② 每周三免费票放票时间「上一个星期三17:00」需复核。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "周二至周日09:00-17:00（16:30停止售票及入馆），周一闭馆（法定节假日安排另行公告）",
      "ticketNote": "20元（全日制本科及以下学生10元；未成年人、60岁以上老人、现役及退役军人、残疾人等凭证免票；每周三200名免费名额需在公众号/美团/大众点评提前预订）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "bj-wutasi",
        "source": {
          "url": "https://bjstoneartmuseum.org.cn/CN/service/canguanmenpiao",
          "label": "导览与服务 / 参观门票（北京石刻艺术博物馆官网）",
          "note": "① 官网票务页未标注更新日期；2023年公告曾要求全员实名分时段预约，现行是否仍需预约以公众号为准；② 每周三免费票放票时间「上一个星期三17:00」需复核。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-wutasi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "bj-wutasi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "bj-wutasi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "bj-wutasi",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "周二至周日09:00-17:00（16:30停止售票及入馆），周一闭馆（法定节假日安排另行公告）",
        "ticket": "20元（全日制本科及以下学生10元；未成年人、60岁以上老人、现役及退役军人、残疾人等凭证免票；每周三200名免费名额需在公众号/美团/大众点评提前预订）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "20元（全日制本科及以下学生10元；未成年人、60岁以上老人、现役及退役军人、残疾人等凭证免票；每周三200名免费名额需在公众号/美团/大众点评提前预订）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "已核实",
        "source": {
          "url": "https://bjstoneartmuseum.org.cn/CN/service/canguanmenpiao",
          "label": "导览与服务 / 参观门票（北京石刻艺术博物馆官网）",
          "note": "① 官网票务页未标注更新日期；2023年公告曾要求全员实名分时段预约，现行是否仍需预约以公众号为准；② 每周三免费票放票时间「上一个星期三17:00」需复核。"
        }
      }
    }
  },
  {
    "id": "hz-lingyin",
    "city": "hangzhou",
    "name": "灵隐寺",
    "subtitle": "东南佛国第一名刹（2025年12月起免票，需预约）",
    "wishes": [
      "career",
      "study",
      "health"
    ],
    "cover": "",
    "description": "始建于东晋咸和元年（326年），由印度僧人慧理创建，是杭州最早的佛教名刹；1983年被国务院确定为汉族地区佛教全国重点寺院，2011年作为「杭州西湖文化景观」组成部分列入《世界遗产名录》。",
    "address": "浙江省杭州市西湖区法云弄1号",
    "lat": 30.2406,
    "lng": 120.1005,
    "customs": [
      "寺院免费赠送清香三支，谢绝自带香烛入寺，敬香须在寺内指定地点",
      "殿内保持安静、不随意拍摄佛像，着装整洁得体",
      "预约分上下午场（上午7:30-12:00、下午12:00-17:00）"
    ],
    "transport": "地铁3号线黄龙洞站B口换505路至灵隐公交总站；地铁3号线东岳站D口换「城西公园-灵隐」专线；公交7路直达灵隐公交总站",
    "source": "杭州灵隐飞来峰景区预约游览须知（杭州灵隐寺官网）+ 央视网/中国日报2025-11、2025-12报道",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "已核实（2025-12 门票政策重大变更）",
    "sourceUrl": "https://lingyinsi.com/list_57_2.html",
    "verificationNote": "✅ 已更正：旧攻略的「两道票75元」已失效，务必改为「免票+实名预约」。① 开放时间另有7:00-17:30说法（杭州市佛协页面），以景区通告7:30为准；② 预约名额可能随客流调整，出行前查小程序公告。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "每日07:30-17:30，17:00停止入园；须至少提前1天通过「杭州灵隐飞来峰」小程序（支付宝/微信）实名预约，不接受当日预约",
      "ticketNote": "⚠️重大变更：自2025年12月1日起，灵隐飞来峰景区（含灵隐寺、永福寺、韬光寺）实行免票，灵隐寺香花券同步取消——原「飞来峰45元+香花券30元」合计75元，现为0元，仅需预约。每日限额：工作日3.5万、双休日5万、节假日6.5万",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-lingyin",
        "source": {
          "url": "https://lingyinsi.com/list_57_2.html",
          "label": "杭州灵隐飞来峰景区预约游览须知（杭州灵隐寺官网）+ 央视网/中国日报2025-11、2025-12报道",
          "note": "✅ 已更正：旧攻略的「两道票75元」已失效，务必改为「免票+实名预约」。① 开放时间另有7:00-17:30说法（杭州市佛协页面），以景区通告7:30为准；② 预约名额可能随客流调整，出行前查小程序公告。"
        },
        "note": "杭州灵隐飞来峰小程序（至少提前1天实名预约；按已收录公告）",
        "bookingNote": "免票预约；灵隐飞来峰景区预约覆盖灵隐寺，不能将第三方票务产品等同官方预约"
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-lingyin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-lingyin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-lingyin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-lingyin",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "每日07:30-17:30，17:00停止入园；须至少提前1天通过「杭州灵隐飞来峰」小程序（支付宝/微信）实名预约，不接受当日预约",
        "ticket": "⚠️重大变更：自2025年12月1日起，灵隐飞来峰景区（含灵隐寺、永福寺、韬光寺）实行免票，灵隐寺香花券同步取消——原「飞来峰45元+香花券30元」合计75元，现为0元，仅需预约。每日限额：工作日3.5万、双休日5万、节假日6.5万",
        "bookingInfo": {
          "officialEntry": "杭州灵隐飞来峰小程序（至少提前1天实名预约；按已收录公告）",
          "bookingConclusion": "免票预约；灵隐飞来峰景区预约覆盖灵隐寺，不能将第三方票务产品等同官方预约",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "⚠️重大变更：自2025年12月1日起，灵隐飞来峰景区（含灵隐寺、永福寺、韬光寺）实行免票，灵隐寺香花券同步取消——原「飞来峰45元+香花券30元」合计75元，现为0元，仅需预约。每日限额：工作日3.5万、双休日5万、节假日6.5万",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "已核实（2025-12 门票政策重大变更）",
        "source": {
          "url": "https://lingyinsi.com/list_57_2.html",
          "label": "杭州灵隐飞来峰景区预约游览须知（杭州灵隐寺官网）+ 央视网/中国日报2025-11、2025-12报道",
          "note": "✅ 已更正：旧攻略的「两道票75元」已失效，务必改为「免票+实名预约」。① 开放时间另有7:00-17:30说法（杭州市佛协页面），以景区通告7:30为准；② 预约名额可能随客流调整，出行前查小程序公告。"
        }
      }
    }
  },
  {
    "id": "hz-fajing",
    "city": "hangzhou",
    "name": "法喜寺",
    "subtitle": "天竺三寺之上天竺，求姻缘热门地",
    "wishes": [
      "love",
      "career"
    ],
    "cover": "",
    "description": "始建于后晋天福四年（939年），僧人道翊在白云峰下结庐，吴越王钱弘俶建「观音看经院」；南宋嘉定年间被评为教寺「五山之首」，清乾隆十六年（1751年）赐名「法喜寺」。",
    "address": "浙江省杭州市西湖区天竺路338号",
    "lat": 30.231,
    "lng": 120.1022,
    "customs": [
      "检票口可免费领取三支清香",
      "延续「天竺香市」进香传统，香客多按上、中、下天竺依次进香",
      "寺内摸墙壁刻字祈福为流传做法（民间说法）"
    ],
    "transport": "公交121、324M、103、1314、508H（假日龙井数字专线）至「上天竺」站步行约300米；附近无地铁站，最近为地铁3号线东岳站约3.9公里",
    "source": "上天竺法喜讲寺（杭州市佛教协会）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（开放时间来源不一）",
    "sourceUrl": "https://www.hzfjxh.com/art/231209/88002566",
    "verificationNote": "① 开放时间两说（6:00/6:30），建议以寺院现场公示为准；② 10元票价自2023年4月起执行，未取得2026年官方票价公示。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "每日06:30-18:00⚠️（杭州市佛教协会页面为06:00-18:00）；现场购票入寺，无需预约",
      "ticketNote": "10元（现场购票，含三支清香；持杭州寺院年票可刷卡入寺）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-fajing",
        "source": {
          "url": "https://www.hzfjxh.com/art/231209/88002566",
          "label": "上天竺法喜讲寺（杭州市佛教协会）",
          "note": "① 开放时间两说（6:00/6:30），建议以寺院现场公示为准；② 10元票价自2023年4月起执行，未取得2026年官方票价公示。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-fajing",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-fajing",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-fajing",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-fajing",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "每日06:30-18:00⚠️（杭州市佛教协会页面为06:00-18:00）；现场购票入寺，无需预约",
        "ticket": "10元（现场购票，含三支清香；持杭州寺院年票可刷卡入寺）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "10元（现场购票，含三支清香；持杭州寺院年票可刷卡入寺）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（开放时间来源不一）",
        "source": {
          "url": "https://www.hzfjxh.com/art/231209/88002566",
          "label": "上天竺法喜讲寺（杭州市佛教协会）",
          "note": "① 开放时间两说（6:00/6:30），建议以寺院现场公示为准；② 10元票价自2023年4月起执行，未取得2026年官方票价公示。"
        }
      }
    }
  },
  {
    "id": "hz-jingci",
    "city": "hangzhou",
    "name": "净慈寺",
    "subtitle": "南屏晚钟，西湖十景之一",
    "wishes": [
      "health",
      "study"
    ],
    "cover": "",
    "description": "始建于后周显德元年（954年），吴越王钱弘俶建「慧日永明院」，南宋列禅院「五山」之一；1983年被国务院确定为汉族地区佛教全国重点寺院；「南屏晚钟」为西湖十景之一。",
    "address": "浙江省杭州市西湖区南山路56号",
    "lat": 30.232,
    "lng": 120.148,
    "customs": [
      "除夕夜有撞钟祈福活动，钟声108响",
      "平日钟楼撞钟需另行付费（以现场公示为准）",
      "寺院免费赠清香三支，谢绝自带香烛"
    ],
    "transport": "公交4路、1314路、西湖内环线「净寺」站下车即到；地铁7号线吴山广场站转4路约2.5公里",
    "source": "杭州净慈寺（杭州市佛教协会）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（开放时间来源不一）",
    "sourceUrl": "https://hzfjxh.com/art/231209/33315960",
    "verificationNote": "① 开放时间两说（06:00-17:30 / 06:30-17:00），需现场确认；② 2026年春季大雄宝殿曾修缮，是否已完工未核实。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "每日06:30-17:00，16:45停止入场⚠️（杭州市佛教协会页面为06:00-17:30）；现场购票，无需预约",
      "ticketNote": "10元（现场购票，含三支清香；杭州寺院年票免费）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-jingci",
        "source": {
          "url": "https://hzfjxh.com/art/231209/33315960",
          "label": "杭州净慈寺（杭州市佛教协会）",
          "note": "① 开放时间两说（06:00-17:30 / 06:30-17:00），需现场确认；② 2026年春季大雄宝殿曾修缮，是否已完工未核实。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-jingci",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-jingci",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-jingci",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-jingci",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "每日06:30-17:00，16:45停止入场⚠️（杭州市佛教协会页面为06:00-17:30）；现场购票，无需预约",
        "ticket": "10元（现场购票，含三支清香；杭州寺院年票免费）",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "10元（现场购票，含三支清香；杭州寺院年票免费）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（开放时间来源不一）",
        "source": {
          "url": "https://hzfjxh.com/art/231209/33315960",
          "label": "杭州净慈寺（杭州市佛教协会）",
          "note": "① 开放时间两说（06:00-17:30 / 06:30-17:00），需现场确认；② 2026年春季大雄宝殿曾修缮，是否已完工未核实。"
        }
      }
    }
  },
  {
    "id": "hz-tianzhu",
    "city": "hangzhou",
    "name": "中天竺法净禅寺",
    "subtitle": "天竺三寺之一，位于稽留峰下的清幽古寺",
    "wishes": [
      "study",
      "career"
    ],
    "cover": "",
    "description": "中天竺法净禅寺，旧称中天竺寺，位于灵隐寺以南、天竺山稽留峰下。杭州市佛教协会资料记载，寺院始于隋开皇十七年（597年），由中印度高僧宝掌禅师创建；南宋评定「五山十刹」时，曾位列禅院十刹之首。清代乾隆年间改名为法净禅寺。",
    "address": "浙江省杭州市西湖区天竺路112号",
    "lat": 30.235,
    "lng": 120.1035,
    "customs": [
      "法净禅寺属于杭州天竺三寺之一，可与下天竺法镜讲寺、上天竺法喜讲寺安排在同一条天竺访寺路线中。",
      "寺院位于稽留峰下，周边山林环境清幽；参访时请遵守寺院现场礼仪与开放区域管理。",
      "网上关于游客数量、香品赠送及敬香规定的说法缺少足够的最新官方依据，本页不将其作为确定事实。"
    ],
    "transport": "公交103、121、324M、1314路至「中天竺」或「三天竺」站步行可达；无地铁直达，需从地铁3号线黄龙洞站或东岳站换乘公交",
    "source": "市属场所（中天竺法净禅寺）—杭州市佛教协会",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "基础历史资料已核对；开放时间、门票及预约政策待寺院确认",
    "sourceUrl": "https://www.hzfjxh.com/art/231209/30379888",
    "verificationNote": "已参考杭州市佛教协会《中天竺法净禅寺》介绍（2023-12-09）。该资料支持寺院沿革、地理位置及历史信息，但没有提供当前开放时间、门票和预约规则。第三方页面与旧资料对地址、开放时间的表述不完全一致，因此不将未经确认的时段、免费政策或游客数量写成事实。最近核验：2026-11-02。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "开放时间：目前公开资料存在不同说法，尚未取得可确认的最新寺院公告。出行前请先向寺院核实当日开放安排。",
      "ticketNote": "门票与预约：目前未取得足以确认日常票价、免费政策及预约要求的最新官方信息，暂不标注固定价格或「无需预约」。",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-tianzhu",
        "source": {
          "url": "https://www.hzfjxh.com/art/231209/30379888",
          "label": "市属场所（中天竺法净禅寺）—杭州市佛教协会",
          "note": "已参考杭州市佛教协会《中天竺法净禅寺》介绍（2023-12-09）。该资料支持寺院沿革、地理位置及历史信息，但没有提供当前开放时间、门票和预约规则。第三方页面与旧资料对地址、开放时间的表述不完全一致，因此不将未经确认的时段、免费政策或游客数量写成事实。最近核验：2026-11-02。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-tianzhu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-tianzhu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-tianzhu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-tianzhu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "开放时间：目前公开资料存在不同说法，尚未取得可确认的最新寺院公告。出行前请先向寺院核实当日开放安排。",
        "ticket": "门票与预约：目前未取得足以确认日常票价、免费政策及预约要求的最新官方信息，暂不标注固定价格或「无需预约」。",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "免费（日常开放，身份证登记）⚠️；春节等特殊时段临时在售票处购票，寺院年票不通用",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "基础历史资料已核对；开放时间、门票及预约政策待寺院确认",
        "source": {
          "url": "https://www.hzfjxh.com/art/231209/30379888",
          "label": "市属场所（中天竺法净禅寺）—杭州市佛教协会",
          "note": "已参考杭州市佛教协会《中天竺法净禅寺》介绍（2023-12-09）。该资料支持寺院沿革、地理位置及历史信息，但没有提供当前开放时间、门票和预约规则。第三方页面与旧资料对地址、开放时间的表述不完全一致，因此不将未经确认的时段、免费政策或游客数量写成事实。最近核验：2026-11-02。"
        }
      }
    }
  },
  {
    "id": "hz-yuelaomiao",
    "city": "hangzhou",
    "name": "黄龙洞圆缘民俗园·月老祠",
    "subtitle": "黄龙洞圆缘民俗园内的月老祠",
    "wishes": [
      "love"
    ],
    "cover": "",
    "description": "位于杭州黄龙洞圆缘民俗园内；月老祠为园区内祈愿点，园区门票不应误写成月老祠单独门票。具体祈愿设施开放情况以园区现场为准。",
    "address": "杭州市西湖区曙光路69号（黄龙洞圆缘民俗园）",
    "lat": 30.256,
    "lng": 120.14,
    "customs": [
      "祠门悬联「愿天下有情人，都成为眷属",
      "是前生注定事，莫错过姻缘」",
      "旧时祠内备诗签供求签卜姻缘，新中国成立后此俗渐消失",
      "园内投缘池掷铜钱、圆缘台挂同心锁为流传做法（民间说法）"
    ],
    "transport": "地铁3号线黄龙洞站C口步行约5分钟；公交16、28、87、103、282、318、505路「黄龙洞」站",
    "source": "一窗揽夏，黄龙洞夏日寻凉缘（杭州西湖风景名胜区管委会，2026）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "地点已修正；票务与开放需以园区最新公告核实",
    "sourceUrl": "https://westlake.hangzhou.gov.cn/col/col1639430/art/2026/art_e6932afc35d84c71bdf07f223c7c4b11.html",
    "verificationNote": "⚠️ 高优先级：现名称「月老祠（西湖白云庵）」会误导用户去雷峰塔一带扑空。建议二选一：① 改名为「月老祠（黄龙洞圆缘民俗园）」并更新坐标；② 若坚持保留白云庵历史点位，需在文案中明确「原址已不存」。；按用户确认，采用黄龙洞圆缘民俗园内现址，不再使用旧白云庵地址。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "每日07:30-17:30，17:00停止入园；随黄龙洞景区开放，无需单独预约",
      "ticketNote": "15元（黄龙洞圆缘民俗园门票，月老祠不另收费；杭州公园卡需补差价4元）",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-yuelaomiao",
        "source": {
          "url": "https://westlake.hangzhou.gov.cn/col/col1639430/art/2026/art_e6932afc35d84c71bdf07f223c7c4b11.html",
          "label": "一窗揽夏，黄龙洞夏日寻凉缘（杭州西湖风景名胜区管委会，2026）",
          "note": "⚠️ 高优先级：现名称「月老祠（西湖白云庵）」会误导用户去雷峰塔一带扑空。建议二选一：① 改名为「月老祠（黄龙洞圆缘民俗园）」并更新坐标；② 若坚持保留白云庵历史点位，需在文案中明确「原址已不存」。；按用户确认，采用黄龙洞圆缘民俗园内现址，不再使用旧白云庵地址。"
        },
        "note": "",
        "bookingNote": "园区门票与月老祠内部祈愿点分开描述"
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-yuelaomiao",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-yuelaomiao",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-yuelaomiao",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-yuelaomiao",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "每日07:30-17:30，17:00停止入园；随黄龙洞景区开放，无需单独预约",
        "ticket": "15元（黄龙洞圆缘民俗园门票，月老祠不另收费；杭州公园卡需补差价4元）",
        "bookingInfo": {
          "officialEntry": "待补园区官方入口",
          "bookingConclusion": "园区门票与月老祠内部祈愿点分开描述",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "15元（黄龙洞圆缘民俗园门票，月老祠不另收费；杭州公园卡需补差价4元）",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "地点已修正；票务与开放需以园区最新公告核实",
        "source": {
          "url": "https://westlake.hangzhou.gov.cn/col/col1639430/art/2026/art_e6932afc35d84c71bdf07f223c7c4b11.html",
          "label": "一窗揽夏，黄龙洞夏日寻凉缘（杭州西湖风景名胜区管委会，2026）",
          "note": "⚠️ 高优先级：现名称「月老祠（西湖白云庵）」会误导用户去雷峰塔一带扑空。建议二选一：① 改名为「月老祠（黄龙洞圆缘民俗园）」并更新坐标；② 若坚持保留白云庵历史点位，需在文案中明确「原址已不存」。；按用户确认，采用黄龙洞圆缘民俗园内现址，不再使用旧白云庵地址。"
        }
      }
    }
  },
  {
    "id": "hz-baopu",
    "city": "hangzhou",
    "name": "抱朴道院",
    "subtitle": "葛岭半山腰的道教宫观",
    "wishes": [
      "health",
      "career"
    ],
    "cover": "",
    "description": "东晋葛洪结庐炼丹之地，原名抱朴庐、葛仙庵，后以葛洪道号「抱朴子」改称抱朴道院；1983年被列为全国21座道教重点宫观之一，2011年随西湖列入《世界遗产名录》。",
    "address": "浙江省杭州市西湖区葛岭路28号（葛岭半山腰）",
    "lat": 30.258,
    "lng": 120.141,
    "customs": [
      "道教宫观，进殿保持安静、不随意拍摄神像，香烛在指定香炉焚烧",
      "农历十月初一在初阳台观「日月并升」为流传说法（民间说法）"
    ],
    "transport": "公交7、27、277、WE1314路、西湖内环线「葛岭」站步行约500米上山；地铁1号线凤起路站、2号线武林门站出站后换乘公交",
    "source": "面朝西湖水，隐于葛岭中，杭州千年古迹抱朴道院你去过吗？（杭州网，2025-08）",
    "verifiedAt": "2026-11-02",
    "verificationStatus": "部分核实（无官方页面）",
    "sourceUrl": "https://hznews.hangzhou.com.cn/chengshi/content/2025-08/02/content_9052255_0.htm",
    "verificationNote": "① 未找到道院官网或道教协会公示页，需补官方来源；② 5元票价为2025年8月媒体报道，可能调整；③ 需步行上山，石阶较多，前端可提示「建议平底鞋」。",
    "bookingInfo": {
      "schemaVersion": 1,
      "openStatus": "unknown",
      "openStatusNote": "尚无足以确认当前开放状态的有效官方记录；请以最新官方通知为准。",
      "openScheduleNote": "每日08:00-17:00，16:30停止入园⚠️（百科记8:30-17:00）",
      "ticketNote": "5元⚠️（2025年8月杭州网报道；杭州寺庙年卡可刷卡进入），建议现场确认",
      "official": {
        "status": "pending",
        "url": "",
        "placeId": "hz-baopu",
        "source": {
          "url": "https://hznews.hangzhou.com.cn/chengshi/content/2025-08/02/content_9052255_0.htm",
          "label": "面朝西湖水，隐于葛岭中，杭州千年古迹抱朴道院你去过吗？（杭州网，2025-08）",
          "note": "① 未找到道院官网或道教协会公示页，需补官方来源；② 5元票价为2025年8月媒体报道，可能调整；③ 需步行上山，石阶较多，前端可提示「建议平底鞋」。"
        },
        "note": "",
        "bookingNote": ""
      },
      "platforms": {
        "携程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-baopu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "美团": {
          "status": "pending",
          "url": "",
          "placeId": "hz-baopu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "同程": {
          "status": "pending",
          "url": "",
          "placeId": "hz-baopu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        },
        "飞猪": {
          "status": "pending",
          "url": "",
          "placeId": "hz-baopu",
          "pageType": "",
          "source": {},
          "note": "未取得可核实的当前预约产品链接；不得推断为无预约"
        }
      },
      "verifiedAt": "2026-11-02",
      "originalText": {
        "openInfo": "每日08:00-17:00，16:30停止入园⚠️（百科记8:30-17:00）",
        "ticket": "5元⚠️（2025年8月杭州网报道；杭州寺庙年卡可刷卡进入），建议现场确认",
        "bookingInfo": {
          "officialEntry": "待补官方预约入口",
          "bookingConclusion": "仅按当前表格记录展示；动态库存需用户点击平台实时查看",
          "platforms": {
            "携程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "美团": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "同程": "未取得可核实的当前预约产品链接；不得推断为无预约",
            "飞猪": "未取得可核实的当前预约产品链接；不得推断为无预约"
          },
          "priceConclusion": "5元⚠️（2025年8月杭州网报道；杭州寺庙年卡可刷卡进入），建议现场确认",
          "checkedAt": "2026-11-02",
          "publishAdvice": "信息未获充分核实时仅显示待核实，不宣称实时库存"
        },
        "verificationStatus": "部分核实（无官方页面）",
        "source": {
          "url": "https://hznews.hangzhou.com.cn/chengshi/content/2025-08/02/content_9052255_0.htm",
          "label": "面朝西湖水，隐于葛岭中，杭州千年古迹抱朴道院你去过吗？（杭州网，2025-08）",
          "note": "① 未找到道院官网或道教协会公示页，需补官方来源；② 5元票价为2025年8月媒体报道，可能调整；③ 需步行上山，石阶较多，前端可提示「建议平底鞋」。"
        }
      }
    }
  }
];

BT.WEEKLY_POSTS = []; // 真实帖子经人工审核并补充原文链接后再发布。
BT.ALMANAC_PLACEHOLDER = {
  note: '黄历宜忌尚未接入有明确授权的数据源，暂不展示宜忌内容。',
  mock: null
};
BT.TRAVEL_TIPS = [];

BT.NOTICES = [
  {
    "id": "notice-hz-lingyin-20251119",
    "placeId": "hz-lingyin",
    "status": "adjusted",
    "title": "灵隐飞来峰景区（含灵隐寺）免票及实名预约安排",
    "content": "根据核验表记录：自2025年12月1日起实行免票并需至少提前1天实名预约。每日预约限额及开放时间可能调整，出行前请以官方预约小程序最新公告为准。",
    "sourceUrl": "https://lingyinsi.com/list_57_2.html",
    "publishedAt": "2025-11-19",
    "verifiedAt": "2026-11-02",
    "approved": true,
    "verificationNote": "按用户核验表录入；发布前仍建议复查预约入口和当日名额。"
  }
];
BT.getPublishableNotices = function(placeId) {
  var now = new Date();
  return BT.NOTICES.filter(function(n) {
    if (n.placeId !== placeId || n.approved !== true || !n.sourceUrl) return false;
    var checked = new Date(n.verifiedAt + 'T00:00:00+08:00');
    return !isNaN(checked.getTime()) && (now - checked) <= 180 * 86400000;
  });
};

// ═══════════ 辅助函数 ═══════════
BT.getPlaceById = function(id) {
  for (var i = 0; i < BT.PLACES.length; i++) {
    if (BT.PLACES[i].id === id) return BT.PLACES[i];
  }
  return null;
};

BT.getPlacesByCity = function(cityId) {
  return BT.PLACES.filter(function(p) { return p.city === cityId; });
};

BT.getPlacesByWish = function(wishId) {
  return BT.PLACES.filter(function(p) { return p.wishes.indexOf(wishId) >= 0; });
};

BT.filterPlaces = function(cityId, wishId) {
  return BT.PLACES.filter(function(p) {
    var cityMatch = !cityId || cityId === 'all' || p.city === cityId;
    var wishMatch = !wishId || wishId === 'all' || p.wishes.indexOf(wishId) >= 0;
    return cityMatch && wishMatch;
  });
};

BT.getCityName = function(cityId) {
  for (var i = 0; i < BT.CITIES.length; i++) {
    if (BT.CITIES[i].id === cityId) return BT.CITIES[i].name;
  }
  return '';
};

BT.getWishName = function(wishId) {
  for (var i = 0; i < BT.WISHES.length; i++) {
    if (BT.WISHES[i].id === wishId) return BT.WISHES[i].name;
  }
  return '';
};

BT.getWishIcon = function(wishId) {
  for (var i = 0; i < BT.WISHES.length; i++) {
    if (BT.WISHES[i].id === wishId) return BT.WISHES[i].icon;
  }
  return '';
};

window.BT = BT;
