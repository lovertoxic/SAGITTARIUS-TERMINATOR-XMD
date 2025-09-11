const {
  ezra
} = require("../fredi/ezra");
const {
  Sticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  ajouterOuMettreAJourJid,
  mettreAJourAction,
  verifierEtatJid
} = require("../lib/antilien");
const {
  atbajouterOuMettreAJourJid,
  atbverifierEtatJid
} = require("../lib/antibot");
const {
  search,
  download
} = require("aptoide-scraper");
const fs = require("fs-extra");
const {
  ajouterUtilisateurAvecWarnCount,
  getWarnCountByJID,
  resetWarnCountByJID
} = require("../lib/warn");
if (!fs.existsSync("./fredie/anti.json")) {
  fs.writeFileSync("./fredie/anti.json", JSON.stringify({}, null, 2));
}
ezra({
  'nomCom': "anti-link",
  'categorie': "sir cheruiyot-Settings",
  'reaction': '⚙️'
}, async (_0x25efac, _0x474ca8, {
  repondre: _0x5b9c43,
  arg: _0x248c74,
  verifAdmin: _0x5823da,
  superUser: _0x4301f3,
  sender: _0x479f18
}) => {
  if (!_0x5823da && !_0x4301f3) {
    return _0x5b9c43("⛔ Admin only command.");
  }
  if (!_0x248c74[0] || !['on', "off"].includes(_0x248c74[0].toLowerCase())) {
    return _0x5b9c43("📌 Usage: .anti-link on/off");
  }
  if (_0x248c74[0].toLowerCase() === "off") {
    const _0x369ec5 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
    _0x369ec5.ANTI_LINK_GROUP = {
      'status': "off"
    };
    fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x369ec5, null, 2));
    return _0x5b9c43("✅ Anti-Link turned OFF.");
  }
  await _0x5b9c43("⚙️ Choose Anti-Link Action:\n\n1️⃣ Delete Message\n2️⃣ Warn (5 warns = remove)\n3️⃣ Remove instantly\n\n_Reply with number_");
  _0x474ca8.ev.once("messages.upsert", async ({
    messages: _0x1904ee
  }) => {
    const _0x24c679 = _0x1904ee[0];
    const _0x5bf1d9 = _0x24c679.key.remoteJid;
    const _0x58f88a = _0x24c679.key.participant || _0x5bf1d9;
    if (_0x5bf1d9 !== _0x25efac || _0x58f88a !== _0x479f18) {
      return;
    }
    const _0xab2d96 = _0x24c679.message?.["conversation"]?.["trim"]();
    let _0x2aefa4;
    if (_0xab2d96 === '1') {
      _0x2aefa4 = "delete";
    }
    if (_0xab2d96 === '2') {
      _0x2aefa4 = "warn";
    }
    if (_0xab2d96 === '3') {
      _0x2aefa4 = "remove";
    }
    if (!_0x2aefa4) {
      return _0x5b9c43("❌ Invalid choice.");
    }
    const _0x55f1fa = JSON.parse(fs.readFileSync("./fredie/anti.json"));
    _0x55f1fa.ANTI_LINK_GROUP = {
      'status': 'on',
      'action': _0x2aefa4,
      'reportTo': _0x25efac
    };
    fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x55f1fa, null, 2));
    await _0x474ca8.sendMessage(_0x25efac, {
      'text': "✅ Anti-Link turned ON with action: *" + _0x2aefa4.toUpperCase() + '*'
    });
  });
});
ezra({
  'nomCom': "antitag",
  'categorie': "sir cheruiyot-Settings",
  'reaction': '⚙️'
}, async (_0x305c78, _0x446bdf, _0x2e0b3b) => {
  const {
    repondre: _0x5d581a,
    arg: _0x5d857f,
    verifAdmin: _0x2b2320,
    superUser: _0x17ed16
  } = _0x2e0b3b;
  if (!_0x2b2320 && !_0x17ed16) {
    return _0x5d581a("Lucky Xforce Admin only command.");
  }
  let _0x3f65d4 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x3f65d4 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x5f2161 = _0x5d857f[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x5f2161)) {
    return _0x5d581a("Usage: .antitag-system on/off");
  }
  _0x3f65d4.ANTI_TAG = _0x5f2161;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x3f65d4, null, 2));
  _0x5d581a("✅ ꧁☆*тєямιηαтσя*☆꧂ xmd ANTI_TAG mode is now: " + _0x5f2161);
});
ezra({
  'nomCom': "antimentiongroup",
  'categorie': "sir cheruiyot-Settings",
  'reaction': '⚙️'
}, async (_0xc2abfe, _0xb411c9, _0x9dea7a) => {
  const {
    repondre: _0x1eb30c,
    arg: _0x77c9af,
    verifAdmin: _0x34fa91,
    superUser: _0xc4d58e
  } = _0x9dea7a;
  if (!_0x34fa91 && !_0xc4d58e) {
    return _0x1eb30c("⛔ Admin only command.");
  }
  let _0xcb7ae5 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0xcb7ae5 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x3e7838 = _0x77c9af[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x3e7838)) {
    return _0x1eb30c("📌 Usage: .antimentiongroup on/off");
  }
  _0xcb7ae5.ANTI_MENTION_GROUP = _0x3e7838;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0xcb7ae5, null, 2));
  _0x1eb30c("✅ 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-xmd ANTI_MENTION_GROUP is now: *" + _0x3e7838.toUpperCase() + '*');
});
ezra({
  'nomCom': "antishare",
  'categorie': "sir cheruiyot-Settings",
  'reaction': '⚙️'
}, async (_0x345570, _0x7a8540, _0x553468) => {
  const {
    repondre: _0x5935f0,
    arg: _0x23415c,
    verifAdmin: _0x466672,
    superUser: _0x19f686
  } = _0x553468;
  if (!_0x466672 && !_0x19f686) {
    return _0x5935f0("⛔ Admin only command.");
  }
  let _0x3b3db9 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x3b3db9 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x387fc4 = _0x23415c[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x387fc4)) {
    return _0x5935f0("📌 Usage: .antisharegroup on/off");
  }
  _0x3b3db9.ANTI_SHARE_GROUP = _0x387fc4;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x3b3db9, null, 2));
  _0x5935f0("✅ 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD ANTI_SHARE_GROUP is now: *" + _0x387fc4.toUpperCase() + '*');
});
