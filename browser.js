
const ieReg = /MSIE\s([\d.]+)/;

function detectBrowswer (ua) {
    var browserName = "Other";
    
    browserRegExp = {
      Sogou : /SE\s2\.X|SogouMobileBrowser/,
      Explorer2345 : /2345Explorer|2345chrome|Mb2345Browser/,
      Liebao : /LBBROWSER/,
      Wechat : /MicroMessenger/,
      QQBrowser : /QQBrowser/,
      Baidu : /BIDUBrowser|baidubrowser|BaiduHD/,
      UC : /UBrowser|UCBrowser|UCWEB/,
      MiuiBrowser : /MiuiBrowser/,
      MobileQQ : /Mobile\/\w{5,}\sQQ\/(\d+[\.\d]+)/,
      Shoujibaidu : /baiduboxapp/,
      Firefox : /Firefox/,
      Maxthon : /Maxthon/,
      Se360 : /360SE/,
      Ee360 : /360EE/,
      TheWorld : /TheWorld/,
      Weibo : /__weibo__/,
      NokiaBrowser : /NokiaBrowser/,
      Opera : /Opera|OPR\/(\d+[\.\d]+)/,
      Edge : /Edge/,
      AndroidBrowser : /Android.*Mobile\sSafari|Android\/(\d[\.\d]+)\sRelease\/(\d[\.\d]+)\sBrowser\/AppleWebKit(\d[\.\d]+)/i,
      IE : /Trident|MSIE/,
      Chrome : /Chrome|CriOS/,
      Safari : /Version[|\/]([\w.]+)(\s\w.+)?\s?Safari|like\sGecko\)\sMobile\/\w{3,}$/,
    };
    for (var i in browserRegExp) {
      if (browserRegExp[i].exec(ua)) {
        browserName = i;
        if (browserName == "IE") {
          let match = ua.match(ieReg);
          let ver = (match && match[1])
          if (ver) {
            browserName = browserName + ' ' + ver;
          }
        }
        break;
      }
    }
   return browserName;
}

module.exports = detectBrowswer;