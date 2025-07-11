const {
  cmd,
  commands
} = require('../command');
const {
  getAnti,
  setAnti,
  initializeAntiDeleteSettings
} = require("../data/antidel");
initializeAntiDeleteSettings();
cmd({
  'pattern': 'antidelete',
  'alias': ["antidel", 'ad'],
  'desc': "Sets up the Antidelete",
  'category': 'misc',
  'filename': __filename
}, async (_0x4ed61e, _0x5bc469, _0x584ddd, {
  from: _0x2697aa,
  reply: _0x44457d,
  q: _0x2f6b18,
  text: _0x3c7ed8,
  isCreator: _0x3a3c49,
  fromMe: _0x380a00
}) => {
  if (!_0x3a3c49) {
    return _0x44457d("This command is only for the bot owner");
  }
  try {
    const _0x22b125 = _0x2f6b18?.['toLowerCase']();
    switch (_0x22b125) {
      case 'on':
        await setAnti('gc', false);
        await setAnti('dm', false);
        return _0x44457d("_AntiDelete is now off for Group Chats and Direct Messages._");
      case "off gc":
        await setAnti('gc', false);
        return _0x44457d("_AntiDelete for Group Chats is now disabled._");
      case "off dm":
        await setAnti('dm', false);
        return _0x44457d("_AntiDelete for Direct Messages is now disabled._");
      case "set gc":
        const _0x4ba1a9 = await getAnti('gc');
        await setAnti('gc', !_0x4ba1a9);
        return _0x44457d("_AntiDelete for Group Chats " + (!_0x4ba1a9 ? 'enabled' : "disabled") + '._');
      case "set dm":
        const _0x2f0773 = await getAnti('dm');
        await setAnti('dm', !_0x2f0773);
        return _0x44457d("_AntiDelete for Direct Messages " + (!_0x2f0773 ? "enabled" : "disabled") + '._');
      case "set all":
        await setAnti('gc', true);
        await setAnti('dm', true);
        return _0x44457d("_AntiDelete set for all chats._");
      case "status":
        const _0x3bd8d6 = await getAnti('dm');
        const _0x177ca2 = await getAnti('gc');
        return _0x44457d("_AntiDelete Status_\n\n*DM AntiDelete:* " + (_0x3bd8d6 ? "Enabled" : "Disabled") + "\n*Group Chat AntiDelete:* " + (_0x177ca2 ? "Enabled" : 'Disabled'));
      default:
        return _0x44457d("-- *AntiDelete Command Guide: --*\n                • ``.antidelete on`` - Reset AntiDelete for all chats (disabled by default)\n                • ``.antidelete off gc`` - Disable AntiDelete for Group Chats\n                • ``.antidelete off dm`` - Disable AntiDelete for Direct Messages\n                • ``.antidelete set gc`` - Toggle AntiDelete for Group Chats\n                • ``.antidelete set dm`` - Toggle AntiDelete for Direct Messages\n                • ``.antidelete set all`` - Enable AntiDelete for all chats\n                • ``.antidelete status`` - Check current AntiDelete status");
    }
  } catch (_0x4a7927) {
    console.error("Error in antidelete command:", _0x4a7927);
    return _0x44457d("An error occurred while processing your request.");
  }
});
cmd({
  'pattern': "vv3",
  'alias': ["retrive", '🔥'],
  'desc': "Fetch and resend a ViewOnce message content (image/video).",
  'category': "misc",
  'use': "<query>",
  'filename': __filename
}, async (_0x373611, _0x4885db, _0x584ca9, {
  from: _0x1e40c4,
  reply: _0x7d59d5
}) => {
  try {
    const _0x96416c = _0x584ca9.msg.contextInfo.quotedMessage;
    if (_0x96416c && _0x96416c.viewOnceMessageV2) {
      const _0x4e21cf = _0x96416c.viewOnceMessageV2;
      if (_0x4e21cf.message.imageMessage) {
        let _0x3a2a1e = _0x4e21cf.message.imageMessage.caption;
        let _0x470611 = await _0x373611.downloadAndSaveMediaMessage(_0x4e21cf.message.imageMessage);
        return _0x373611.sendMessage(_0x1e40c4, {
          'image': {
            'url': _0x470611
          },
          'caption': _0x3a2a1e
        }, {
          'quoted': _0x4885db
        });
      }
      if (_0x4e21cf.message.videoMessage) {
        let _0x222eae = _0x4e21cf.message.videoMessage.caption;
        let _0x10887c = await _0x373611.downloadAndSaveMediaMessage(_0x4e21cf.message.videoMessage);
        return _0x373611.sendMessage(_0x1e40c4, {
          'video': {
            'url': _0x10887c
          },
          'caption': _0x222eae
        }, {
          'quoted': _0x4885db
        });
      }
      if (_0x4e21cf.message.audioMessage) {
        let _0x3cab01 = await _0x373611.downloadAndSaveMediaMessage(_0x4e21cf.message.audioMessage);
        return _0x373611.sendMessage(_0x1e40c4, {
          'audio': {
            'url': _0x3cab01
          }
        }, {
          'quoted': _0x4885db
        });
      }
    }
    if (!_0x584ca9.quoted) {
      return _0x7d59d5("Please reply to a ViewOnce message.");
    }
    if (_0x584ca9.quoted.mtype === 'viewOnceMessage') {
      if (_0x584ca9.quoted.message.imageMessage) {
        let _0xa5d0a3 = _0x584ca9.quoted.message.imageMessage.caption;
        let _0x2e56ad = await _0x373611.downloadAndSaveMediaMessage(_0x584ca9.quoted.message.imageMessage);
        return _0x373611.sendMessage(_0x1e40c4, {
          'image': {
            'url': _0x2e56ad
          },
          'caption': _0xa5d0a3
        }, {
          'quoted': _0x4885db
        });
      } else {
        if (_0x584ca9.quoted.message.videoMessage) {
          let _0x59aa75 = _0x584ca9.quoted.message.videoMessage.caption;
          let _0x3fd9fa = await _0x373611.downloadAndSaveMediaMessage(_0x584ca9.quoted.message.videoMessage);
          return _0x373611.sendMessage(_0x1e40c4, {
            'video': {
              'url': _0x3fd9fa
            },
            'caption': _0x59aa75
          }, {
            'quoted': _0x4885db
          });
        }
      }
    } else {
      if (_0x584ca9.quoted.message.audioMessage) {
        let _0x2421de = await _0x373611.downloadAndSaveMediaMessage(_0x584ca9.quoted.message.audioMessage);
        return _0x373611.sendMessage(_0x1e40c4, {
          'audio': {
            'url': _0x2421de
          }
        }, {
          'quoted': _0x4885db
        });
      } else {
        return _0x7d59d5("This is not a ViewOnce message.");
      }
    }
  } catch (_0x3ec39f) {
    console.log("Error:", _0x3ec39f);
    _0x7d59d5("An error occurred while fetching the ViewOnce message.");
  }
});
