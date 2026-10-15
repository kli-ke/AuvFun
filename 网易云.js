var __NAME = "网易云音乐";
var __UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
/* 热门榜单（id 来自 /api/toplist 实测） */
var __TOPLIST = [
  { id:"19723756", title:"飙升榜" },
  { id:"3779629",  title:"新歌榜" },
  { id:"3778678",  title:"热歌榜" },
  { id:"2884035",  title:"原创榜" },
  { id:"71384707", title:"古典榜" },
  { id:"1978921795", title:"电音榜" }
];

function config(){
  return { kind:"video", browseOnly:false, title:__NAME };
}

function homeSections(){
  var secs=[];
  for(var i=0;i<__TOPLIST.length;i++){
    var t=__TOPLIST[i];
    var j=api("/api/playlist/detail?id="+t.id);
    var arr=songs(j);
    if(arr.length) secs.push({ title:t.title, items:arr.slice(0,10) });
  }
  return secs;
}

function categories(){
  var out=[];
  for(var i=0;i<__TOPLIST.length;i++) out.push({ key:__TOPLIST[i].id, title:__TOPLIST[i].title });
  return out;
}

function songs(j){
  var tracks=null;
  try{ var d=JSON.parse(j); tracks=(d.result||{}).tracks||[]; }catch(e){ return []; }
  if(!Array.isArray(tracks)) return [];
  var out=[];
  for(var i=0;i<tracks.length;i++){
    var s=tracks[i];
    var id=String(s.id||"");
    if(!id) continue;
    var arts=(s.artists||[]).map(function(a){return a.name;}).join("/")||"未知歌手";
    var cover=(s.album||{}).picUrl||(s.picUrl||"");
    out.push({ id:id, name:s.name||"", pic:String(cover||"").replace(/^http:/,"https:"), url:"https://music.163.com/#/song?id="+id, remarks:arts });
  }
  return out;
}

function search(kw,page){
  kw=String(kw||"").trim();
  if(!kw){ var h=homeSections(); var out=[]; for(var i=0;i<h.length;i++) out=out.concat(h[i].items); return out; }
  var j=api("/api/search/get/web?s="+encodeURIComponent(kw)+"&type=1&limit=30&offset="+((page||1)-1)*30);
  var arr=null;
  try{ arr=JSON.parse(j).result.songs; }catch(e){ return []; }
  if(!Array.isArray(arr)) return [];
  var out=[];
  for(var i=0;i<arr.length;i++){
    var s=arr[i];
    out.push({ id:String(s.id), name:s.name||"", pic:String(((s.album||{}).picUrl)||"").replace(/^http:/,"https:"), url:"https://music.163.com/#/song?id="+s.id, remarks:(s.artists||[]).map(function(a){return a.name;}).join("/")||"" });
  }
  return out;
}

function searchFiltered(category,filters,page){
  var j=api("/api/playlist/detail?id="+category);
  return songs(j).slice(0,20);
}

function detail(id){
  id=String(id||"").trim();
  var m=/(\d{5,})/.exec(id); if(m) id=m[1];
  if(!/^\d{5,}$/.test(id)) return null;
  var j=api("/api/song/detail/?id="+id+"&ids=%5B"+id+"%5D");
  var s=null;
  try{ var d=JSON.parse(j); s=(d.songs||[])[0]; }catch(e){ return null; }
  if(!s) return null;
  var cover=((s.album||{}).picUrl||s.picUrl||"");
  var arts=(s.artists||[]).map(function(a){return a.name;}).join("/")||"";
  var mins=Math.floor((s.duration||0)/60000);
  var secs=Math.floor(((s.duration||0)%60000)/1000);
  return { id:id, name:s.name||"", pic:String(cover).replace(/^http:/,"https:"), year:"", remarks:arts, desc:"专辑："+((s.album||{}).name||"")+" · 时长 "+mins+":"+(secs<10?"0":"")+secs, episodes:[{ name:"播放", flag:id, url:"https://music.163.com/#/song?id="+id }] };
}

function related(id){ return []; }

function play(flag){
  flag=String(flag||"").trim();
  var m=/(\d{5,})/.exec(flag); if(m) flag=m[1];
  if(!/^\d{5,}$/.test(flag)) return null;
  /* 取歌曲封面，塞进 play 返回（Auv 可能用 pic/poster/cover 做加载页/播放页封面） */
  var pic="";
  var j=api("/api/song/detail/?id="+flag+"&ids=%5B"+flag+"%5D");
  try{ var d=JSON.parse(j); var s=(d.songs||[])[0]; pic=String(((s.album||{}).picUrl)||"").replace(/^http:/,"https:"); }catch(e){}
  return { url:"http://music.163.com/song/media/outer/url?id="+flag+".mp3", type:"audio", pic:pic, poster:pic, cover:pic, referer:"https://music.163.com/", headers:{"User-Agent":__UA,"Referer":"https://music.163.com/"} };
}

function danmu(payload){ return null; }

/* ---- 内部工具（多引擎 fallback） ---- */
function api(path){
  var url="https://music.163.com"+path;
  var headers={"User-Agent":__UA,"Referer":"https://music.163.com/","Accept":"application/json, text/plain, */*"};
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
