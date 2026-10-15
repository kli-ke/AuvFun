var __NAME = "AcFun 短视频";
var __UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";

/* 静态视频库（id 全部实测可播） */
var __VIDEOS = {
  "ac4492699": { id:"ac4492699", name:"【不齐舞团】《MAMBO》网红手势舞", cat:"舞蹈才艺", like:3907, comment:0, desc:"不齐舞团原创编舞，手势舞还能这样跳。", pic:"https://tx-free-imgs.acfun.cn/content/2018_07_31/1533003312.png?imageslim" },
  "ac4383214": { id:"ac4383214", name:"O-DOG战队的火影主题表演。很燃！", cat:"舞蹈才艺", like:8299, comment:0, desc:"O-DOG舞蹈室火影主题舞台表演，燃到炸。", pic:"https://tx-free-imgs.acfun.cn/content/2018_05_31/1527742753.png?imageslim" },
  "ac48362622": { id:"ac48362622", name:"鸣潮 西格莉卡 ダダダダダル", cat:"舞蹈才艺", like:209, comment:0, desc:"鸣潮西格莉卡3D舞蹈MV，初音未来曲目。", pic:"https://tx-free-imgs.acfun.cn/newUpload/19561109_d698d8bc7790415087b9b2767792711d.png?imageslim" },
  "ac3645348": { id:"ac3645348", name:"震惊！咋了爸爸高中男生版！", cat:"舞蹈才艺", like:1877, comment:0, desc:"高中男生翻跳咋了爸爸，三站联播爆笑。", pic:"https://tx-free-imgs.acfun.cn/content/2017_04_22/1492856821.png?imageslim" },
  "ac10219455": { id:"ac10219455", name:"【忧姬】勾指起誓*原创编舞", cat:"舞蹈才艺", like:9574, comment:0, desc:"忧姬宅舞原创编舞，洛天依音源。", pic:"https://tx-free-imgs.acfun.cn/FmN4xvF9BFrjY9svzL9pyliax5vz?imageslim" },
  "ac4576903": { id:"ac4576903", name:"【卧蚕】创造101主题曲 pick me up", cat:"舞蹈才艺", like:3364, comment:0, desc:"创造101主题曲pick me up舞蹈翻跳。", pic:"https://tx-free-imgs.acfun.cn/cms/2018_07_26/1532594664742.png?imageslim" },
  "ac48007581": { id:"ac48007581", name:"MOMOLAND Thumbs Up 跳舞机", cat:"舞蹈才艺", like:2716, comment:0, desc:"高跟KPOP韩舞翻跳，跳舞机画风。", pic:"https://tx-free-imgs.acfun.cn/newUpload/70122336_8a714e3894d24b3597e68227c0899350.png?imageslim" },
  "ac4192529": { id:"ac4192529", name:"【紫嘉儿+武体校友】Boa-Fox 大学校园清新舞蹈", cat:"舞蹈才艺", like:12210, comment:0, desc:"大学校园清新舞蹈，青春气息满满。", pic:"https://tx-free-imgs.acfun.cn/content/2018_01_15/1515995927.jpg?imageslim" },
  "ac3429808": { id:"ac3429808", name:"你不一定见过的 seve！鬼步舞！(视频合集)", cat:"舞蹈才艺", like:124661, comment:0, desc:"seve鬼步舞合集，你一定没见过。", pic:"https://tx-free-imgs.acfun.cn/content/2017_01_24/1485296871.gif?imageslim" },
  "ac2321839": { id:"ac2321839", name:"【帅炸天】能量爆棚的元气编舞(07)", cat:"舞蹈才艺", like:267613, comment:0, desc:"元气编舞系列：女王Funky Lia+腹肌May J Lee。", pic:"https://tx-free-imgs.acfun.cn/dotnet/artemis/u/cms/www/201511/11230516gub1q3f3.jpg?imageslim" },
  "ac48501456": { id:"ac48501456", name:"⚡️瓜 啊 瓜 啊⚡️ 鬼畜MV", cat:"鬼畜整活", like:218, comment:0, desc:"刘华强名场面鬼畜MV，原曲苏运莹《野子》。", pic:"https://tx-free-imgs.acfun.cn/newUpload/31148878_ad3a539e230d43109f0ef29955dddfbd.jpeg?imageslim" },
  "ac2320620": { id:"ac2320620", name:"【情侣恶作剧】世界最辣辣椒喂男友", cat:"鬼畜整活", like:0, comment:0, desc:"柚子木字幕组：印度鬼椒喂男友，爆笑恶作剧。", pic:"https://tx-free-imgs.acfun.cn/dotnet/artemis/u/cms/www/201511/11125238bcho5jgo.jpg?imageslim" },
  "ac27454": { id:"ac27454", name:"【MAD】这才是斯巴达！", cat:"鬼畜整活", like:189604, comment:0, desc:"镇站老MAD：这才是斯巴达！", pic:"https://tx-free-imgs.acfun.cn/dotnet/litimg/system/27454.jpg?imageslim" },
  "ac17678436": { id:"ac17678436", name:"【大司马】星之卡比 音MAD", cat:"鬼畜整活", like:3925, comment:0, desc:"大司马素材音MAD，星之卡比BGM。", pic:"https://tx-free-imgs.acfun.cn/o_1egv2428ot061tpf16jh1mcv11o20.jpeg?imageslim" },
  "ac48813049": { id:"ac48813049", name:"【音MAD/铁砧钢管P】铛 铛 铛", cat:"鬼畜整活", like:421, comment:0, desc:"钢管音MAD，镜音铃初音未来呐呐呐。", pic:"https://tx-free-imgs.acfun.cn/newUpload/77851402_1f2d34eeb954438ebd57ab96df21b8cf.png?imageslim" },
  "ac17443311": { id:"ac17443311", name:"【御宅制作/燃向MAD/艾克斯奥特曼】", cat:"鬼畜整活", like:1264, comment:0, desc:"艾克斯奥特曼燃向MAD，制作不易。", pic:"https://tx-free-imgs.acfun.cn/o_1eft64ams3cf1jmsorl1t37mik0.jpeg?imageslim" },
  "ac17383240": { id:"ac17383240", name:"明清帝王对话(8)：溥仪锯故宫门槛", cat:"搞笑配音", like:4991, comment:14, desc:"胥渡吧原创搞笑配音：溥仪与朱棣跨时空对话。", pic:"https://tx-free-imgs.acfun.cn/o_1efldgf1845a59j1gdn1i19jbr0.jpeg?imageslim" },
  "ac10332368": { id:"ac10332368", name:"机器人：其实我是西米露哒！", cat:"搞笑配音", like:4699, comment:0, desc:"经典机器人配音短剧，萌到爆炸。", pic:"https://tx-free-imgs.acfun.cn/Fprmi2XsygtNQFS-RXdn8JbE23k6?imageslim" },
  "ac4594105": { id:"ac4594105", name:"迪迪解说《刺客伍六七》", cat:"搞笑配音", like:116364, comment:0, desc:"国漫黑马刺客伍六七深度解说。", pic:"https://tx-free-imgs.acfun.cn/content/2018_09_19/1537349843.jpg?imageslim" },
  "ac47991862": { id:"ac47991862", name:"特厨探店|粤菜的另一座高山？！—炳胜", cat:"美食探店", like:14620, comment:109, desc:"特厨隋坡探店广州炳胜，粤菜天花板体验。", pic:"https://tx-free-imgs.acfun.cn/newUpload/76809532_2d2cf56035b94c5f9caf5b14bfc33a9f.jpeg?imageslim" },
  "ac4392283": { id:"ac4392283", name:"南瓜花开来一道：油炸南瓜花", cat:"美食探店", like:66618, comment:0, desc:"滇西小哥家常美食：油炸南瓜花。", pic:"https://tx-free-imgs.acfun.cn/content/2018_06_05/1528212272.png?imageslim" },
  "ac47957770": { id:"ac47957770", name:"饭店大厨考验：6个拿手菜", cat:"美食探店", like:3344, comment:0, desc:"老板娘考验大厨厨艺，红烧肉锅包大虾。", pic:"https://tx-free-imgs.acfun.cn/newUpload/33766833_8b7481e822d04baaa3b61711845712c5.jpeg?imageslim" },
  "ac15622769": { id:"ac15622769", name:"第一期 可可的历史和可可树", cat:"科普解说", like:235, comment:0, desc:"巧克力科普：可可的历史和可可树。", pic:"https://tx-free-imgs.acfun.cn/o_1e8l33jni15901d721suu1uq4p530.jpeg?imageslim" },
  "ac4942205": { id:"ac4942205", name:"18分钟解读刘慈欣《球状闪电》原著", cat:"科普解说", like:47041, comment:0, desc:"刘慈欣硬科幻代表作球状闪电深度解读。", pic:"https://tx-free-imgs.acfun.cn/Fo_tzWcXMDeG6oBGCVlT7Sa4pjFG?imageslim" },
  "ac3210748": { id:"ac3210748", name:"【声优百科】最受欢迎 钉宫理惠", cat:"科普解说", like:1461, comment:0, desc:"声优百科：最受欢迎的钉宫理惠。", pic:"https://tx-free-imgs.acfun.cn/content/2016_9_27/1477566491.png?imageslim" },
  "ac15335431": { id:"ac15335431", name:"《萤火之森》妖怪少年永远无法触碰心爱之人", cat:"科普解说", like:424, comment:0, desc:"萤火之森治愈解说，催泪向。", pic:"https://tx-free-imgs.acfun.cn/o_1e7hh2pq7239n4ar3s1hqb18o80.png?imageslim" },
  "ac22720543": { id:"ac22720543", name:"友宇豪【Minecraft】极限生存 第一集", cat:"游戏实况", like:161, comment:0, desc:"Minecraft 1.16.4极限生存第一集。", pic:"https://tx-free-imgs.acfun.cn/o_1eslftssq5kn1ubr5qeprr1rq40.png?imageslim" },
  "ac4634719": { id:"ac4634719", name:"【湾湾解说】LOL小组赛 G2 vs PVB", cat:"游戏实况", like:1169, comment:0, desc:"LOL小组赛G2 vs PVB精彩解说。", pic:"https://tx-free-imgs.acfun.cn/content/2018_9_11/1539255926.jpg?imageslim" },
  "ac4645528": { id:"ac4645528", name:"《极限竞速：地平线4》完美赛程 天蝎4K", cat:"游戏实况", like:1511, comment:0, desc:"地平线4福特VS特技摩托表演赛4K画面。", pic:"https://tx-free-imgs.acfun.cn/content/2018_9_15/1539613438.PNG?imageslim" },
  "ac16839570": { id:"ac16839570", name:"《我是陈震》第一集：二环的传说", cat:"游戏实况", like:0, comment:0, desc:"陈震聊二环传说与车圈故事。", pic:"https://tx-free-imgs.acfun.cn/o_1ed8i5fpl1hk01et01jog45213nu0.jpeg?imageslim" },
  "ac18582613": { id:"ac18582613", name:"【鬼灭之刃】无限列车篇 LiSA《炎》完整版", cat:"音乐动画", like:1480, comment:0, desc:"鬼灭之刃无限列车篇主题曲炎完整版。", pic:"https://tx-free-imgs.acfun.cn/o_1el2e90m9s218tt13dk8ur1a1p0.jpeg?imageslim" },
  "ac11824935": { id:"ac11824935", name:"【人生主次元】AcFun首支广告宣传片", cat:"音乐动画", like:180688, comment:912, desc:"AcFun官方宣传片：人生主次元。", pic:"https://tx-free-imgs.acfun.cn/Fg49aBBP8tcJJSr_2TYe6vXC_AIG?imageslim" },
  "ac3895592": { id:"ac3895592", name:"【木鱼微剧场】Legal High 精讲", cat:"音乐动画", like:0, comment:0, desc:"木鱼水心精讲《Legal High》胜者即是正义。", pic:"https://tx-free-imgs.acfun.cn/content/2017_08_03/1501733926.jpg?imageslim" },
};

function config(){
  return { kind:"video", browseOnly:false, title:__NAME };
}

function homeSections(){
  var cats=["鬼畜整活","舞蹈才艺","搞笑配音","美食探店","科普解说","游戏实况","音乐动画"];
  var secs=[];
  for(var i=0;i<cats.length;i++){
    var items=[];
    for(var k in __VIDEOS){
      if(__VIDEOS[k].cat===cats[i]) items.push(card(__VIDEOS[k]));
    }
    if(items.length) secs.push({ title:cats[i], items:items });
  }
  return secs;
}

function categories(){
  var cats=["鬼畜整活","舞蹈才艺","搞笑配音","美食探店","科普解说","游戏实况","音乐动画"];
  var out=[];
  for(var i=0;i<cats.length;i++) out.push({ key:cats[i], title:cats[i] });
  return out;
}

function card(v){
  return { id:v.id, name:v.name, pic:v.pic, url:"https://www.acfun.cn/v/"+v.id };
}

function search(kw,page){
  kw=String(kw||"").trim();
  var out=[];
  for(var k in __VIDEOS){
    var v=__VIDEOS[k];
    if(!kw || v.name.indexOf(kw)>=0 || v.cat.indexOf(kw)>=0 || v.desc.indexOf(kw)>=0) out.push(card(v));
  }
  return out;
}

function searchFiltered(category,filters,page){
  var out=[];
  for(var k in __VIDEOS){
    var v=__VIDEOS[k];
    if(!category || v.cat===category || category==="热门精选") out.push(card(v));
  }
  return out;
}

function detail(id){
  id=String(id||"").trim();
  var v=__VIDEOS[id];
  if(!v) return null;
  var page=__get("https://www.acfun.cn/v/"+id+"?rnd="+Date.now());
  if(!page) return { id:v.id, name:v.name, pic:v.pic, year:"", remarks:"AcFun", desc:v.desc, episodes:[{name:"观看/打开",flag:v.id,url:"https://www.acfun.cn/v/"+v.id}] };
  var title=null;
  var ogm=/(?:og:title|"title")\s*[:=]\s*["']([^"']{3,80})["']/.exec(page);
  var all=page.match(/"title":"([^"]{3,80})"/g)||[];
  for(var ti=0;ti<all.length;ti++){ var cand=all[ti].match(/"title":"([^"]+)/)[1]; if(!title||cand.length>title.length) title=cand; }
  if(ogm && ogm[1].length>(title?title.length:0)) title=ogm[1];
  if(!title) title=v.name;
  var pic=first(page,/(?:og:image|coverUrl)["']?\s*[:=]\s*["'](https?:\/\/[^"']+)["']/) || "";
  var like=v.like;
  var m=/(?:viewCount|watchNum)["']?\s*[:=]\s*["']?(\d+)/.exec(page); if(m) like=parseInt(m[1]);
  var comment=v.comment;
  m=/commentCount["']?\s*[:=]\s*["']?(\d+)/.exec(page); if(m) comment=parseInt(m[1]);
  return { id:v.id, name:title, pic:pic, year:"", remarks:"AcFun · 播放 "+like+" · 评论 "+comment, desc:(v.desc||"")+"\n数据来源：AcFun", episodes:[{name:"观看/打开",flag:v.id,url:"https://www.acfun.cn/v/"+v.id}] };
}

function related(id){ return []; }

function play(flag){
  flag=String(flag||"").trim();
  var id="";
  var m=/ac(\d+)/.exec(flag);
  if(m) id="ac"+m[1];
  else if(/^ac\d+$/.test(flag)) id=flag;
  if(!id || !__VIDEOS[id]) return null;
  var page=__get("https://www.acfun.cn/v/"+id+"?rnd="+Date.now());
  if(!page) return null;
  var urls=page.match(/https?:\/\/[^"'\s]+\.m3u8[^"'\s]*/g) || [];
  var clean=[];
  for(var i=0;i<urls.length;i++){ var u=urls[i].replace(/\\/g,""); if(clean.indexOf(u)<0) clean.push(u); }
  if(!clean.length) return null;
  var u=clean[0];
  return { url:u, type:"auto", referer:"https://www.acfun.cn/", headers:{"User-Agent":__UA,"Referer":"https://www.acfun.cn/"} };
}

function danmu(payload){ return null; }

/* ---- 内部工具（多引擎 fallback，兼容 Auv） ---- */
function __get(url){
  var headers={"User-Agent":__UA,"Referer":"https://www.acfun.cn/","Accept":"text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8"};
  var extract=function(r){
    if(!r) return "";
    if(typeof r==="string") return r;
    if(r.body){ if(typeof r.body==="string") return r.body; if(r.body.string){ try{ return r.body.string(); }catch(e){} } }
    if(r.content) return typeof r.content==="function"?r.content():r.content;
    if(r.text) return typeof r.text==="function"?r.text():r.text;
    if(r.data) return typeof r.data==="string"?r.data:JSON.stringify(r.data);
    return "";
  };
  var raw="";
  try{ if(typeof req==="function"){ raw=extract(req(url,headers)); } }catch(e){}
  if(!raw){ try{ if(typeof request==="function"){ raw=extract(request(url,{method:"GET",headers:headers,timeout:15000})); } }catch(e){} }
  if(!raw){ try{ if(typeof HTTP!=="undefined"&&HTTP.get){ raw=extract(HTTP.get(url,headers)); } }catch(e){} }
  if(!raw){ try{ if(typeof http!=="undefined"&&http.get){ raw=extract(http.get(url,headers)); } }catch(e){} }
  if(!raw){ try{ if(typeof $http!=="undefined"&&$http.get){ raw=extract($http.get(url,headers)); } }catch(e){} }
  if(!raw){ try{ if(typeof network!=="undefined"&&network.get){ raw=extract(network.get(url,headers)); } }catch(e){} }
  if(!raw){ try{ if(typeof fetch==="function"){ var f=fetch(url,{method:"GET",headers:headers,timeout:15000}); if(f&&f.body) raw=f.body; else if(f&&f.text) raw=typeof f.text==="function"?f.text():f.text; } }catch(e){} }
  return raw&&raw.length>1000 ? raw : null;
}
function first(s,re){
  var m=re.exec(s); return m?m[1]:null;
}
