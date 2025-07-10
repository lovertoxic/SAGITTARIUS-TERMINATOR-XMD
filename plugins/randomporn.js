(function (_0x7c2269, _0xf8439d) {
  const _0x151291 = _0x7c2269();
  while (true) {
    try {
      const _0x211eca = -parseInt(_0x16b3(0xb5, 0x52)) / 0x1 * (parseInt(_0x16b3(0x99, 0x41b)) / 0x2) + parseInt(_0x16b3(0xeb, 0x46a)) / 0x3 + parseInt(_0x16b3(0xc7, 0x5e)) / 0x4 * (parseInt(_0x16b3(0x8e, 0x26)) / 0x5) + parseInt(_0x16b3(0xb2, 0x423)) / 0x6 + -parseInt(_0x16b3(0xbb, 0x429)) / 0x7 + -parseInt(_0x16b3(0xd6, 0x61)) / 0x8 + parseInt(_0x16b3(0xf5, 0x85)) / 0x9;
      if (_0x211eca === _0xf8439d) {
        break;
      } else {
        _0x151291.push(_0x151291.shift());
      }
    } catch (_0x30c7a5) {
      _0x151291.push(_0x151291.shift());
    }
  }
})(_0x2921, 0x1c49f);
const _0x5c9d1d = function () {
  let _0x144bf9 = true;
  return function (_0x5e9afb, _0x17c97f) {
    const _0x20a48e = _0x144bf9 ? function () {
      if (_0x17c97f) {
        const _0x39036f = _0x17c97f.apply(_0x5e9afb, arguments);
        _0x17c97f = null;
        return _0x39036f;
      }
    } : function () {};
    _0x144bf9 = false;
    return _0x20a48e;
  };
}();
const _0x480a38 = _0x5c9d1d(this, function () {
  return _0x480a38.toString().search("(((.+)+)+)+$").toString().constructor(_0x480a38).search('(((.+)+)+)+$');
});
function _0x16b3(_0x8e97b4, _0x1301ae) {
  const _0x2cca30 = _0x2921();
  _0x16b3 = function (_0x3ce14e, _0x27bcff) {
    _0x3ce14e = _0x3ce14e - 0x8d;
    let _0x30d5ed = _0x2cca30[_0x3ce14e];
    return _0x30d5ed;
  };
  return _0x16b3(_0x8e97b4, _0x1301ae);
}
_0x480a38();
const {
  cmd,
  commands
} = require('../command');
const _0x1bee95 = {};
function _0x2921() {
  const _0x15641e = ["ZTtgN", 'CGVaY', "* *https:/", "search", "randomporn", "╰═════════", "https://ap", 'psert', "RINCE MDX*", "y again.", "vRfPQ", 'apply', 'result', "Error:", "pattern", "video", "../command", '749244JzvIbU', "download", "qOpZN", "1wESxjR", "uODcL", " Please tr", "ᴛᴇᴄʜ\n", " 〕══❐\n", "Get a rand", "1203006akUseJ", "xtMessage", "uested vid", 'QAtWB', "messages.u", "floor", 'ercel.app/', "r channel:", "desc", "EODtd", "vQfOM", "╭════ 〔 *P", "34652bzgmcu", "quoted", "get the vi", "nload* to ", "VWpRx", 'nloader', "message", "url", "randxvideo", "../lib/fun", "toLowerCas", "axios", "deo.", "while proc", "WtqLp", "1396584bYDhdW", "randporn", "ʙʏ ᴘʀɪɴᴄᴇ ", "messages", "sendMessag", "❌ An error", " with *dow", "constructo", "jdzHh", "om/24uf5pr", "┃▸ *Title:", 'category', "extendedTe", "ideo from ", "react", "cheerio", "hBvRh", "════════❐\n", "ctions", "key", "filename", "237396pVEqWi", "r request.", 'JlNLp', "eo:* ", "ROKCs", "length", "option! Pl", "❌ No video", "kxitv", "❌ Invalid ", '3762621gjIhMD', 'MSNEG', "oader", "cIjFd", 'cebook-dow', 'dtUIW', "jWXPd", "35dZcWpY", "LGvWB", "ktok-downl", "rjNZj", 'error', "contextInf", "caption", "jPvve", "text", "┃▸ *Catego", 'toString', "440828KEdhqr", "gsVaG", "xJrzN", "aper", "ease reply", "rbBMo", " occurred ", "json"];
  _0x2921 = function () {
    return _0x15641e;
  };
  return _0x2921();
}
function _0x4f5a6f(_0x50a964, _0x38cd1f, _0x2500d2, _0x183541) {
  return _0x16b3(_0x38cd1f - 0x101, _0x2500d2);
}
_0x1bee95.pattern = "randomporn";
_0x1bee95.alias = ["randomxvideos", "randporn", 'randxvideo', "randxvideos"];
_0x1bee95.desc = "Get a random adult video from the HentaiVid API";
_0x1bee95.category = "download";
_0x1bee95.filename = __filename;
function _0x4650d2(_0x1e3ac7, _0x411525, _0x590fb0, _0x52c37e) {
  return _0x16b3(_0x1e3ac7 + 0x22c, _0x411525);
}
cmd(_0x1bee95, async (_0x1ce77c, _0xf02101, _0x54cab8, {
  from: _0x5a7106,
  quoted: _0x429215,
  q: _0x34729d,
  reply: _0x23e169
}) => {
  try {
    const _0x517033 = {
      'text': '🔍',
      'key': _0xf02101.key
    };
    const _0x544018 = {
      'react': _0x517033
    };
    await _0x1ce77c.sendMessage(_0x5a7106, _0x544018);
    const _0x11a110 = await fetch('https://apis-keith.vercel.app/dl/hentaivid');
    const _0x3799df = await _0x11a110.json();
    if (!_0x3799df.status || !_0x3799df.result || _0x3799df.result.length === 0x0) {
      return _0x23e169("❌ No videos found.");
    }
    const _0x3b3b45 = _0x3799df.result[Math.floor(Math.random() * _0x3799df.result.length)];
    const {
      title: _0x358044,
      link: _0x8e4bd5,
      category: _0x3e6317,
      media: _0x19b3df,
      views_count: _0x223bcc
    } = _0x3b3b45;
    const {
      video_url: _0x241a32
    } = _0x19b3df;
    const _0x2e9656 = "╭════ 〔 *TOXIC LOVER-V2 XMD* 〕══❐\n" + ("┃▸ *Title:* " + _0x358044 + "\n") + ("┃▸ *Category:* " + _0x3e6317 + "\n") + ("┃▸ *Views:* " + _0x223bcc + "\n") + "╰═════════════════❐\n\n" + "> ᴘᴏᴡᴇʀᴇᴅ ʙʏ NEXUS TECH\n" + "🔗 *Join our channel:* *https://tinyurl.com/26kh6jss*";
    const _0xfebfe5 = {
      'url': _0x241a32
    };
    const _0xf1b231 = {
      'video': _0xfebfe5,
      'caption': _0x2e9656
    };
    const _0x90a8df = {
      'quoted': _0xf02101
    };
    const _0x42825c = await _0x1ce77c.sendMessage(_0x5a7106, _0xf1b231, _0x90a8df);
    const _0x3cc3e7 = _0x42825c.key.id;
    _0x1ce77c.ev.on("messages.upsert", async _0x595853 => {
      const _0x39e018 = _0x595853.messages[0x0];
      if (!_0x39e018.message) {
        return;
      }
      const _0x3f8cdd = _0x39e018.message.conversation || _0x39e018.message.extendedTextMessage?.["text"];
      const _0x4c9e78 = _0x39e018.key.remoteJid;
      const _0x44430c = _0x39e018.message.extendedTextMessage?.['contextInfo']?.["stanzaId"] === _0x3cc3e7;
      if (_0x44430c) {
        const _0x39edfb = {
          'text': '⬇️',
          'key': _0x39e018.key
        };
        const _0x385104 = {
          'react': _0x39edfb
        };
        await _0x1ce77c.sendMessage(_0x4c9e78, _0x385104);
        if (_0x3f8cdd.toLowerCase() === "download") {
          const _0x2942ab = {
            'url': _0x241a32
          };
          const _0x12d911 = {
            'video': _0x2942ab,
            'caption': "📥 *Download your requested video:* " + _0x358044
          };
          const _0x191912 = {
            'quoted': _0x39e018
          };
          await _0x1ce77c.sendMessage(_0x4c9e78, _0x12d911, _0x191912);
        } else {
          _0x23e169("❌ Invalid option! Please reply with *download* to get the video.");
        }
      }
    });
  } catch (_0x2200b1) {
    console.error("Error:", _0x2200b1);
    _0x23e169("❌ An error occurred while processing your request. Please try again.");
  }
});
