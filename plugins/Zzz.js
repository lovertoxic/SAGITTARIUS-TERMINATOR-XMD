const {
  ezra
} = require("../fredi/ezra");
const axios = require("axios");
let {
  Sticker,
  createSticker,
  StickerTypes
} = require("wa-sticker-formatter");
const {
  isUserBanned,
  addUserToBanList,
  removeUserFromBanList
} = require("../lib/banUser");
const {
  addGroupToBanList,
  isGroupBanned,
  removeGroupFromBanList
} = require('../lib/banGroup');
const {
  isGroupOnlyAdmin,
  addGroupToOnlyAdminList,
  removeGroupFromOnlyAdminList
} = require('../lib/onlyAdmin');
const {
  removeSudoNumber,
  addSudoNumber,
  issudo
} = require("../lib/sudo");
const sleep = _0x45325b => {
  return new Promise(_0x4473b1 => {
    setTimeout(_0x4473b1, _0x45325b);
  });
};
ezra({
  'nomCom': "tgs2",
  'categorie': "sir bravin-Mods"
}, async (_0x143e7d, _0x3b0370, _0x15f653) => {
  const {
    ms: _0x176950,
    repondre: _0x21d52d,
    arg: _0x22fab2,
    nomAuteurMessage: _0x205017,
    superUser: _0x58d5f9
  } = _0x15f653;
  if (!_0x58d5f9) {
    _0x21d52d("Only Mods can use this command");
    return;
  }
  if (!_0x22fab2[0x0]) {
    _0x21d52d("put a telegramme stickers link ");
    return;
  }
  let _0x5e6c86 = _0x22fab2.join(" ");
  let _0x2fcd25 = _0x5e6c86.split('/addstickers/')[0x1];
  let _0x4b36b2 = "https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getStickerSet?name=" + encodeURIComponent(_0x2fcd25);
  try {
    let _0x44b299 = await axios.get(_0x4b36b2);
    let _0x37570a = null;
    if (_0x44b299.data.result.is_animated === true || _0x44b299.data.result.is_video === true) {
      _0x37570a = "animated sticker";
    } else {
      _0x37570a = "not animated sticker";
    }
    let _0xa3f65 = "   Zk-stickers-dl\n      \n  *Name :* " + _0x44b299.data.result.name + "\n  *Type :* " + _0x37570a + " \n  *Length :* " + _0x44b299.data.result.stickers.length + "\n  \n      Downloading...";
    await _0x21d52d(_0xa3f65);
    for (let _0x38ec03 = 0x0; _0x38ec03 < _0x44b299.data.result.stickers.length; _0x38ec03++) {
      let _0x42b08d = await axios.get("https://api.telegram.org/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/getFile?file_id=" + _0x44b299.data.result.stickers[_0x38ec03].file_id);
      let _0x5c7f74 = await axios({
        'method': "get2",
        'url': "https://api.telegram.org/file/bot891038791:AAHWB1dQd-vi0IbH2NjKYUk-hqQ8rQuzPD4/" + _0x42b08d.data.result.file_path,
        'responseType': "arraybuffer"
      });
      const _0x4ce219 = new Sticker(_0x5c7f74.data, {
        'pack': _0x205017,
        'author': "jeeper creeper xmd",
        'type': StickerTypes.FULL,
        'categories': ['🤩', '🎉'],
        'id': "12345",
        'quality': 0x32,
        'background': "#000000"
      });
      const _0x4d7102 = await _0x4ce219.toBuffer();
      await _0x3b0370.sendMessage(_0x143e7d, {
        'sticker': _0x4d7102
      }, {
        'quoted': _0x176950
      });
    }
  } catch (_0x4fdf5a) {
    _0x21d52d("we got an error \n", _0x4fdf5a);
  }
});
ezra({
  'nomCom': "crew2",
  'categorie': "sir bravin-Mods"
}, async (_0x523338, _0x79a81f, _0x2fc80d) => {
  const {
    ms: _0x1edcff,
    repondre: _0x186f75,
    arg: _0x102127,
    auteurMessage: _0x321931,
    superUser: _0x3b40d0,
    auteurMsgRepondu: _0x60a973,
    msgRepondu: _0x6f802f
  } = _0x2fc80d;
  if (!_0x3b40d0) {
    _0x186f75("only modds can use this command");
    return;
  }
  ;
  if (!_0x102127[0x0]) {
    _0x186f75("Please enter the name of the group to create");
    return;
  }
  ;
  if (!_0x6f802f) {
    _0x186f75("Please mention a member added ");
    return;
  }
  const _0x2dae30 = _0x102127.join(" ");
  const _0x198deb = await _0x79a81f.groupCreate(_0x2dae30, [_0x321931, _0x60a973]);
  console.log("created group with id: " + _0x198deb.gid);
  _0x79a81f.sendMessage(_0x198deb.id, {
    'text': "Bienvenue dans " + _0x2dae30
  });
});
ezra({
  'nomCom': "left2",
  'categorie': "sir bravin-Mods"
}, async (_0x3b801f, _0x142d76, _0x158330) => {
  const {
    ms: _0x128260,
    repondre: _0x2cb948,
    verifGroupe: _0x2abc6e,
    msgRepondu: _0x5e72f6,
    verifAdmin: _0x379523,
    superUser: _0x3328b9,
    auteurMessage: _0x57392f
  } = _0x158330;
  if (!_0x2abc6e) {
    _0x2cb948("group only");
    return;
  }
  ;
  if (!_0x3328b9) {
    _0x2cb948("order reserved for the owner");
    return;
  }
  await _0x142d76.groupLeave(_0x3b801f);
});
ezra({
  'nomCom': "join2",
  'categorie': "sir bravin-Mods'
}, async (_0x2129bf, _0x35835f, _0x26ca83) => {
  const {
    arg: _0xff8f27,
    ms: _0x5685c2,
    repondre: _0x5bda69,
    verifGroupe: _0x31b6f3,
    msgRepondu: _0x211704,
    verifAdmin: _0x9942e7,
    superUser: _0x2e5721,
    auteurMessage: _0x511eb5
  } = _0x26ca83;
  if (!_0x2e5721) {
    _0x5bda69("command reserved for the bot owner");
    return;
  }
  let _0x1bfc04 = _0xff8f27[0x0].split('https://chat.whatsapp.com/')[0x1];
  await _0x35835f.groupAcceptInvite(_0x1bfc04);
  _0x5bda69("Succes")["catch"](_0x4d14e3 => {
    _0x5bda69("Unknown error");
  });
});
ezra({
  'nomCom': 'jid2',
  'categorie': "sir bravin-Mods"
}, async (_0x2d9f10, _0x3242fc, _0x3d486d) => {
  const {
    arg: _0x35b5b2,
    ms: _0x3aad45,
    repondre: _0x4814c0,
    verifGroupe: _0x222ec9,
    msgRepondu: _0x1ef305,
    verifAdmin: _0x1f7dbb,
    superUser: _0x2c1d89,
    auteurMessage: _0x3788fa,
    auteurMsgRepondu: _0x1429bb
  } = _0x3d486d;
  if (!_0x2c1d89) {
    _0x4814c0("command reserved for the bot owner");
    return;
  }
  if (!_0x1ef305) {
    jid = _0x2d9f10;
  } else {
    jid = _0x1429bb;
  }
  ;
  _0x3242fc.sendMessage(_0x2d9f10, {
    'text': jid
  }, {
    'quoted': _0x3aad45
  });
});
ezra({
  'nomCom': 'block2',
  'categorie': "sir bravin-Mods"
}, async (_0x30b838, _0x57030f, _0x2385fc) => {
  const {
    arg: _0x4b1af6,
    ms: _0x2f3216,
    repondre: _0x3aabde,
    verifGroupe: _0x3cbf2e,
    msgRepondu: _0xc0ec3,
    verifAdmin: _0x491a25,
    superUser: _0x2b2f27,
    auteurMessage: _0x57b22e,
    auteurMsgRepondu: _0x4347dd
  } = _0x2385fc;
  if (!_0x2b2f27) {
    _0x3aabde("command reserved for the bot owner");
    return;
  }
  if (!_0xc0ec3) {
    if (_0x3cbf2e) {
      _0x3aabde("Be sure to mention the person to block");
      return;
    }
    ;
    jid = _0x30b838;
    await _0x57030f.updateBlockStatus(jid, "block").then(_0x3aabde("succes"));
  } else {
    jid = _0x4347dd;
    await _0x57030f.updateBlockStatus(jid, "block").then(_0x3aabde('succes'));
  }
  ;
});
ezra({
  'nomCom': 'unblock2',
  'categorie': 'sir bravin-Mods'
}, async (_0x5c3e8b, _0x210a85, _0x2b6be9) => {
  const {
    arg: _0x376202,
    ms: _0x41f73f,
    repondre: _0x724c2e,
    verifGroupe: _0x821db4,
    msgRepondu: _0xbdc960,
    verifAdmin: _0x5ee3a6,
    superUser: _0x52b4f1,
    auteurMessage: _0x6f3b58,
    auteurMsgRepondu: _0xaea0b1
  } = _0x2b6be9;
  if (!_0x52b4f1) {
    _0x724c2e("command reserved for the bot owner");
    return;
  }
  if (!_0xbdc960) {
    if (_0x821db4) {
      _0x724c2e("Please mention the person to be unlocked");
      return;
    }
    ;
    jid = _0x5c3e8b;
    await _0x210a85.updateBlockStatus(jid, "unblock").then(_0x724c2e("succes"));
  } else {
    jid = _0xaea0b1;
    await _0x210a85.updateBlockStatus(jid, "unblock").then(_0x724c2e("succes"));
  }
  ;
});
ezra({
  'nomCom': "kickall2",
  'categorie': "sir bravin-Group",
  'reaction': '📣'
}, async (_0x131387, _0x4670bb, _0x30c8b3) => {
  const {
    auteurMessage: _0x465a56,
    ms: _0x3ba95b,
    repondre: _0x3f1f73,
    arg: _0x29c019,
    verifGroupe: _0x5a8e2b,
    nomGroupe: _0x361809,
    infosGroupe: _0x159a44,
    nomAuteurMessage: _0x143a0f,
    verifAdmin: _0x3d8583,
    superUser: _0x395035,
    prefixe: _0x2004fb
  } = _0x30c8b3;
  const _0x41416c = await _0x4670bb.groupMetadata(_0x131387);
  if (!_0x5a8e2b) {
    _0x3f1f73("✋🏿 ✋🏿this command is reserved for groups ❌");
    return;
  }
  if (_0x395035 || _0x465a56 == _0x41416c.owner) {
    _0x3f1f73("No_admin members will be removed from the group. You have 5 seconds to reclaim your choice by restarting the bot.");
    await sleep(0x1388);
    let _0x39a510 = _0x5a8e2b ? await _0x159a44.participants : '';
    try {
      let _0x268ac2 = _0x39a510.filter(_0xe2ca0b => !_0xe2ca0b.admin);
      for (const _0x31e8a9 of _0x268ac2) {
        await _0x4670bb.groupParticipantsUpdate(_0x131387, [_0x31e8a9.id], 'remove');
        await sleep(0x1f4);
      }
    } catch (_0x2aefc9) {
      _0x3f1f73("I need administration rights");
    }
  } else {
    _0x3f1f73("Order reserved for the group owner for security reasons");
    return;
  }
});
ezra({
  'nomCom': "ban2",
  'categorie': 'sir bravin-Mods'
}, async (_0x558d14, _0x1a0634, _0xc4dc54) => {
  const {
    ms: _0x29afed,
    arg: _0xfedddc,
    auteurMsgRepondu: _0xced3bf,
    msgRepondu: _0x1ce451,
    repondre: _0x55a83b,
    prefixe: _0x84d21,
    superUser: _0x19e0b5
  } = _0xc4dc54;
  if (!_0x19e0b5) {
    _0x55a83b("This command is only allowed to the bot owner");
    return;
  }
  if (!_0xfedddc[0x0]) {
    _0x55a83b("mention the victim by typing " + _0x84d21 + "ban add/del to ban/unban the victim");
    return;
  }
  ;
  if (_0x1ce451) {
    switch (_0xfedddc.join(" ")) {
      case "add":
        let _0x39be79 = await isUserBanned(_0xced3bf);
        if (_0x39be79) {
          _0x55a83b("This user is already banned");
          return;
        }
        addUserToBanList(_0xced3bf);
        break;
      case "del":
        let _0x1eaa3c = await isUserBanned(_0xced3bf);
        if (_0x1eaa3c) {
          removeUserFromBanList(_0xced3bf);
          _0x55a83b("This user is now free.");
        } else {
          _0x55a83b("This user is not banned.");
        }
        break;
      default:
        _0x55a83b("bad option");
        break;
    }
  } else {
    _0x55a83b("mention the victim");
    return;
  }
});
ezra({
  'nomCom': "bangroup2",
  'categorie': "sir bravin-Mods"
}, async (_0x30affe, _0x12d503, _0x3384fa) => {
  const {
    ms: _0x1ba4dd,
    arg: _0x48c721,
    auteurMsgRepondu: _0xe1e0da,
    msgRepondu: _0x1f2d4d,
    repondre: _0x4852ec,
    prefixe: _0x3761f3,
    superUser: _0x2c0ce1,
    verifGroupe: _0x4fad1e
  } = _0x3384fa;
  if (!_0x2c0ce1) {
    _0x4852ec("This command is only allowed to the bot owner");
    return;
  }
  ;
  if (!_0x4fad1e) {
    _0x4852ec("order reservation for groups");
    return;
  }
  ;
  if (!_0x48c721[0x0]) {
    _0x4852ec("type " + prefix + "bangroup add/del to ban/unban the group");
    return;
  }
  ;
  const _0x1c1d9a = await isGroupBanned(_0x30affe);
  switch (_0x48c721.join(" ")) {
    case 'add':
      if (_0x1c1d9a) {
        _0x4852ec("This group is already banned");
        return;
      }
      addGroupToBanList(_0x30affe);
      break;
    case "del":
      if (_0x1c1d9a) {
        removeGroupFromBanList(_0x30affe);
        _0x4852ec("This group is now free.");
      } else {
        _0x4852ec("This group is not banned.");
      }
      break;
    default:
      _0x4852ec("bad option");
      break;
  }
});
ezra({
  'nomCom': "onlyadmin2",
  'categorie': "sir bravin-Group"
}, async (_0x41aef8, _0xf33a12, _0x3a24c6) => {
  const {
    ms: _0x378990,
    arg: _0xc72812,
    auteurMsgRepondu: _0x420f21,
    msgRepondu: _0x3ce81e,
    repondre: _0x2125b4,
    prefixe: _0x78d57d,
    superUser: _0x4d585b,
    verifGroupe: _0x27add4,
    verifAdmin: _0x3e0727
  } = _0x3a24c6;
  if (_0x4d585b || _0x3e0727) {
    if (!_0x27add4) {
      _0x2125b4("order reservation for groups");
      return;
    }
    ;
    if (!_0xc72812[0x0]) {
      _0x2125b4("type " + prefix + "onlyadmin add/del to ban/unban the group");
      return;
    }
    ;
    const _0x6fedb2 = await isGroupOnlyAdmin(_0x41aef8);
    switch (_0xc72812.join(" ")) {
      case 'add':
        if (_0x6fedb2) {
          _0x2125b4("This group is already in onlyadmin mode");
          return;
        }
        addGroupToOnlyAdminList(_0x41aef8);
        break;
      case "del":
        if (_0x6fedb2) {
          removeGroupFromOnlyAdminList(_0x41aef8);
          _0x2125b4("This group is now free.");
        } else {
          _0x2125b4("This group is not in onlyadmin mode.");
        }
        break;
      default:
        _0x2125b4("bad option");
        break;
    }
  } else {
    _0x2125b4("You are not entitled to this order");
  }
});
ezra({
  'nomCom': "sudo",
  'categorie': "sir bravin-Mods"
}, async (_0x237f3d, _0x268071, _0x2aa4d0) => {
  const {
    ms: _0x14b72a,
    arg: _0x442b86,
    auteurMsgRepondu: _0x19c40d,
    msgRepondu: _0x23e7e0,
    repondre: _0x408dec,
    prefixe: _0x1ea888,
    superUser: _0xc5f01f
  } = _0x2aa4d0;
  if (!_0xc5f01f) {
    _0x408dec("This command is only allowed to the bot owner");
    return;
  }
  if (!_0x442b86[0x0]) {
    _0x408dec("mention the person by typing " + prefix + "sudo add/del");
    return;
  }
  ;
  if (_0x23e7e0) {
    switch (_0x442b86.join(" ")) {
      case "add":
        let _0x365f11 = await issudo(_0x19c40d);
        if (_0x365f11) {
          _0x408dec("This user is already sudo");
          return;
        }
        addSudoNumber(_0x19c40d);
        _0x408dec('succes');
        break;
      case "del":
        let _0x1fea79 = await issudo(_0x19c40d);
        if (_0x1fea79) {
          removeSudoNumber(_0x19c40d);
          _0x408dec("This user is now non-sudo.");
        } else {
          _0x408dec("This user is not sudo.");
        }
        break;
      default:
        _0x408dec("bad option");
        break;
    }
  } else {
    _0x408dec("mention the victim");
    return;
  }
});
ezra({
  'nomCom': "save",
  'categorie': "sir bravin-Mods"
}, async (_0x3806d1, _0x5a361d, _0x2fd64e) => {
  const {
    repondre: _0x508a31,
    msgRepondu: _0x58280a,
    superUser: _0x2642e2,
    auteurMessage: _0x5b5958
  } = _0x2fd64e;
  if (_0x2642e2) {
    if (_0x58280a) {
      console.log(_0x58280a);
      let _0x543e5c;
      if (_0x58280a.imageMessage) {
        let _0x38ba0a = await _0x5a361d.downloadAndSaveMediaMessage(_0x58280a.imageMessage);
        _0x543e5c = {
          'image': {
            'url': _0x38ba0a
          },
          'caption': _0x58280a.imageMessage.caption
        };
      } else {
        if (_0x58280a.videoMessage) {
          let _0x5a28ae = await _0x5a361d.downloadAndSaveMediaMessage(_0x58280a.videoMessage);
          _0x543e5c = {
            'video': {
              'url': _0x5a28ae
            },
            'caption': _0x58280a.videoMessage.caption
          };
        } else {
          if (_0x58280a.audioMessage) {
            let _0x36f377 = await _0x5a361d.downloadAndSaveMediaMessage(_0x58280a.audioMessage);
            _0x543e5c = {
              'audio': {
                'url': _0x36f377
              },
              'mimetype': 'audio/mp4'
            };
          } else {
            if (_0x58280a.stickerMessage) {
              let _0x4ec3b2 = await _0x5a361d.downloadAndSaveMediaMessage(_0x58280a.stickerMessage);
              let _0x124dcd = new Sticker(_0x4ec3b2, {
                'pack': "sir bravin",
                'type': StickerTypes.CROPPED,
                'categories': ['🤩', '🎉'],
                'id': "12345",
                'quality': 0x46,
                'background': "transparent"
              });
              const _0x3846ae = await _0x124dcd.toBuffer();
              _0x543e5c = {
                'sticker': _0x3846ae
              };
            } else {
              _0x543e5c = {
                'text': _0x58280a.conversation
              };
            }
          }
        }
      }
      _0x5a361d.sendMessage(_0x5b5958, _0x543e5c);
    } else {
      _0x508a31("Mention the message that you want to save");
    }
  } else {
    _0x508a31("only mods can use this command");
  }
});
ezra({
  'nomCom': "mention",
  'categorie': "sir bravin-Mods"
}, async (_0x3b61a9, _0x436851, _0x2a8502) => {
  const {
    ms: _0x4bbc39,
    repondre: _0x1542be,
    superUser: _0x55837e,
    arg: _0x1896c6
  } = _0x2a8502;
  if (!_0x55837e) {
    _0x1542be("you do not have the rights for this command");
    return;
  }
  const _0x4c4cc7 = require('../lib/mention');
  let _0x3680f7 = await _0x4c4cc7.recupererToutesLesValeurs();
  data = _0x3680f7[0x0];
  if (!_0x1896c6 || _0x1896c6.length < 0x1) {
    let _0x55eef3;
    if (_0x3680f7.length === 0x0) {
      _0x1542be("To activate or modify the mention; follow this syntax: mention link type message\n  The different types are audio, video, image, and sticker.\n  Example: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Fredi");
      return;
    }
    if (data.status == "non") {
      _0x55eef3 = 'Desactived';
    } else {
      _0x55eef3 = "Actived";
    }
    mtype = data.type || "no data";
    url = data.url || "no data";
    let _0x3cb36f = "Status: " + _0x55eef3 + "\nType: " + mtype + "\nLink: " + url + "\n\n*Instructions:*\n\nTo activate or modify the mention, follow this syntax: mention link type message\nThe different types are audio, video, image, and sticker.\nExample: mention https://static.animecorner.me/2023/08/op2.jpg image Hi, my name is Luffy\n\nTo stop the mention, use mention stop";
    _0x1542be(_0x3cb36f);
    return;
  }
  if (_0x1896c6.length >= 0x2) {
    if (_0x1896c6[0x0].startsWith("http") && (_0x1896c6[0x1] == "image" || _0x1896c6[0x1] == 'audio' || _0x1896c6[0x1] == "video" || _0x1896c6[0x1] == "sticker")) {
      let _0x40ac80 = [];
      for (i = 0x2; i < _0x1896c6.length; i++) {
        _0x40ac80.push(_0x1896c6[i]);
      }
      let _0x5c0f03 = _0x40ac80.join(" ") || '';
      await _0x4c4cc7.addOrUpdateDataInMention(_0x1896c6[0x0], _0x1896c6[0x1], _0x5c0f03);
      await _0x4c4cc7.modifierStatusId1("oui").then(() => {
        _0x1542be("mention updated");
      });
    } else {
      _0x1542be("*Instructions:*\n          To activate or modify the mention, follow this syntax: mention link type message. The different types are audio, video, image, and sticker.");
    }
  } else if (_0x1896c6.length === 0x1 && _0x1896c6[0x0] == "stop") {
    await _0x4c4cc7.modifierStatusId1("non").then(() => {
      _0x1542be(" mention stopped ");
    });
  } else {
    _0x1542be("Please make sure to follow the instructions");
  }
});
