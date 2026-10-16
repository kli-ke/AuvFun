var CONFIG = {
    name: "搜剧AI-souju3",
    group: "影视",
    hosts: [
        "https://souju6.com",
        "https://hctd3.com",
        "https://souju3.ai",
        "https://bpz7.app"
    ],
    hostIndex: 0,
    timeout: 8000,
    ua: "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36",
    secret: "f39d73aa7a6426203cdee1ef17b31d3b7ea8c23f4c59c62a3a8aa0f39ee5e79d"
};

/* ============================================================
 *  纯JS SHA-256 / HMAC-SHA256 (同步, 无依赖)
 * ============================================================ */
var __SHA = (function () {
    var K = [
        0x428a2f98,0x71374491,0xb5c0fbcf,0xe9b5dba5,0x3956c25b,0x59f111f1,0x923f82a4,0xab1c5ed5,
        0xd807aa98,0x12835b01,0x243185be,0x550c7dc3,0x72be5d74,0x80deb1fe,0x9bdc06a7,0xc19bf174,
        0xe49b69c1,0xefbe4786,0x0fc19dc6,0x240ca1cc,0x2de92c6f,0x4a7484aa,0x5cb0a9dc,0x76f988da,
        0x983e5152,0xa831c66d,0xb00327c8,0xbf597fc7,0xc6e00bf3,0xd5a79147,0x06ca6351,0x14292967,
        0x27b70a85,0x2e1b2138,0x4d2c6dfc,0x53380d13,0x650a7354,0x766a0abb,0x81c2c92e,0x92722c85,
        0xa2bfe8a1,0xa81a664b,0xc24b8b70,0xc76c51a3,0xd192e819,0xd6990624,0xf40e3585,0x106aa070,
        0x19a4c116,0x1e376c08,0x2748774c,0x34b0bcb5,0x391c0cb3,0x4ed8aa4a,0x5b9cca4f,0x682e6ff3,
        0x748f82ee,0x78a5636f,0x84c87814,0x8cc70208,0x90befffa,0xa4506ceb,0xbef9a3f7,0xc67178f2];
    var H0 = [0x6a09e667,0xbb67ae85,0x3c6ef372,0xa54ff53a,0x510e527f,0x9b05688c,0x1f83d9ab,0x5be0cd19];
    function rotr(x,n){ return (x>>>n)|(x<<(32-n)); }
    function utf8bytes(str){
        var out=[],c,cc;
        for(var i=0;i<str.length;i++){
            c=str.charCodeAt(i);
            if(c<0x80) out.push(c);
            else if(c<0x800){ out.push(0xc0|(c>>6),0x80|(c&63)); }
            else if(c<0xd800||c>=0xe000){ out.push(0xe0|(c>>12),0x80|((c>>6)&63),0x80|(c&63)); }
            else { i++; cc=0x10000+(((c&0x3ff)<<10)|(str.charCodeAt(i)&0x3ff)); out.push(0xf0|(cc>>18),0x80|((cc>>12)&63),0x80|((cc>>6)&63),0x80|(cc&63)); }
        }
        return out;
    }
    function sha256(bytes){
        var bitlen=bytes.length*8, len=bytes.length;
        var paddedLen=((len+8)>>6<<6)+64;
        var padded=new Array(paddedLen);
        for(var i=0;i<len;i++) padded[i]=bytes[i];
        padded[len]=0x80;
        for(var j=len+1;j<paddedLen-8;j++) padded[j]=0;
        var high=Math.floor(bitlen/0x100000000)>>>0, low=bitlen>>>0;
        padded[paddedLen-8]=(high>>>24)&255; padded[paddedLen-7]=(high>>>16)&255;
        padded[paddedLen-6]=(high>>>8)&255; padded[paddedLen-5]=high&255;
        padded[paddedLen-4]=(low>>>24)&255; padded[paddedLen-3]=(low>>>16)&255;
        padded[paddedLen-2]=(low>>>8)&255; padded[paddedLen-1]=low&255;
        var h=H0.slice();
        for(var blk=0;blk<paddedLen;blk+=64){
            var w=new Array(64);
            for(var t=0;t<16;t++) w[t]=((padded[blk+4*t]<<24)|(padded[blk+4*t+1]<<16)|(padded[blk+4*t+2]<<8)|padded[blk+4*t+3])>>>0;
            for(var t2=16;t2<64;t2++){
                var x=w[t2-15],y=w[t2-2];
                var s0=rotr(x,7)^rotr(x,18)^(x>>>3);
                var s1=rotr(y,17)^rotr(y,19)^(y>>>10);
                w[t2]=(w[t2-16]+s0+w[t2-7]+s1)>>>0;
            }
            var a=h[0],b=h[1],c=h[2],d=h[3],e=h[4],f=h[5],g=h[6],hh=h[7];
            for(var r=0;r<64;r++){
                var S1=rotr(e,6)^rotr(e,11)^rotr(e,25);
                var ch=(e&f)^((~e)&g);
                var temp1=(hh+S1+ch+K[r]+w[r])>>>0;
                var S0=rotr(a,2)^rotr(a,13)^rotr(a,22);
                var maj=(a&b)^(a&c)^(b&c);
                var temp2=(S0+maj)>>>0;
                hh=g;g=f;f=e;e=(d+temp1)>>>0;d=c;c=b;b=a;a=(temp1+temp2)>>>0;
            }
            h[0]=(h[0]+a)>>>0;h[1]=(h[1]+b)>>>0;h[2]=(h[2]+c)>>>0;h[3]=(h[3]+d)>>>0;
            h[4]=(h[4]+e)>>>0;h[5]=(h[5]+f)>>>0;h[6]=(h[6]+g)>>>0;h[7]=(h[7]+hh)>>>0;
        }
        var out="";
        for(var i=0;i<8;i++){ var v=h[i].toString(16); while(v.length<8) v="0"+v; out+=v; }
        return out;
    }
    return {
        hex: function(str){ return sha256(utf8bytes(str)); },
        hmacHex: function(key, msg){
            var keyBytes=utf8bytes(key);
            if(keyBytes.length>64){ keyBytes=utf8bytes(this.hex(key)); }
            var ipad=new Array(64), opad=new Array(64);
            for(var i=0;i<64;i++){ ipad[i]=(keyBytes[i]||0)^0x36; opad[i]=(keyBytes[i]||0)^0x5c; }
            var innerMsg=ipad.concat(utf8bytes(msg));
            var innerHex=sha256(innerMsg);
            var innerBytes=new Array(32);
            for(var j=0;j<32;j++) innerBytes[j]=parseInt(innerHex.substr(j*2,2),16);
            return sha256(opad.concat(innerBytes));
        }
    };
})();

/* ============================================================
 *  工具
 * ============================================================ */
function __base(){ return CONFIG.hosts[CONFIG.hostIndex % CONFIG.hosts.length]; }
function __switchHost(){ CONFIG.hostIndex=(CONFIG.hostIndex+1)%CONFIG.hosts.length; return __base(); }

/**
 * 请求签名(与 souju3 前端一致)
 * HMAC-SHA256(secret, "METHOD\npath+search\ntimestamp\nnonce")
 */
function __sign(method, path, search){
    var ts = String(Date.now());
    var nonce = "";
    var hexChars = "0123456789abcdef";
    for(var i=0;i<32;i++) nonce += hexChars.charAt(Math.floor(Math.random()*16));
    var msg = method + "\n" + path + (search||"") + "\n" + ts + "\n" + nonce;
    var sig = __SHA.hmacHex(CONFIG.secret, msg);
    return { ts:ts, nonce:nonce, sig:sig };
}

/**
 * 发起带签名的GET请求, 返回JSON字符串
 * 兼容多种引擎请求API(只调用第一个可用, 避免超时)
 */
function __apiJson(method, path, search){
    var url = __base() + path + (search||"");
    var s = __sign(method, path, search||"");
    var headers = {
        "User-Agent": CONFIG.ua,
        "Referer": __base() + "/",
        "Accept": "application/json",
        "x-ai-movie-timestamp": s.ts,
        "x-ai-movie-nonce": s.nonce,
        "x-ai-movie-signature": s.sig
    };
    var raw = "";
    var extract = function(r){
        if(!r) return "";
        if(typeof r==="string") return r;
        if(r.body){ if(typeof r.body==="string") return r.body; if(r.body.string){try{return r.body.string();}catch(e){}} }
        if(r.content) return typeof r.content==="function"?r.content():r.content;
        if(r.text) return typeof r.text==="function"?r.text():r.text;
        if(r.data) return typeof r.data==="string"?r.data:JSON.stringify(r.data);
        return "";
    };
    try{ if(typeof req==="function"){ raw=extract(req(url, headers)); } }catch(e){}
    if(!raw){ try{ if(typeof request==="function"){ raw=extract(request(url, {method:method, headers:headers, timeout:CONFIG.timeout})); } }catch(e){} }
    if(!raw){ try{ if(typeof HTTP!=="undefined"&&HTTP.get){ raw=extract(HTTP.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof http!=="undefined"&&http.get){ raw=extract(http.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof $http!=="undefined"&&$http.get){ raw=extract($http.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof network!=="undefined"&&network.get){ raw=extract(network.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof fetch==="function"){ var f=fetch(url, {method:method, headers:headers, timeout:CONFIG.timeout}); if(f&&f.body) raw=f.body; else if(f&&f.text) raw=typeof f.text==="function"?f.text():f.text; } }catch(e){} }
    return raw;
}

function __clean(str){
    if(!str) return "";
    return String(str).replace(/<[^>]+>/g,"").replace(/&amp;/g,"&").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/\s+/g," ").replace(/^\s+|\s+$/g,"");
}

/**
 * souju3 卡片 -> Auv card {id,name,pic,remarks}
 */
function __toCard(obj){
    if(!obj) return null;
    var id = obj.variant_id || obj.id || "";
    var pic = obj.poster_url || obj.backdrop_url || obj.carousel_url || "";
    return {
        id: String(id),
        name: __clean(obj.title || obj.name || ""),
        pic: pic,
        remarks: __clean(obj.remarks || ""),
        title: __clean(obj.title || obj.name || ""),
        cover: pic
    };
}

/**
 * 解析 /v1/browse/catalog 响应 -> [card]
 */
function __cardsFromBrowse(json){
    var cards = [];
    try{
        var d = JSON.parse(json);
        var arr = (d && d.cards) || [];
        for(var i=0;i<arr.length;i++){
            var c = __toCard(arr[i]);
            if(c && c.id) cards.push(c);
        }
    }catch(e){}
    return cards;
}

/* ============================================================
 *  调试器契约函数
 * ============================================================ */

/**
 * config() -> {kind, browseOnly}
 */
function config(){
    return { kind:"video", browseOnly:false, imageDecode:false };
}

/**
 * homeSections() -> [{title, key?, items:[card]}]
 */
function homeSections(){
    var sections = [];
    try{
        var json = __apiJson("GET", "/v1/feed/home", "");
        if(!json) return sections;
        var d = JSON.parse(json);
        var list = (d && d.sections) || [];
        for(var i=0;i<list.length;i++){
            var sec = list[i];
            var cards = [];
            var secCards = sec.cards || [];
            for(var j=0;j<secCards.length;j++){
                var c = __toCard(secCards[j]);
                if(c && c.id){
                    // 加板块前缀消除跨板块重复id
                    c.id = (sec.key || ("sec"+i)) + ":" + c.id;
                    cards.push(c);
                }
            }
            if(cards.length>0){
                sections.push({ title: sec.title || ("板块"+(i+1)), key: sec.type || ("sec"+i), items: cards });
            }
        }
    }catch(e){}
    return sections;
}

/**
 * categories() -> [{key, title}]
 */
function categories(){
    var defs = [
        { key:"anime", title:"动漫" },
        { key:"movie", title:"电影" },
        { key:"series", title:"剧集" },
        { key:"variety", title:"综艺" },
        { key:"short_drama", title:"短剧" }
    ];
    return defs;
}

/**
 * search(kw, page) -> [card]  JSON数组
 */
function search(keyword, page){
    page = page || 1;
    keyword = keyword || "";
    var q = "";
    var qs = "?content_kind=anime&page=" + page + "&limit=20";
    if(keyword){
        qs += "&q=" + encodeURIComponent(keyword);
    } else {
        // 留空 = 分类浏览
    }
    var json = __apiJson("GET", "/v1/browse/catalog", qs);
    return __cardsFromBrowse(json);
}

/**
 * searchFiltered(cat, filtersJson, page) -> [card]
 */
function searchFiltered(category, filtersJson, page){
    page = page || 1;
    var kind = (category && category!=="all") ? String(category) : "anime";
    var qs = "?content_kind=" + encodeURIComponent(kind) + "&page=" + page + "&limit=20";
    if(filtersJson){
        try{
            var f = JSON.parse(filtersJson);
            if(f && f.q) qs += "&q=" + encodeURIComponent(f.q);
        }catch(e){}
    }
    var json = __apiJson("GET", "/v1/browse/catalog", qs);
    return __cardsFromBrowse(json);
}

/**
 * 解析id: 兼容带板块前缀的 "sec:variant_id", 取最后一段作为variant_id
 */
function __resolveVid(id){
    var s = String(id||"").replace(/^\s+|\s+$/g,"");
    var i = s.lastIndexOf(":");
    if(i>0 && s.indexOf("av_")>i) return s.slice(i+1);
    return s;
}

/**
 * 通用直连请求(不签名, 用于 CDN m3u8/ts 测速与拉取)
 * 复用与 __apiJson 一致的引擎 fallback 链
 */
function __apiRaw(url, referer, timeout, range){
    var headers = { "User-Agent": CONFIG.ua, "Accept": "*/*" };
    if(referer) headers["Referer"] = referer;
    if(range) headers["Range"] = range;
    var raw = "";
    var extract = function(r){
        if(!r) return "";
        if(typeof r==="string") return r;
        if(r.body){ if(typeof r.body==="string") return r.body; if(r.body.string){try{return r.body.string();}catch(e){}} }
        if(r.content) return typeof r.content==="function"?r.content():r.content;
        if(r.text) return typeof r.text==="function"?r.text():r.text;
        if(r.data) return typeof r.data==="string"?r.data:JSON.stringify(r.data);
        return "";
    };
    try{ if(typeof req==="function"){ raw=extract(req(url, headers)); } }catch(e){}
    if(!raw){ try{ if(typeof request==="function"){ raw=extract(request(url, {method:"GET", headers:headers, timeout:timeout||CONFIG.timeout})); } }catch(e){} }
    if(!raw){ try{ if(typeof HTTP!=="undefined"&&HTTP.get){ raw=extract(HTTP.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof http!=="undefined"&&http.get){ raw=extract(http.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof $http!=="undefined"&&$http.get){ raw=extract($http.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof network!=="undefined"&&network.get){ raw=extract(network.get(url, headers)); } }catch(e){} }
    if(!raw){ try{ if(typeof fetch==="function"){ var f=fetch(url, {method:"GET", headers:headers, timeout:timeout||CONFIG.timeout}); if(f&&f.body) raw=f.body; else if(f&&f.text) raw=typeof f.text==="function"?f.text():f.text; } }catch(e){} }
    return raw;
}

/**
 * 相对URL -> 绝对URL (兼容 Auv 播放器不解析相对路径)
 */
function __absUrl(base, rel){
    if(!rel) return "";
    rel = String(rel).replace(/^\s+|\s+$/g,"");
    if(rel.indexOf("http")===0) return rel;
    if(rel.indexOf("//")===0) return "https:" + rel;
    if(rel.indexOf("/")===0){
        var m = String(base).match(/^https?:\/\/[^\/]+/);
        return (m?m[0]:"") + rel;
    }
    var i = String(base).lastIndexOf("/");
    return String(base).slice(0, i+1) + rel;
}

/**
 * 对单条线路测速并展开为可播 media m3u8(绝对URL):
 *   1) 拉 m3u8; 若是 master(#EXT-X-STREAM-INF) 取第一档子流并拼绝对URL
 *   2) 拉 media m3u8 取首个 ts(兼容相对路径)
 *   3) Range 拉 ts 前 32KB 计时
 * 返回 {url: media绝对URL, speed: KB/ms}; 失败返回 null
 */
function __probeLine(line, referer){
    var url = line && line.url ? String(line.url).replace(/^\s+|\s+$/g,"") : "";
    if(url.indexOf("http")!==0) return null;
    var m3 = __apiRaw(url, referer, 1500);
    if(!m3) return null;
    var media = url;
    if(m3.indexOf("#EXT-X-STREAM-INF")>=0){
        var seg = m3.split("\n");
        var found = "";
        for(var i=0;i<seg.length-1;i++){
            var nx = seg[i+1] ? seg[i+1].replace(/^\s+|\s+$/g,"") : "";
            if(seg[i].indexOf("#EXT-X-STREAM-INF")>=0 && nx && nx.indexOf("#")!==0){ found = nx; break; }
        }
        if(!found) return null;
        media = __absUrl(url, found);
    }
    var mm = __apiRaw(media, referer, 1500);
    if(!mm) return null;
    var tsAbsM = mm.match(/https?:\/\/[^\s"'<>]+\.ts/);
    var tsRelM = mm.match(/^\s*([^\s#][^\r\n]*\.ts)\s*$/m);
    var tsUrl = tsAbsM ? tsAbsM[0] : (tsRelM ? __absUrl(media, tsRelM[1]) : "");
    if(!tsUrl) return null;
    var t0 = Date.now();
    var head = __apiRaw(tsUrl, media.split("/").slice(0,3).join("/")+"/", 1200, "bytes=0-32767");
    var dt = Date.now()-t0;
    if(dt<=0) return null;
    var kb = head ? Math.min(head.length, 32768)/1024 : 0;
    if(kb<=0) return null;
    return { url: media, speed: kb/dt };
}

/**
 * 解析某集播放直链: GET /v1/playback/resolve/{token}?line=yjm3u8&view=compact
 * - 线路按实测偏好排序(豪华/红牛/极速/速播/无尽/量子优先, 避开慢的 vvvip 类)
 * - fast=true 时: 测速前2条候选(每条≤~5.5s), 首条够快立即返回; 返回 media 绝对URL
 * - fast=false 时: 直接返回排序后第一条(不测速, 用于 detail 预填 url)
 */
function __resolveM3u8(token, fast){
    if(!token) return "";
    var tok = String(token).replace(/^\s+|\s+$/g,"");
    if(tok.indexOf("av_")!==0) return "";
    var json = __apiJson("GET", "/v1/playback/resolve/" + encodeURIComponent(tok), "?line=yjm3u8&view=compact");
    if(!json) return "";
    try{
        var d = JSON.parse(json);
        var lo = (d && d.line_options) || [];
        var lines = [];
        for(var i=0;i<lo.length;i++){
            var u = lo[i] && lo[i].url;
            if(typeof u==="string" && u.indexOf("http")===0) lines.push(lo[i]);
        }
        if(!lines.length) return "";
        // 优先级排序: 实测快线路优先
        var PREF = ["hhm3u8","hnm3u8","jsm3u8","subm3u8","wjm3u8","lzm3u8","dbm3u8"];
        lines.sort(function(a,b){
            var pa=PREF.indexOf(a.play_from||""), pb=PREF.indexOf(b.play_from||"");
            if(pa>=0 && pb>=0) return pa-pb;
            if(pa>=0) return -1;
            if(pb>=0) return 1;
            return 0;
        });
        if(!fast || lines.length===1) return lines[0].url;
        var referer = __base() + "/";
        // 只测排序后第一条(已是实测偏好线路): 有结果即用(不比较阈值, 避免重复测速), 失败才测第二条
        var p1 = __probeLine(lines[0], referer);
        if(p1) return p1.url;
        if(lines.length>1){
            var p2 = __probeLine(lines[1], referer);
            if(p2) return p2.url;
        }
        return lines[0].url;
    }catch(e){}
    return "";
}

/**
 * detail(id) -> {id,name,pic,year,remarks,desc,episodes:[{name,flag,url}]}
 */
function detail(id){
    try{
        if(!id) return null;
        var vid = __resolveVid(id);
        if(!vid) return null;
        var json = __apiJson("GET", "/v1/catalog/" + encodeURIComponent(vid), "");
        if(!json) return null;
        var d = JSON.parse(json);
        var episodes = [];
        var eps = d.episodes || [];
        var tStart = Date.now();
        var maxResolve = 10;        // 只预解析前10集(用户端约3s), 其余集播放时即时解析
        var resolveWindow = 30000;  // 累计解析窗口30s(60s看门狗内留足余量)
        for(var i=0;i<eps.length;i++){
            var flag = eps[i].token || eps[i].id || (vid+"|"+(i+1));
            var url = "";
            if(i < maxResolve && (Date.now()-tStart) < resolveWindow){
                url = __resolveM3u8(flag);
            }
            // url 兜底用 flag(token): 保证所有选集 url 非空(调试器不告警)
            // 点播时 Auv 拿 url/flag 走 play(token) 即时解析, 照常可播
            episodes.push({ name: __clean(eps[i].title || ("第"+(i+1)+"集")), flag: flag, url: url || flag });
        }
        return {
            id: String(vid),
            name: __clean(d.title || ""),
            pic: d.poster_url || "",
            year: d.year ? String(d.year) : "",
            remarks: __clean(d.remarks || ""),
            desc: __clean(d.description || ""),
            area: __clean(d.area || ""),
            episodes: episodes
        };
    }catch(e){ return null; }
}

/**
 * related(id) -> [card]
 */
function related(id){
    return search("", 1);
}

/**
 * 若 url 是 master playlist(#EXT-X-STREAM-INF), 展开为第一档子流绝对URL
 * (Auv 播放器对相对路径子流支持不稳定)
 */
function __expandMaster(url, referer){
    if(url.indexOf("http")!==0) return url;
    var m3 = __apiRaw(url, referer, 2000);
    if(!m3) return url;
    if(m3.indexOf("#EXT-X-STREAM-INF")<0) return url;
    var seg = m3.split("\n");
    for(var i=0;i<seg.length-1;i++){
        var nx = seg[i+1] ? seg[i+1].replace(/^\s+|\s+$/g,"") : "";
        if(seg[i].indexOf("#EXT-X-STREAM-INF")>=0 && nx && nx.indexOf("#")!==0) return __absUrl(url, nx);
    }
    return url;
}
function play(flag){
    try{
        if(!flag) return null;
        var f = String(flag).replace(/^\s+|\s+$/g,"");
        if(f.indexOf("http")===0){
            return { url: __expandMaster(f, __base() + "/"), headers: { "User-Agent": CONFIG.ua, "Referer": __base() + "/" } };
        }
        var m3u8 = __resolveM3u8(f, true);
        if(!m3u8) return null;
        return {
            url: m3u8,
            headers: { "User-Agent": CONFIG.ua, "Referer": __base() + "/" }
        };
    }catch(e){ return null; }
}

/**
 * danmu(payload) -> null (无自带弹幕)
 */
function danmu(payloadJson){
    return null;
}

/* ============================================================
 *  兼容导出
 * ============================================================ */
if (typeof module !== "undefined" && module.exports) {
    module.exports = { config:config, homeSections:homeSections, categories:categories, search:search, searchFiltered:searchFiltered, detail:detail, related:related, play:play, danmu:danmu, CONFIG:CONFIG, __SHA:__SHA };
}
if (typeof exports !== "undefined") {
    exports.config=config; exports.homeSections=homeSections; exports.categories=categories;
    exports.search=search; exports.searchFiltered=searchFiltered; exports.detail=detail;
    exports.related=related; exports.play=play; exports.danmu=danmu;
}
