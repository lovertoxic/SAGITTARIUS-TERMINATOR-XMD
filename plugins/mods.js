const {
  ezra
} = require("../fredi/ezra");
const axios = require('axios');
let {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("../luckydatabase/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require("../luckydatabase/banGroup");
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require("../luckydatabase/onlyAdmin");
const {
  removeSudoNumber,
  addSudoNumber,
  issudo
} = require("../luckydatabase/sudo");
const sleep = _0x310caf => {
  return new Promise(_0x434eb9 => {
    setTimeout(_0x434eb9, _0x310caf);
  });
};
ezra({
  'nomCom': 'tgs',
  'categorie': "sir bravin-Mods"
}, async (_0x2ea8db, _0x3345d4, _0x423bb1) => {
  const {
    ms: _0x5f5897,
    repondre: _0x3b24cb,
    arg: _0x3d356d,
    nomAuteurMessage: _0x23ad1a,
    superUser: _0x3758af
  } = _0x423bb1;
  if (!_0x3758af) {
    _0x3b24cb("Only Mods can use this command");
    return;
  }
  if (!_0x3d356d[0x0]) {
    _0x3b24cb("put a telegramme stickers link ");
    return;
  }
  let _0x9cddb2 = _0x3d356d.join(" ");
  let _0x5760a3 = _0x9cddb2.split("/addstickers/")[0x1];
  let _0x517b91 = 'https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=' + encodeURIComponent(_0x5760a3);
  try {
    let _0x3e855c = await axios.get(_0x517b91);
    let _0x2d3c3a = null;
    if (_0x3e855c.data.result.is_animated === true || _0x3e855c.data.result.is_video === true) {
      _0x2d3c3a = "animated sticker";
    } else {
      _0x2d3c3a = "not animated sticker";
    }
    let _0x31bf1a = "   Zk-stickers-dl\n      \n  *Name :* " + _0x3e855c.data.result.name + "\n  *Type :* " + _0x2d3c3a + " \n  *Length :* " + _0x3e855c.data.result.stickers.length + "\n  \n      Downloading...";
    await _0x3b24cb(_0x31bf1a);
    for (let _0x11ba35 = 0x0; _0x11ba35 < _0x3e855c.data.result.stickers.length; _0x11ba35++) {
      let _0x1b5db5 = await axios.get("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x3e855c.data.result.stickers[_0x11ba35].file_id);
      let _0x252537 = await axios({
        'method': "get",
        'url': "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x1b5db5.data.result.file_path,
        'responseType': "arraybuffer"
      });
      const _0x2f7091 = new Sticker(_0x252537.data, {
        'pack': _0x23ad1a,
        'author': "toxic lover-v2 xmd",
        'type': StickerTypes.FULL,
        'categories': ['🤩', '🎉'],
        'id': "12345",
        'quality': 0x32,
        'background': "#000000"
      });
      const _0x319137 = await _0x2f7091.toBuffer();
      await _0x3345d4.sendMessage(_0x2ea8db, {
        'sticker': _0x319137
      }, {
        'quoted': _0x5f5897
      });
    }
  } catch (_0x8ad7bd) {
    _0x3b24cb("we got an error \n", _0x8ad7bd);
  }
});
ezra({
  'nomCom': "crew",
  'categorie': "sir bravin-Mods"
}, async (_0x35840e, _0x35ef9e, _0x58ae46) => {
  const {
    ms: _0x3aa442,
    repondre: _0x10afd7,
    arg: _0x4bfb02,
    auteurMessage: _0x10420f,
    superUser: _0x4bd557,
    auteurMsgRepondu: _0x44b879,
    msgRepondu: _0x234b67
  } = _0x58ae46;
  if (!_0x4bd557) {
    _0x10afd7("only modds can use this command");
    return;
  }
  ;
  if (!_0x4bfb02[0x0]) {
    _0x10afd7("Please enter the name of the group to create");
    return;
  }
  ;
  if (!_0x234b67) {
    _0x10afd7("Please mention a member added ");
    return;
  }
  const _0x312e5a = _0x4bfb02.join(" ");
  const _0x2fbc5d = await _0x35ef9e.groupCreate(_0x312e5a, [_0x10420f, _0x44b879]);
  console.log("created group with id: " + _0x2fbc5d.gid);
  _0x35ef9e.sendMessage(_0x2fbc5d.id, {
    'text': "Bienvenue dans " + _0x312e5a
  });
});
ezra({
  'nomCom': "left",
  'categorie': 'sir bravin-Mods'
}, async (_0x59f751, _0x13b4d3, _0x393d97) => {
  const {
    ms: _0x13c1e7,
    repondre: _0x51930b,
    verifGroupe: _0x3695c6,
    msgRepondu: _0x1a9f34,
    verifAdmin: _0x2d37bb,
    superUser: _0x3cf9c4,
    auteurMessage: _0x1d6437
  } = _0x393d97;
  if (!_0x3695c6) {
    _0x51930b("group only");
    return;
  }
  ;
  if (!_0x3cf9c4) {
    _0x51930b("order reserved for the owner");
    return;
  }
  await _0x13b4d3.groupLeave(_0x59f751);
});
ezra({
  'nomCom': "join",
  'categorie': "sir bravin-Mods"
}, async (_0x404152, _0x1456de, _0x450a06) => {
  const {
    arg: _0x4f98e3,
    ms: _0x5247cb,
    repondre: _0x4085ad,
    verifGroupe: _0x3ac1fc,
    msgRepondu: _0x91b13,
    verifAdmin: _0x4b383e,
    superUser: _0x21fe6e,
    auteurMessage: _0x1069d9
  } = _0x450a06;
  if (!_0x21fe6e) {
    _0x4085ad("command reserved for the bot owner");
    return;
  }
  let _0x5438dd = _0x4f98e3[0x0].split("https://chat.whatsapp.com/")[0x1];
  await _0x1456de.groupAcceptInvite(_0x5438dd);
  _0x4085ad('Succes')["catch"](_0x47bb47 => {
    _0x4085ad("Unknown error");
  });
});
ezra({
  'nomCom': "jid",
  'categorie': "sir bravin-Mods"
}, async (_0x1b6ddb, _0x656c39, _0x3bf7b4) => {
  const {
    arg: _0x26141b,
    ms: _0x24144f,
    repondre: _0x299e84,
    verifGroupe: _0x1579d1,
    msgRepondu: _0xc1f97f,
    verifAdmin: _0x29fd17,
    superUser: _0x11a701,
    auteurMessage: _0x1cd06b,
    auteurMsgRepondu: _0x57c77f
  } = _0x3bf7b4;
  if (!_0x11a701) {
    _0x299e84("command reserved for the bot owner");
    return;
  }
  if (!_0xc1f97f) {
    jid = _0x1b6ddb;
  } else {
    jid = _0x57c77f;
  }
  ;
  _0x656c39.sendMessage(_0x1b6ddb, {
    'text': jid
  }, {
    'quoted': _0x24144f
  });
});
ezra({
  'nomCom': "block",
  'categorie': "sir bravin-Mods"
}, async (_0x384889, _0x4ce066, _0x1e6505) => {
  const {
    arg: _0x5b823c,
    ms: _0x3c9136,
    repondre: _0x454a93,
    verifGroupe: _0x3ad9c8,
    msgRepondu: _0x22d10c,
    verifAdmin: _0x4887f4,
    superUser: _0x49bc8a,
    auteurMessage: _0x576d9f,
    auteurMsgRepondu: _0x137e2a
  } = _0x1e6505;
  if (!_0x49bc8a) {
    _0x454a93("command reserved for the bot owner");
    return;
  }
  if (!_0x22d10c) {
    if (_0x3ad9c8) {
      _0x454a93("Be sure to mention the person to block");
      return;
    }
    ;
    jid = _0x384889;
    await _0x4ce066.updateBlockStatus(jid, "block").then(_0x454a93("succes"));
  } else {
    jid = _0x137e2a;
    await _0x4ce066.updateBlockStatus(jid, "block").then(_0x454a93('succes'));
  }
  ;
});
ezra({
  'nomCom': "unblock",
  'categorie': "sir bravin-Mods"
}, async (_0x35ac49, _0x16ea44, _0x446a83) => {
  const {
    arg: _0x37e39e,
    ms: _0x2addb6,
    repondre: _0x1d452f,
    verifGroupe: _0x45351e,
    msgRepondu: _0x3ccf6c,
    verifAdmin: _0x1e18c5,
    superUser: _0x4c447e,
    auteurMessage: _0x92ce7c,
    auteurMsgRepondu: _0x4d05b8
  } = _0x446a83;
  if (!_0x4c447e) {
    _0x1d452f("command reserved for the bot owner");
    return;
  }
  if (!_0x3ccf6c) {
    if (_0x45351e) {
      _0x1d452f("Please mention the person to be unlocked");
      return;
    }
    ;
    jid = _0x35ac49;
    await _0x16ea44.updateBlockStatus(jid, "unblock").then(_0x1d452f("succes"));
  } else {
    jid = _0x4d05b8;
    await _0x16ea44.updateBlockStatus(jid, "unblock").then(_0x1d452f('succes'));
  }
  ;
});
ezra({
  'nomCom': "kickall",
  'categorie': "sir bravin-Group",
  'reaction': '📣'
}, async (_0xa44a76, _0x31fef4, _0x51766f) => {
  const {
    auteurMessage: _0x3667c0,
    ms: _0x2cd5d0,
    repondre: _0xb912de,
    arg: _0x1fcbd4,
    verifGroupe: _0x502426,
    nomGroupe: _0x485df3,
    infosGroupe: _0x3680bd,
    nomAuteurMessage: _0xe757d6,
    verifAdmin: _0x14e712,
    superUser: _0x51fd97,
    prefixe: _0x2495af
  } = _0x51766f;
  const _0x2641df = await _0x31fef4.groupMetadata(_0xa44a76);
  if (!_0x502426) {
    _0xb912de("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }
  if (_0x51fd97 || _0x3667c0 == _0x2641df.owner) {
    _0xb912de("No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.");
    await sleep(0x1388);
    let _0x475124 = _0x502426 ? await _0x3680bd.participants : '';
    try {
      let _0x21fc45 = _0x475124.filter(_0x3370f1 => !_0x3370f1.admin);
      for (const _0x1ac50f of _0x21fc45) {
        await _0x31fef4.groupParticipantsUpdate(_0xa44a76, [_0x1ac50f.id], 'remove');
        await sleep(0x1f4);
      }
    } catch (_0x3914ca) {
      _0xb912de("I need administration rights");
    }
  } else {
    _0xb912de("Order reserved for the group owner for security reasons");
    return;
  }
});
ezra({
  'nomCom': 'ban',
  'categorie': "sir bravin-Mods"
}, async (_0x46bf6f, _0x444536, _0x584f0b) => {
  const {
    ms: _0x343005,
    arg: _0x225f3c,
    auteurMsgRepondu: _0x272d4f,
    msgRepondu: _0x216d27,
    repondre: _0x4bd7d1,
    prefixe: _0x5b3e01,
    superUser: _0x196ea7
  } = _0x584f0b;
  if (!_0x196ea7) {
    _0x4bd7d1("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x225f3c[0x0]) {
    _0x4bd7d1("mention the victim by typing " + _0x5b3e01 + "ban add/del to ban/unban the victim");
    return;
  }
  ;
  if (_0x216d27) {
    switch (_0x225f3c.join(" ")) {
      case "add":
        let _0x32f18b = await isUserBanned(_0x272d4f);
        if (_0x32f18b) {
          _0x4bd7d1("This user is already banned");
          return;
        }
        addUserToBanList(_0x272d4f);
        break;
      case "del":
        let _0x48ac7d = await isUserBanned(_0x272d4f);
        if (_0x48ac7d) {
          removeUserFromBanList(_0x272d4f);
          _0x4bd7d1("This user is now free.");
        } else {
          _0x4bd7d1("This user is not banned.");
        }
        break;
      default:
        _0x4bd7d1("bad option");
        break;
    }
  } else {
    _0x4bd7d1("mention the victim");
    return;
  }
});
ezra({
  'nomCom': "bangroup",
  'categorie': "sir bravin-Mods"
}, async (_0x5ca876, _0x5b233d, _0xcd25f4) => {
  const {
    ms: _0x5a8507,
    arg: _0x16d364,
    auteurMsgRepondu: _0x489a19,
    msgRepondu: _0x4a7b61,
    repondre: _0x491777,
    prefixe: _0xe59519,
    superUser: _0x25dbc5,
    verifGroupe: _0x7f9ede
  } = _0xcd25f4;
  if (!_0x25dbc5) {
    _0x491777("This command is only allowed to the bot owner");
    return;
  }
  ;
  if (!_0x7f9ede) {
    _0x491777("order reservation for groups");
    return;
  }
  ;
  if (!_0x16d364[0x0]) {
    _0x491777("type " + prefix + "bangroup add/del to ban/unban the group");
    return;
  }
  ;
  const _0x553f07 = await isGroupBanned(_0x5ca876);
  switch (_0x16d364.join(" ")) {
    case "add":
      if (_0x553f07) {
        _0x491777("This group is already banned");
        return;
      }
      addGroupToBanList(_0x5ca876);
      break;
    case 'del':
      if (_0x553f07) {
        removeGroupFromBanList(_0x5ca876);
        _0x491777("This group is now free.");
      } else {
        _0x491777("This group is not banned.");
      }
      break;
    default:
      _0x491777("bad option");
      break;
  }
});
ezra({
  'nomCom': "onlyadmin",
  'categorie': "sir bravin-Group"
}, async (_0x404bbe, _0x4f3437, _0x235142) => {
  const {
    ms: _0x2b1867,
    arg: _0x36aee9,
    auteurMsgRepondu: _0x46b0de,
    msgRepondu: _0x2c3a61,
    repondre: _0x460b46,
    prefixe: _0x43ef9a,
    superUser: _0x1ac46e,
    verifGroupe: _0x4f4b8a,
    verifAdmin: _0x951aea
  } = _0x235142;
  if (_0x1ac46e || _0x951aea) {
    if (!_0x4f4b8a) {
      _0x460b46("order reservation for groups");
      return;
    }
    ;
    if (!_0x36aee9[0x0]) {
      _0x460b46("type " + prefix + "onlyadmin add/del to ban/unban the group");
      return;
    }
    ;
    const _0x447b1a = await isGroupOnlyAdmin(_0x404bbe);
    switch (_0x36aee9.join(" ")) {
      case 'add':
        if (_0x447b1a) {
          _0x460b46("This group is already in onlyadmin mode");
          return;
        }
        addGroupToOnlyAdminList(_0x404bbe);
        break;
      case "del":
        if (_0x447b1a) {
          removeGroupFromOnlyAdminList(_0x404bbe);
          _0x460b46("This group is now free.");
        } else {
          _0x460b46("This group is not in onlyadmin mode.");
        }
        break;
      default:
        _0x460b46("bad option");
        break;
    }
  } else {
    _0x460b46("You are not entitled to this order");
  }
});
ezra({
  'nomCom': "sudo",
  'categorie': "sir bravin-Mods"
}, async (_0x1334fd, _0x3d6fa5, _0x5c9342) => {
  const {
    ms: _0x565492,
    arg: _0x35fb4f,
    auteurMsgRepondu: _0x25e9c6,
    msgRepondu: _0x3001f8,
    repondre: _0x90bf9,
    prefixe: _0x1afe05,
    superUser: _0x1b5996
  } = _0x5c9342;
  if (!_0x1b5996) {
    _0x90bf9("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x35fb4f[0x0]) {
    _0x90bf9("mention the person by typing " + prefix + "sudo add/del");
    return;
  }
  ;
  if (_0x3001f8) {
    switch (_0x35fb4f.join(" ")) {
      case "add":
        let _0x49f50f = await issudo(_0x25e9c6);
        if (_0x49f50f) {
          _0x90bf9("This user is already sudo");
          return;
        }
        addSudoNumber(_0x25e9c6);
        _0x90bf9("succes");
        break;
      case "del":
        let _0x1c2c5a = await issudo(_0x25e9c6);
        if (_0x1c2c5a) {
          removeSudoNumber(_0x25e9c6);
          _0x90bf9("This user is now non-sudo.");
        } else {
          _0x90bf9("This user is not sudo.");
        }
        break;
      default:
        _0x90bf9("bad option");
        break;
    }
  } else {
    _0x90bf9("mention the victim");
    return;
  }
});
ezra({
  'nomCom': "save",
  'categorie': "sir bravin-Mods"
}, async (_0x556e51, _0x3ef53b, _0x2164a6) => {
  const {
    repondre: _0x4e0c6b,
    msgRepondu: _0xc0278c,
    superUser: _0x82d523,
    auteurMessage: _0x19c78c
  } = _0x2164a6;
  if (_0x82d523) {
    if (_0xc0278c) {
      console.log(_0xc0278c);
      let _0x9166a7;
      if (_0xc0278c.imageMessage) {
        let _0x16a538 = await _0x3ef53b.downloadAndSaveMediaMessage(_0xc0278c.imageMessage);
        _0x9166a7 = {
          'image': {
            'url': _0x16a538
          },
          'caption': _0xc0278c.imageMessage.caption
        };
      } else {
        if (_0xc0278c.videoMessage) {
          let _0x44ec19 = await _0x3ef53b.downloadAndSaveMediaMessage(_0xc0278c.videoMessage);
          _0x9166a7 = {
            'video': {
              'url': _0x44ec19
            },
            'caption': _0xc0278c.videoMessage.caption
          };
        } else {
          if (_0xc0278c.audioMessage) {
            let _0x4d2424 = await _0x3ef53b.downloadAndSaveMediaMessage(_0xc0278c.audioMessage);
            _0x9166a7 = {
              'audio': {
                'url': _0x4d2424
              },
              'mimetype': "audio/mp4"
            };
          } else {
            if (_0xc0278c.stickerMessage) {
              let _0x13a95c = await _0x3ef53b.downloadAndSaveMediaMessage(_0xc0278c.stickerMessage);
              let _0x9ca371 = new Sticker(_0x13a95c, {
                'pack': "toxic lover-v2 xmd-tag",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': "transparent"
              });
              const _0x2c2e62 = await _0x9ca371.toBuffer();
              _0x9166a7 = {
                'sticker': _0x2c2e62
              };
            } else {
              _0x9166a7 = {
                'text': _0xc0278c.conversation
              };
            }
          }
        }
      }
      _0x3ef53b.sendMessage(_0x19c78c, _0x9166a7);
    } else {
      _0x4e0c6b("Mention the message that you want to save");
    }
  } else {
    _0x4e0c6b("only mods can use this command");
  }
});
ezra({
  'nomCom': "mention",
  'categorie': "sir bravin-Mods"
}, async (_0x3790e7, _0x26b96d, _0x36d71f) => {
  const {
    ms: _0xc19c5c,
    repondre: _0x130db0,
    superUser: _0x21a46b,
    arg: _0x25aef9
  } = _0x36d71f;
  if (!_0x21a46b) {
    _0x130db0("you do not have the rights for this command");
    return;
  }
  const _0x503307 = require("../luckydatabase/mention");
  let _0x344999 = await _0x503307.recupererToutesLesValeurs();
  data = _0x344999[0x0];
  if (!_0x25aef9 || _0x25aef9.length < 0x1) {
    let _0xd012f;
    if (_0x344999.length === 0x0) {
      _0x130db0("To activate or modify the mention; follow this syntax: mention link type message\n  The different types are audio, video, image, and sticker.\n  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Luffy");
      return;
    }
    if (data.status == "non") {
      _0xd012f = "Desactived";
    } else {
      _0xd012f = "Actived";
    }
    mtype = data.type || "no data";
    url = data.url || "no data";
    let _0x4dc731 = "Status: " + _0xd012f + "\nType: " + mtype + "\nLink: " + url + "\n\n*Instructions:*\n\nTo activate or modify the mention, follow this syntax: mention link type message\nThe different types are audio, video, image, and sticker.\nExample: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is sir bravin\n\nTo stop the mention, use mention stop";
    _0x130db0(_0x4dc731);
    return;
  }
  if (_0x25aef9.length >= 0x2) {
    if (_0x25aef9[0x0].startsWith("http") && (_0x25aef9[0x1] == 'image' || _0x25aef9[0x1] == "audio" || _0x25aef9[0x1] == "video" || _0x25aef9[0x1] == 'sticker')) {
      let _0x4b91ad = [];
      for (i = 0x2; i < _0x25aef9.length; i++) {
        _0x4b91ad.push(_0x25aef9[i]);
      }
      let _0x16236a = _0x4b91ad.join(" ") || '';
      await _0x503307.addOrUpdateDataInMention(_0x25aef9[0x0], _0x25aef9[0x1], _0x16236a);
      await _0x503307.modifierStatusId1("oui").then(() => {
        _0x130db0("mention updated");
      });
    } else {
      _0x130db0("*Instructions:*\n          To activate or modify the mention, follow this syntax: mention link type message. The different types are audio, video, image, and sticker.");
    }
  } else if (_0x25aef9.length === 0x1 && _0x25aef9[0x0] == "stop") {
    await _0x503307.modifierStatusId1("non").then(() => {
      _0x130db0(" mention stopped ");
    });
  } else {
    _0x130db0("Please make sure to follow the instructions");
  }
});
