const {
  cmd
} = require('../command');
const yts = require("yt-search");
const axios = require("axios");
cmd({
  'pattern': "play1",
  'alias': ['yt', "song", "video", 'audio'],
  'desc': "Download YouTube videos",
  'category': "download",
  'filename': __filename
}, async (_0x5f509f, _0x436346, _0x17de9d, {
  from: _0x38979c,
  quoted: _0x32fd7c,
  args: _0x2f3fc1,
  q: _0x9fc51b,
  reply: _0xaa7bc7
}) => {
  try {
    if (!_0x9fc51b) {
      return _0xaa7bc7("*`Please provide a YouTube link or title!`*");
    }
    await _0x5f509f.sendMessage(_0x38979c, {
      'react': {
        'text': '⏳',
        'key': _0x436346.key
      }
    });
    let _0x400fae = _0x9fc51b;
    let _0x3c2bbc = null;
    let _0x43acbf = null;
    if (!_0x9fc51b.startsWith("https://")) {
      const _0x3604ab = await yts(_0x9fc51b);
      if (!_0x3604ab.videos.length) {
        return _0xaa7bc7("*No results found!*");
      }
      _0x3c2bbc = _0x3604ab.videos[0x0];
      _0x400fae = _0x3c2bbc.url;
      _0x43acbf = _0x3c2bbc.videoId;
    } else {
      const _0x1dd079 = _0x9fc51b.match(/(?:youtu\.be\/|youtube\.com\/(?:.*v=|.*\/|.*vi?=))([^&?/\s]+)/);
      _0x43acbf = _0x1dd079 ? _0x1dd079[0x1] : null;
    }
    const {
      data: _0x49c47e
    } = await axios.get("https://apis.davidcyriltech.my.id/download/ytmp4?url=" + _0x400fae);
    if (!_0x49c47e.status) {
      return _0xaa7bc7("*Failed to fetch video!*");
    }
    const _0x2551bf = _0x3c2bbc || {
      'title': _0x49c47e.data.title,
      'thumbnail': _0x43acbf ? "https://i.ytimg.com/vi/" + _0x43acbf + "/maxresdefault.jpg" : null,
      'timestamp': "Unknown",
      'author': "Unknown",
      'views': 'Unknown',
      'ago': "Unknown"
    };
    const _0x202373 = "╭━━━〔 *YT DOWNLOADER* 〕━━━⊷\n" + ("┃ 📌 *Title:* " + _0x2551bf.title + "\n") + ("┃ 🎭 *Channel:* " + (_0x2551bf.author.name || "Unknown") + "\n") + ("┃ 👁‍🗨 *Views:* " + _0x2551bf.views + "\n") + ("┃ 🕒 *Uploaded:* " + _0x2551bf.ago + "\n") + ("┃ ⏳ *Duration:* " + _0x2551bf.timestamp + "\n") + "╰━━━━━━━━━━━━━━━⪼\n\n" + "🎬 *Download Options:*\n" + "1️⃣  *Video*\n" + "2️⃣  *Document*\n" + "3️⃣  *Audio*\n\n" + "📌 *Reply with the number to download in your choice.*";
    const _0x1ad66e = await _0x5f509f.sendMessage(_0x38979c, {
      'image': {
        'url': _0x2551bf.thumbnail || 'https://i.ibb.co/W4xhtdW8/nexus-xmd.jpg'
      },
      'caption': _0x202373,
      'contextInfo': {
        'mentionedJid': [_0x436346.sender],
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': "120363366284524544@newsletter",
          'newsletterName': "💥sir bravin 💥",
          'serverMessageId': 0x8f
        }
      }
    }, {
      'quoted': _0x436346
    });
    const _0x498931 = _0x1ad66e.key.id;
    _0x5f509f.ev.on("messages.upsert", async _0x2ad3da => {
      const _0x42d76c = _0x2ad3da.messages[0x0];
      if (!_0x42d76c.message) {
        return;
      }
      const _0x5fc4f8 = _0x42d76c.message.conversation || _0x42d76c.message.extendedTextMessage?.['text'];
      const _0x296231 = _0x42d76c.key.remoteJid;
      const _0x321266 = _0x42d76c.message.extendedTextMessage?.["contextInfo"]?.['stanzaId'] === _0x498931;
      if (_0x321266) {
        await _0x5f509f.sendMessage(_0x296231, {
          'react': {
            'text': '⬇️',
            'key': _0x42d76c.key
          }
        });
        let _0x3654d3 = _0x49c47e.data.url;
        switch (_0x5fc4f8) {
          case '1':
            await _0x5f509f.sendMessage(_0x296231, {
              'video': {
                'url': _0x3654d3
              },
              'caption': '*sir bravin*'
            }, {
              'quoted': _0x42d76c
            });
            break;
          case '2':
            await _0x5f509f.sendMessage(_0x296231, {
              'document': {
                'url': _0x3654d3
              },
              'mimetype': "video/mp4",
              'fileName': _0x2551bf.title + ".mp4",
              'caption': "*🔥 sir bravin 🔥*"
            }, {
              'quoted': _0x42d76c
            });
            break;
          case '3':
            await _0x5f509f.sendMessage(_0x296231, {
              'audio': {
                'url': _0x3654d3
              },
              'mimetype': "audio/mpeg"
            }, {
              'quoted': _0x42d76c
            });
            break;
          default:
            _0xaa7bc7("❌ Invalid option! Please reply with 1, 2, or 3.");
        }
        await _0x5f509f.sendMessage(_0x296231, {
          'react': {
            'text': '✅',
            'key': _0x42d76c.key
          }
        });
      }
    });
  } catch (_0x56ae2b) {
    console.log(_0x56ae2b);
    _0xaa7bc7("⚠️ *Error fetching video!*");
  }
});
