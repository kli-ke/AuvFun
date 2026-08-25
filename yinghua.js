/*
 樱花动漫 yhtn.cc - 自定义JS数据源脚本
 基于苹果CMS模板, 兼容多引擎请求API, 字段双写
 首页: /  分类: /vod/list/{page}/{cid}/0/0/0/0/0/0
 搜索: /public/auto/search1.html?keyword=关键词 (AJAX)
 详情: /v/{id}/{cid}  播放: /p/{id}/{cid}/{nid}
*/
var BASE_URL = "https://www.yhtn.cc";
var UA = "Mozilla/5.0 (Linux; Android 12; Pixel 6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36";

function httpGet(url, headers) {
    var h = headers || {};
    h["User-Agent"] = UA;
    h["Referer"] = BASE_URL + "/";
    try { var r = req(url, h); if (r) return typeof r === "string" ? r : (r.body || r.content || r.text || ""); } catch (e) {}
    try { var r2 = request(url, { method: "GET", headers: h }); if (r2) { if (typeof r2 === "string") return r2; if (r2.body) return typeof r2.body === "string" ? r2.body : (r2.body.string ? r2.body.string() : ""); if (r2.content) return r2.content; if (r2.text) return r2.text; } } catch (e) {}
    try { var r3 = HTTP.get(url, h); if (r3) { if (typeof r3 === "string") return r3; if (r3.body) return r3.body; if (r3.text) return typeof r3.text === "function" ? r3.text() : r3.text; if (r3.content) return r3.content; } } catch (e) {}
    try { var r4 = http.get(url, h); if (r4) { if (typeof r4 === "string") return r4; if (r4.body) return r4.body; if (r4.text) return typeof r4.text === "function" ? r4.text() : r4.text; } } catch (e) {}
    try { var r5 = $http.get(url, h); if (r5) { if (typeof r5 === "string") return r5; if (r5.body) return r5.body; if (r5.data) return r5.data; } } catch (e) {}
    try { var r6 = network.get(url, h); if (r6) { if (typeof r6 === "string") return r6; if (r6.body) return r6.body; } } catch (e) {}
    try { var r7 = fetch(url, { headers: h }); if (r7 && r7.body) return r7.body; } catch (e) {}
    try {
        var URL = java.net.URL;
        var conn = new URL(url).openConnection();
        conn.setRequestMethod("GET");
        conn.setConnectTimeout(15000);
        conn.setReadTimeout(15000);
        for (var k in h) { if (h.hasOwnProperty(k)) conn.setRequestProperty(k, h[k]); }
        var is = conn.getInputStream();
        var br = new java.io.BufferedReader(new java.io.InputStreamReader(is, "UTF-8"));
        var sb = new java.lang.StringBuilder();
        var line;
        while ((line = br.readLine()) !== null) sb.append(line).append("\n");
        br.close(); is.close(); conn.disconnect();
        return sb.toString();
    } catch (e) {}
    return "";
}

function clean(str) {
    if (!str) return "";
    return String(str).replace(/<[^>]+>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").replace(/^\s+|\s+$/g, "");
}

function makeItem(id, name, pic, remarks) {
    return {
        vod_id: String(id), id: String(id),
        vod_name: name, name: name, title: name,
        vod_pic: pic, pic: pic, cover: pic, img: pic,
        vod_remarks: remarks, remarks: remarks, note: remarks
    };
}

function init(extend) {
    return { name: "樱花动漫-yhtn", host: BASE_URL, group: "动漫" };
}

function home() {
    var result = {
        class: [
            { type_id: "229", type_name: "日本动漫" },
            { type_id: "231", type_name: "国产动漫" },
            { type_id: "232", type_name: "欧美动漫" },
            { type_id: "77", type_name: "动漫电影" },
            { type_id: "78", type_name: "动漫剧场版" },
            { type_id: "79", type_name: "动漫OVA" },
            { type_id: "233", type_name: "特摄" },
            { type_id: "272", type_name: "其他动漫" }
        ],
        list: []
    };
    try {
        var html = httpGet(BASE_URL + "/");
        if (!html) return result;

        // 方式1: 匹配首页 .pic/.title 结构卡片
        var reg1 = /<div class="pic">[\s\S]*?<a href="\/v\/(\d+)\/(\d+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"[\s\S]*?<div class="title">[\s\S]*?<a[^>]*>([^<]*)<\/a>[\s\S]*?<div class="ins">[\s\S]*?<p>([^<]*)<\/p>/g;
        var m, seen = {};
        while ((m = reg1.exec(html)) !== null) {
            if (seen[m[1]]) continue; seen[m[1]] = true;
            var pic = m[3].replace(/\\\//g, "/");
            var name = clean(m[5] || m[4]);
            var remarks = clean(m[6]);
            result.list.push(makeItem(m[1], name, pic, remarks));
        }

        // 方式2: 匹配标准 module-card-item 结构
        if (result.list.length < 5) {
            var reg2 = /class="module-card-item module-item"[\s\S]*?href="\/v\/(\d+)\/(\d+)"[^>]*class="module-card-item-poster"[\s\S]*?data-original="([^"]*)"[^>]*alt="([^"]*)"[\s\S]*?module-item-note">([^<]*)<\/div>/g;
            var m2;
            while ((m2 = reg2.exec(html)) !== null) {
                if (seen[m2[1]]) continue; seen[m2[1]] = true;
                result.list.push(makeItem(m2[1], clean(m2[4]), m2[3].replace(/\\\//g, "/"), clean(m2[5])));
            }
        }

        // 方式3: 兜底宽松匹配所有 /v/ 链接 + img alt
        if (result.list.length < 3) {
            var reg3 = /<a href="\/v\/(\d+)\/(\d+)"[^>]*>[\s\S]{0,300}?<img[^>]*src="([^"]*)"[^>]*alt="([^"]*)"/g;
            var m3, seen3 = {};
            while ((m3 = reg3.exec(html)) !== null) {
                if (seen3[m3[1]]) continue; seen3[m3[1]] = true;
                result.list.push(makeItem(m3[1], clean(m3[4]), m3[3].replace(/\\\//g, "/"), ""));
                if (result.list.length >= 30) break;
            }
        }
    } catch (e) {}
    return result;
}

function category(tid, pg, filter, extend) {
    var result = { pagecount: 1, list: [] };
    try {
        pg = pg || 1;
        tid = tid || "229";
        var html = httpGet(BASE_URL + "/vod/list/" + pg + "/" + tid + "/0/0/0/0/0/0");
        if (!html) return result;

        // 标准 module-card-item 结构
        var reg = /class="module-card-item module-item"[\s\S]*?href="\/v\/(\d+)\/(\d+)"[^>]*class="module-card-item-poster"[\s\S]*?data-original="([^"]*)"[^>]*alt="([^"]*)"[\s\S]*?module-item-note">([^<]*)<\/div>/g;
        var m;
        while ((m = reg.exec(html)) !== null) {
            result.list.push(makeItem(m[1], clean(m[4]), m[3].replace(/\\\//g, "/"), clean(m[5])));
        }

        // 兜底宽松匹配
        if (result.list.length === 0) {
            var reg2 = /<a href="\/v\/(\d+)\/(\d+)"[^>]*>[\s\S]{0,300}?<img[^>]*data-original="([^"]*)"[^>]*alt="([^"]*)"/g;
            var m2, seen = {};
            while ((m2 = reg2.exec(html)) !== null) {
                if (seen[m2[1]]) continue; seen[m2[1]] = true;
                result.list.push(makeItem(m2[1], clean(m2[4]), m2[3].replace(/\\\//g, "/"), ""));
            }
        }
    } catch (e) {}
    return result;
}

function search(wd, quick, pg) {
    var result = { list: [] };
    try {
        // AJAX搜索接口返回HTML片段
        var html = httpGet(BASE_URL + "/public/auto/search1.html?keyword=" + encodeURIComponent(wd), {
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "text/html"
        });
        if (!html) return result;

        // 标准 module-card-item 结构
        var reg = /class="module-card-item module-item"[\s\S]*?href="\/v\/(\d+)\/(\d+)"[^>]*class="module-card-item-poster"[\s\S]*?data-original="([^"]*)"[^>]*alt="([^"]*)"[\s\S]*?module-item-note">([^<]*)<\/div>/g;
        var m;
        while ((m = reg.exec(html)) !== null) {
            result.list.push(makeItem(m[1], clean(m[4]), m[3].replace(/\\\//g, "/"), clean(m[5])));
        }

        // 兜底: 匹配标题里的 strong
        if (result.list.length === 0) {
            var reg2 = /href="\/v\/(\d+)\/(\d+)"[^>]*class="module-card-item-poster"[\s\S]*?data-original="([^"]*)"[\s\S]*?module-card-item-title[\s\S]*?<strong>([^<]*)<\/strong>/g;
            var m2;
            while ((m2 = reg2.exec(html)) !== null) {
                result.list.push(makeItem(m2[1], clean(m2[4]), m2[3].replace(/\\\//g, "/"), ""));
            }
        }

        // 最终兜底宽松匹配
        if (result.list.length === 0) {
            var reg3 = /<a href="\/v\/(\d+)\/(\d+)"[^>]*>[\s\S]{0,400}?<img[^>]*data-original="([^"]*)"[^>]*alt="([^"]*)"/g;
            var m3, seen = {};
            while ((m3 = reg3.exec(html)) !== null) {
                if (seen[m3[1]]) continue; seen[m3[1]] = true;
                result.list.push(makeItem(m3[1], clean(m3[4]), m3[3].replace(/\\\//g, "/"), ""));
            }
        }
    } catch (e) {}
    return result;
}

function detail(ids) {
    var result = { list: [] };
    try {
        var idArr = String(ids).split(",");
        for (var idx = 0; idx < idArr.length; idx++) {
            var vid = idArr[idx].replace(/^\s+|\s+$/g, "");
            if (!vid) continue;
            // 详情页URL需要cid, 但我们只有vod_id, 尝试用 /v/{id}/1 作为默认cid
            var html = httpGet(BASE_URL + "/v/" + vid + "/1");
            if (!html) continue;

            var name = "", pic = "", year = "", desc = "", remarks = "";

            // 番剧名
            var nm = /class="module-info-heading"[\s\S]*?<h1[^>]*>([^<]*)<\/h1>/.exec(html);
            if (nm) name = clean(nm[1]);
            if (!name) {
                var nm2 = /<title>([^<|-]*)[<|-]/.exec(html);
                if (nm2) name = clean(nm2[1].replace(/《|》/g, ""));
            }

            // 封面
            var pm = /class="module-info-poster"[\s\S]*?data-original="([^"]*)"/.exec(html);
            if (!pm) pm = /class="module-info-poster"[\s\S]*?src="([^"]*)"/.exec(html);
            if (pm) pic = pm[1].replace(/\\\//g, "/");

            // 年份
            var ym = /module-info-item-content">[\s\S]*?(\d{4})[\s\S]*?<\/div>/.exec(html);
            if (ym) year = ym[1];

            // 简介
            var dm = /class="module-info-introduction-content"[\s\S]*?<p[^>]*>([\s\S]*?)<\/p>/.exec(html);
            if (dm) desc = clean(dm[1]);

            // 备注/更新状态
            var rm = /module-item-note">([^<]*)<\/div>/.exec(html);
            if (rm) remarks = clean(rm[1]);

            // 播放线路名称
            var tabNames = [];
            var tabReg = /class="module-tab-item tab-item"[^>]*data-dropdown-value="([^"]*)"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/g;
            var tm;
            while ((tm = tabReg.exec(html)) !== null) tabNames.push(clean(tm[2]));

            // 播放列表(分集)
            var fromArr = [], urlArr = [];
            var listReg = /class="module-play-list-content[^"]*"[^>]*>([\s\S]*?)<\/div>\s*<\/div>/g;
            var li = 0, lm;
            while ((lm = listReg.exec(html)) !== null) {
                var lineName = tabNames[li] || ("线路" + (li + 1));
                var eps = [];
                var epReg = /class="module-play-list-link"[^>]*href="([^"]*)"[^>]*title="([^"]*)"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/g;
                var em;
                while ((em = epReg.exec(lm[1])) !== null) {
                    var epName = clean(em[3] || em[2]);
                    eps.push(epName + "$" + em[1]);
                }
                if (eps.length > 0) { fromArr.push(lineName); urlArr.push(eps.join("#")); }
                li++;
            }

            // 兜底: 宽松匹配所有播放链接
            if (fromArr.length === 0) {
                var allEps = [];
                var allReg = /href="(\/p\/\d+\/\d+\/\d+)"[^>]*>[\s\S]*?<span>([^<]*)<\/span>/g;
                var am;
                while ((am = allReg.exec(html)) !== null) {
                    allEps.push(clean(am[2]) + "$" + am[1]);
                }
                if (allEps.length > 0) {
                    fromArr.push("默认线路");
                    urlArr.push(allEps.join("#"));
                }
            }

            var item = makeItem(vid, name, pic, remarks);
            item.vod_year = year; item.year = year;
            item.vod_content = desc; item.content = desc; item.description = desc; item.intro = desc;
            item.vod_play_from = fromArr.join("$$$"); item.play_from = fromArr.join("$$$");
            item.vod_play_url = urlArr.join("$$$"); item.play_url = urlArr.join("$$$");
            result.list.push(item);
        }
    } catch (e) {}
    return result;
}

function play(flag, id, flags) {
    try {
        var playUrl = id;
        if (playUrl.indexOf("http") !== 0) playUrl = BASE_URL + playUrl;
        var html = httpGet(playUrl);
        if (!html) return "";

        var videoUrl = "";

        // 方式1: 从 temPlayRenderCode 变量提取iframe src中的url参数
        var renderReg = /var temPlayRenderCode\s*=\s*"([^"]*)"/.exec(html);
        if (renderReg) {
            var renderStr = renderReg[1].replace(/\\u003c/g, "<").replace(/\\u003e/g, ">").replace(/\\\//g, "/");
            var urlParamReg = /url=(https?:\/\/[^\s"'&]+)/.exec(renderStr);
            if (urlParamReg) videoUrl = urlParamReg[1];
        }

        // 方式2: 直接从页面匹配 url= 参数后的m3u8
        if (!videoUrl) {
            var urlReg = /url=(https?:\/\/[^\s"'&]+\.m3u8[^\s"'&]*)/.exec(html);
            if (urlReg) videoUrl = urlReg[1];
        }

        // 方式3: 从 temLineList 的 file 字段(base64编码)提取
        if (!videoUrl) {
            var fileReg = /"file":"([A-Za-z0-9+/=]+)"/.exec(html);
            if (fileReg) {
                try {
                    if (typeof atob === "function") {
                        var decoded = atob(fileReg[1]);
                        // 解码后可能是 URL编码的m3u8地址
                        var decodedUrlReg = /(https?:\/\/[^\s"]+\.m3u8[^\s"]*)/.exec(decoded);
                        if (decodedUrlReg) videoUrl = decodedUrlReg[1];
                    }
                } catch (e) {}
            }
        }

        // 方式4: 兜底直接抓页面里的m3u8
        if (!videoUrl) {
            var m3u8Reg = /(https?:\/\/[^\s"']+\.m3u8[^\s"']*)/.exec(html);
            if (m3u8Reg) videoUrl = m3u8Reg[1];
        }

        if (videoUrl) {
            return {
                parse: 0,
                url: videoUrl,
                playUrl: videoUrl,
                headers: { "User-Agent": UA, "Referer": BASE_URL + "/" }
            };
        }
        return "";
    } catch (e) { return ""; }
}