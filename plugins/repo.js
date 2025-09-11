'use strict';

const {
  ezra
} = require("../fredi/ezra");
const axios = require("axios");
const moment = require("moment-timezone");
const set = require(__dirname + "/../set");
moment.tz.setDefault('' + set.TIMEZONE);
ezra({
  'nomCom': "ping3",
  'categorie': "General-braviii"
}, async (_0x72e714, _0x36286d, _0x2f6f18) => {
  let {
    ms: _0x2bb02d
  } = _0x2f6f18;
  const {
    time: _0x4e1d22,
    date: _0x1b450d
  } = {
    'time': moment().format("HH:mm:ss"),
    'date': moment().format("DD/MM/YYYY")
  };
  const _0x21013e = Math.floor(Math.random() * 100) + 1;
  try {
    await _0x36286d.sendMessage(_0x72e714, {
      'audio': {
        'url': "https://files.catbox.moe/4k9bit.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363366284524544@newsletter",
          'newsletterName': "toxic lover",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "toxic lover",
          'body': "⚫ Pong: " + _0x21013e + "ms\n📅 *Date:* " + _0x1b450d + "\n⏰ *Time:* " + _0x4e1d22,
          'thumbnailUrl': "https://files.catbox.moe/a4q16k.jpg",
          'mediaType': 0x1,
          'renderSmallThumbnail': true
        }
      }
    }, {
      'quoted': _0x2bb02d
    });
  } catch (_0x5c09a2) {
    console.log("❌ Ping Command Error: " + _0x5c09a2);
    repondre("❌ Error: " + _0x5c09a2);
  }
});
ezra({
  'nomCom': "repo",
  'categorie': "General-Fredi",
  'reaction': '🫧',
  'nomFichier': __filename
}, async (_0x1e08fe, _0x16c249, _0x544c94) => {
  const {
    pushname: _0x48eea6,
    repondre: _0x1843be
  } = _0x544c94;
  try {
    const _0x273ae5 = await axios.get("https://github.com/lovertoxic/SAGITTARIUS-TERMINATOR-XMD");
    const _0x540861 = _0x273ae5.data;
    const _0x5abda2 = moment(_0x540861.updated_at).format("DD/MM/YYYY");
    const _0xb0dc07 = "\nThis is\n\n> TERMINATOR-XMD\n\n*Don't forget fork and star repo*\n\n> *sᴛᴀʀs:* " + _0x540861.stargazers_count + "\n> *Forks:* " + _0x540861.forks_count + "\n> *Watchera:* " + _0x540861.watchers + "\n> *Updated:* " + _0x5abda2 + "\n> *Repo Link:*" + _0x540861.html_url + "*\n\n®";
    await _0x16c249.sendMessage(_0x1e08fe, {
      'image': {
        'url': "https://files.catbox.moe/a4q16k.jpg"
      },
      'caption': _0xb0dc07,
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363366284524544@newsletter",
          'newsletterName': "sir bravin",
          'serverMessageId': 0x8f
        },
        'forwardingScore': 0x3e7,
        'externalAdReply': {
          'title': "JEEPERS CREEPER-XMD",
          'body': "💖repo link request 💖",
          'thumbnailUrl': "https://files.catbox.moe/a4q16k.jpg",
          'mediaType': 0x1,
          'mediaUrl': '',
          'sourceUrl': ''
        }
      }
    });
    await _0x16c249.sendMessage(_0x1e08fe, {
      'audio': {
        'url': "https://files.catbox.moe/4k9bit.mp3"
      },
      'mimetype': "audio/mp4",
      'ptt': true,
      'caption': "*🩸 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD repo song 🩸",
      'contextInfo': {
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363366284524544@newsletter",
          'newsletterName': "sir bravin",
          'serverMessageId': -1
        }
      }
    });
  } catch (_0x24b701) {
    console.log("Error fetching data:", error);
    _0x1843be("❌ Error fetching repository data. Please try again later.");
  }
});
