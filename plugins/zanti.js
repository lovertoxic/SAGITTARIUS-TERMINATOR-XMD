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
ezra({
  'nomCom': "antitag",
  'categorie': "Fredi-Settings",
  'reaction': '⚙️'
}, async (_0x489328, _0x495188, _0xf1b4e8) => {
  const {
    repondre: _0x213880,
    arg: _0x137d10,
    verifAdmin: _0x25588b,
    superUser: _0x52e750
  } = _0xf1b4e8;
  if (!_0x25588b && !_0x52e750) {
    return _0x213880("sir bravin Admin only command.");
  }
  let _0x287992 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x287992 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x28c5b7 = _0x137d10[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x28c5b7)) {
    return _0x213880("Usage: .antitag-system on/off");
  }
  _0x287992.ANTI_TAG = _0x28c5b7;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x287992, null, 2));
  _0x213880("✅ JEEPERS CREEPER XMD ANTI_TAG mode is now: " + _0x28c5b7);
});
ezra({
  'nomCom': "antimentiongroup",
  'categorie': "bravin-Settings",
  'reaction': '⚙️'
}, async (_0x4b371e, _0x3609f4, _0x13cda4) => {
  const {
    repondre: _0x2d241f,
    arg: _0x510e32,
    verifAdmin: _0x437e16,
    superUser: _0x2572b0
  } = _0x13cda4;
  if (!_0x437e16 && !_0x2572b0) {
    return _0x2d241f("⛔ Admin only command.");
  }
  let _0x196b13 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x196b13 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x5b8407 = _0x510e32[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x5b8407)) {
    return _0x2d241f("📌 Usage: .antimentiongroup on/off");
  }
  _0x196b13.ANTI_MENTION_GROUP = _0x5b8407;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x196b13, null, 2));
  _0x2d241f("✅ JEEPERS CREEPER XMD ANTI_MENTION_GROUP is now: *" + _0x5b8407.toUpperCase() + '*');
});
ezra({
  'nomCom': "anti-link",
  'categorie': "bravin-Settings",
  'reaction': '⚙️'
}, async (_0x2524a7, _0x97d855, _0x4e3710) => {
  const {
    repondre: _0x31f7a2,
    arg: _0x138225,
    verifAdmin: _0x520751,
    superUser: _0x196228
  } = _0x4e3710;
  if (!_0x520751 && !_0x196228) {
    return _0x31f7a2("⛔ Admin only command.");
  }
  let _0x40a588 = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x40a588 = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x376703 = _0x138225[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x376703)) {
    return _0x31f7a2("📌 Usage: .antilinkgroup on/off");
  }
  _0x40a588.ANTI_LINK_GROUP = _0x376703;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x40a588, null, 2));
  _0x31f7a2("✅ JEEPER CREEPER XMD ANTI_LINK_GROUP is now: *" + _0x376703.toUpperCase() + '*');
});
ezra({
  'nomCom': "antishare",
  'categorie': "bravin-Settings",
  'reaction': '⚙️'
}, async (_0x9a2619, _0xc3fb10, _0x1ff175) => {
  const {
    repondre: _0xb02e68,
    arg: _0x1c3aa7,
    verifAdmin: _0x42cdcb,
    superUser: _0x1f37ad
  } = _0x1ff175;
  if (!_0x42cdcb && !_0x1f37ad) {
    return _0xb02e68("⛔ Admin only command.");
  }
  let _0x4cf4ca = {};
  if (fs.existsSync("./fredie/anti.json")) {
    _0x4cf4ca = JSON.parse(fs.readFileSync("./fredie/anti.json"));
  }
  const _0x3af957 = _0x1c3aa7[0]?.["toLowerCase"]();
  if (!['on', "off"].includes(_0x3af957)) {
    return _0xb02e68("📌 Usage: .antisharegroup on/off");
  }
  _0x4cf4ca.ANTI_SHARE_GROUP = _0x3af957;
  fs.writeFileSync("./fredie/anti.json", JSON.stringify(_0x4cf4ca, null, 2));
  _0xb02e68("✅ JEEPERS CREEPER XMD ANTI_SHARE_GROUP is now: *" + _0x3af957.toUpperCase() + '*');
});
