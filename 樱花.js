var __BASE="https://www.yinhuadm.xyz";
var __API=__BASE+"/api.php/provide/vod/";
var __UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36";

function config(){
  return { kind:"video", browseOnly:false, title:"樱花动漫" };
}

function homeSections(){
  return [
    { title:"最新更新", items:apiList(1) },
    { title:"国产动漫", items:catList(9) },
    { title:"日韩动漫", items:catList(10) },
    { title:"欧美动漫", items:catList(11) }
  ];
}

function categories(){
  return [
    { key:"new", title:"最新更新" },
    { key:"9",   title:"国产动漫" },
    { key:"10",  title:"日韩动漫" },
    { key:"11",  title:"欧美动漫" }
  ];
}

function search(kw,page){
  kw=String(kw||"").trim();
  if(!kw) return apiList(parseInt(page)||1);
  var j=apiGet(__API+"?ac=search&wd="+encodeURIComponent(kw));
  var list=(j&&j.list)||[];
  var out=list.map(card);
  /* 官方 ac=search 不返回封面 → 逐条 detail 补 pic/remarks */
  var n=out.length>8?8:out.length;
  for(var i=0;i<n;i++){
    var d2=apiGet(__API+"?ac=detail&ids="+out[i].id);
    if(d2&&d2.list&&d2.list[0]){
      var v2=d2.list[0];
      var p=fullPic(v2.vod_pic);
      if(p) out[i].pic=p;
      if(!out[i].remarks&&v2.vod_remarks) out[i].remarks=v2.vod_remarks;
    }
  }
  return out;
}

function searchFiltered(category,filters,page){
  category=String(category||"");
  if(category==="new"||category==="") return apiList(parseInt(page)||1);
  return catList(parseInt(category)||9);
}

function detail(id){
  id=String(id||"").trim();
  var j=apiGet(__API+"?ac=detail&ids="+encodeURIComponent(id));
  var list=(j&&j.list)||[];
  if(!list.length) return null;
  var v=list[0];
  var eps=parseEps(v.vod_play_url||"");
  return {
    id:id,
    name:v.vod_name||"",
    pic:fullPic(v.vod_pic),
    year:String(v.vod_year||""),
    remarks:v.vod_remarks||"",
    desc:cleanHtml(v.vod_content||""),
    episodes:eps.length?eps:[{name:"播放",flag:v.vod_id+"",url:v.vod_id+""}]
  };
}

function related(id){ return []; }

function play(flag){
  flag=String(flag||"").trim();
  if(/^https?:\/\//i.test(flag))
    return { url:flag, type:"auto", referer:__BASE, headers:{"User-Agent":__UA,"Referer":__BASE} };
  /* flag 为 vod_id 数字时回查详情拿第一集 */
  if(/^\d+$/.test(flag)){
    var j=apiGet(__API+"?ac=detail&ids="+flag);
    var list=(j&&j.list)||[];
    if(!list.length) return null;
    var eps=parseEps(list[0].vod_play_url||"");
    if(!eps.length) return null;
    return { url:eps[0].flag, type:"auto", referer:__BASE, headers:{"User-Agent":__UA,"Referer":__BASE} };
  }
  return null;
}

function danmu(payload){ return null; }

/* ---- 内部工具 ---- */
function apiList(pg){
  var j=apiGet(__API+"?ac=videolist&pg="+(pg||1));
  var list=(j&&j.list)||[];
  return list.map(card);
}

function catList(typeId){
  var html=get(__BASE+"/s/"+typeId+".html");
  if(!html) return [];
  var out=[],re=/<a href="\/v\/(\d+)\.html" title="([^"]+)" class="module-poster-item[^"]*"[\s\S]*?<div class="module-item-note">([^<]*)<\/div>[\s\S]*?data-original="([^"]+)"/g,m;
  while((m=re.exec(html))){
    out.push({ id:m[1], name:m[2], pic:m[4], remarks:(m[3]||"").trim(), url:__BASE+"/v/"+m[1]+".html" });
  }
  if(!out.length){ /* 宽松兜底：只要链接+标题 */
    var re2=/<a href="\/v\/(\d+)\.html" title="([^"]+)" class="module-poster-item[^"]*"/g;
    while((m=re2.exec(html))) out.push({ id:m[1], name:m[2], pic:"", remarks:"", url:__BASE+"/v/"+m[1]+".html" });
  }
  return out;
}

function parseEps(playUrl){
  var eps=[];
  var parts=String(playUrl||"").split("#");
  for(var i=0;i<parts.length;i++){
    var p=parts[i],idx=p.indexOf("$");
    if(idx<0){ if(p) eps.push({name:"第"+(i+1)+"集",flag:p,url:p}); continue; }
    var name=p.slice(0,idx),url=p.slice(idx+1);
    eps.push({ name:name||("第"+(i+1)+"集"), flag:url, url:url });
  }
  return eps;
}

function fullPic(p){
  p=String(p||"");
  if(!p) return "";
  if(/^https?:\/\//i.test(p)) return p;
  return __BASE+"/"+p.replace(/^\//,"");
}

function cleanHtml(s){
  return String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,200);
}

function apiGet(url){
  var s=get(url);
  if(!s) return null;
  try{ return JSON.parse(s); }catch(e){ return null; }
}

function get(url){
  var headers={"User-Agent":__UA,"Accept":"application/json,text/html,*/*"};
  var out="";
  try{ if(typeof req==="function") out=extract(req(url,headers)); }catch(e){}
  if(!out){ try{ if(typeof request==="function") out=extract(request(url,{method:"GET",headers:headers,timeout:20000})); }catch(e){} }
  if(!out){ try{ if(typeof HTTP!=="undefined"&&HTTP.get) out=extract(HTTP.get(url,headers)); }catch(e){} }
  if(!out){ try{ if(typeof http!=="undefined"&&http.get) out=extract(http.get(url,headers)); }catch(e){} }
  if(!out){ try{ if(typeof $http!=="undefined"&&$http.get) out=extract($http.get(url,headers)); }catch(e){} }
  if(!out){ try{ if(typeof network!=="undefined"&&network.get) out=extract(network.get(url,headers)); }catch(e){} }
  if(!out){ try{ if(typeof fetch==="function"){ var f=fetch(url,{method:"GET",headers:headers,timeout:20000}); out=f&&f.body?f.body:(f&&f.text?f.text():""); } }catch(e){} }
  return out;
}

function extract(r){
  if(!r) return "";
  if(typeof r==="string") return r;
  if(r.body){ if(typeof r.body==="string") return r.body; if(r.body.string){ try{ return r.body.string(); }catch(e){} } }
  if(r.content) return typeof r.content==="function"?r.content():r.content;
  if(r.text) return typeof r.text==="function"?r.text():r.text;
  if(r.data) return typeof r.data==="string"?r.data:JSON.stringify(r.data);
  return "";
}

function card(v){
  return { id:String(v.vod_id||""), name:v.vod_name||"", pic:fullPic(v.vod_pic), remarks:v.vod_remarks||"", url:__BASE+"/v/"+(v.vod_id||"")+".html" };
}
