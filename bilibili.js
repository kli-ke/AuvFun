var __NAME = "哔哩哔哩";
var __UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
/* rid 表已按 ranking 返回的 tname 实测校准（2026-10-12） */
var __RID = { "1":"首页", "119":"鬼畜", "181":"影视", "188":"数码", "3":"翻唱", "4":"手游", "5":"明星", "160":"亲子" };
/* 中文分类名 → rid 映射（Auv 分类 Tab 可能传中文标题，也可能传 key） */
var __MAP = { "首页":"1", "翻唱":"3", "手游":"4", "明星":"5", "鬼畜":"119", "亲子":"160", "影视":"181", "数码":"188" };

function config(){
  return { kind:"video", browseOnly:false, title:__NAME };
}

function homeSections(){
  var secs=[];
  var hot=api("/x/web-interface/popular?pn=1&ps=10");
  var hc=cards(hot,"data.list");
  if(hc.length) secs.push({ title:"全站热门", items:hc });
  for(var rid in __RID){
    var rk=api("/x/web-interface/ranking?rid="+rid+"");
    var rc=cards(rk,"data.list");
    if(rc.length) secs.push({ title:__RID[rid]+"排行", items:rc.slice(0,10) });
  }
  return secs;
}

function categories(){
  var out=[];
  for(var rid in __RID) out.push({ key:rid, title:__RID[rid] });
  return out;
}

function cards(j,path){
  var arr=null;
  try{ arr=path.split(".").reduce(function(o,k){ return o?o[k]:null; },JSON.parse(j)); }catch(e){ return []; }
  if(!Array.isArray(arr)) return [];
  var out=[];
  for(var i=0;i<arr.length;i++){
    var v=arr[i];
    var bvid=v.bvid||"";
    var t=String(v.title||v.name||"").replace(/<[^>]+>/g,"");
    if(!bvid) continue;
    out.push({ id:bvid, name:t, pic:(v.pic||"").replace(/^http:/,"https:"), url:"https://www.bilibili.com/video/"+bvid });
  }
  return out;
}

function search(kw,page){
  kw=String(kw||"").trim();
  var out=[];
  if(!kw){ var h=homeSections(); for(var i=0;i<h.length;i++) out=out.concat(h[i].items); return out; }
  /* Auv 可能用分类 key/title 调 search —— 命中分类时返回该分类内容 */
  if(__MAP[kw]||__RID[kw]) return searchFiltered(__MAP[kw]||kw,{},page);
  /* 搜索接口有风控(412)，用排行列表做关键词过滤兜底 */
  var rk=api("/x/web-interface/ranking?rid=0");
  var all=cards(rk,"data.list");
  for(var j=0;j<all.length;j++){ if(all[j].name.indexOf(kw)>=0) out.push(all[j]); }
  return out;
}

function searchFiltered(category,filters,page){
  category=String(category||"").trim();
  /* 中文名 → rid；数字 key 直传 */
  var rid=__MAP[category]||category;
  var rk=api("/x/web-interface/ranking?rid="+rid+"");
  return cards(rk,"data.list").slice(0,20);
}

function detail(id){
  id=String(id||"").trim();
  var bvid="";
  var m=/BV[0-9A-Za-z]+/.exec(id); if(m) bvid=m[0];
  if(!bvid) return null;
  var j=api("/x/web-interface/view?bvid="+bvid);
  var d=null; try{ d=JSON.parse(j).data; }catch(e){ return null; }
  if(!d) return null;
  var eps=[];
  var pages=d.pages||[];
  if(pages.length){
    for(var i=0;i<pages.length;i++){
      eps.push({ name:pages[i].part, flag:bvid+":"+pages[i].cid, url:"https://www.bilibili.com/video/"+bvid+"?p="+(i+1) });
    }
  } else {
    eps.push({ name:"观看/打开", flag:bvid+":"+d.cid, url:"https://www.bilibili.com/video/"+bvid });
  }
  var st=d.stat||{};
  return { id:bvid, name:d.title, pic:String(d.pic||"").replace(/^http:/,"https:"), year:String(d.pubdate||""), remarks:"B站 · 播放 "+st.view+" · 弹幕 "+st.danmaku, desc:d.desc||"", episodes:eps };
}

function related(id){ return []; }

function play(flag){
  flag=String(flag||"").trim();
  var bvid="", cid="";
  /* 兼容三种输入：BV号:cid / 纯BV号 / 完整URL(https://www.bilibili.com/video/BV...?p=N) */
  var m=/BV[0-9A-Za-z]+:(\d+)/.exec(flag);
  var m2=/(BV[0-9A-Za-z]+)/.exec(flag);
  var pn=/(?:[?&]p=)(\d+)/.exec(flag);
  if(m){ bvid=m[0].split(":")[0]; cid=m[1]; }
  else if(m2){
    bvid=m2[1];
    var j=api("/x/web-interface/view?bvid="+bvid);
    try{
      var d=JSON.parse(j).data;
      if(pn&&d.pages&&d.pages[+pn[1]-1]) cid=d.pages[+pn[1]-1].cid;
      else cid=d.cid;
    }catch(e){}
  }
  if(!bvid||!cid) return null;
  var pj=api("/x/player/playurl?bvid="+bvid+"&cid="+cid+"&qn=16&fnval=1");
  var url=null;
  try{ var pd=JSON.parse(pj); var dl=(pd.data||{}).durl||[]; if(dl.length) url=dl[0].url; }catch(e){}
  if(!url) return null;
  return { url:url, type:"auto", referer:"https://www.bilibili.com/", headers:{"User-Agent":__UA,"Referer":"https://www.bilibili.com/"} };
}

function danmu(payload){ return null; }

/* ---- 内部工具（多引擎 fallback） ---- */
function api(path){
  var url="https://api.bilibili.com"+path;
  var headers={"User-Agent":__UA,"Referer":"https://www.bilibili.com/","Accept":"application/json, text/plain, */*"};
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
  return raw||"";
}
