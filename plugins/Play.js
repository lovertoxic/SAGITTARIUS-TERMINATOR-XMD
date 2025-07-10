const {
  cmd
} = require("../command");
const {
  ytsearch
} = require("@dark-yasiya/yt-dl.js");
cmd({
  'pattern': "mp4",
  'alias': ["video"],
  'react': '🎥',
  'desc': "Download YouTube video",
  'category': "main",
  'use': ".mp4 < Yt url or Name >",
  'filename': __filename
}, async (_0x1eb94b, _0x5c0cda, _0xde66ad, {
  from: _0x2932ce,
  prefix: _0x3895e4,
  quoted: _0xf5e70c,
  q: _0x2d7f32,
  reply: _0x3c9e68
}) => {
  try {
    if (!_0x2d7f32) {
      return await _0x3c9e68("Please provide a YouTube URL or song name.");
    }
    const _0x522dd4 = await ytsearch(_0x2d7f32);
    if (_0x522dd4.results.length < 0x1) {
      return _0x3c9e68("No results found!");
    }
    let _0x20f9ec = _0x522dd4.results[0x0];
    let _0x32ba90 = "https://apis.davidcyriltech.my.id/download/ytmp4?url=" + encodeURIComponent(_0x20f9ec.url);
    let _0x2786a0 = await fetch(_0x32ba90);
    let _0x67d16c = await _0x2786a0.json();
    if (_0x67d16c.status !== 0xc8 || !_0x67d16c.success || !_0x67d16c.result.download_url) {
      return _0x3c9e68("Failed to fetch the video. Please try again later.");
    }
    let _0x44e46f = "📹 *Video Details*\n🎬 *Title:* " + _0x20f9ec.title + "\n⏳ *Duration:* " + _0x20f9ec.timestamp + "\n👀 *Views:* " + _0x20f9ec.views + "\n👤 *Author:* " + _0x20f9ec.author.name + "\n🔗 *Link:* " + _0x20f9ec.url + "\n\n*Choose download format:*\n1. 📄 Document (no preview)\n2. ▶️ Normal Video (with preview)\n\n_Reply to this message with 1 or 2 to download._";
    let _0xd42b07 = {
      'mentionedJid': [_0xde66ad.sender],
      'forwardingScore': 0x3e7,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': '120363366284524544@newsletter',
        'newsletterName': "sir bravin",
        'serverMessageId': 0x8f
      }
    };
    const _0x2a435a = await _0x1eb94b.sendMessage(_0x2932ce, {
      'image': {
        'url': _0x20f9ec.thumbnail
      },
      'caption': _0x44e46f,
      'contextInfo': _0xd42b07
    }, {
      'quoted': _0x5c0cda
    });
    _0x1eb94b.ev.on("messages.upsert", async _0x14d63c => {
      const _0x25a265 = _0x14d63c.messages[0x0];
      if (!_0x25a265.message || !_0x25a265.message.extendedTextMessage) {
        return;
      }
      const _0xea36d6 = _0x25a265.message.extendedTextMessage.text.trim();
      if (_0x25a265.message.extendedTextMessage.contextInfo && _0x25a265.message.extendedTextMessage.contextInfo.stanzaId === _0x2a435a.key.id) {
        await _0x1eb94b.sendMessage(_0x2932ce, {
          'react': {
            'text': '⬇️',
            'key': _0x25a265.key
          }
        });
        switch (_0xea36d6) {
          case '1':
            await _0x1eb94b.sendMessage(_0x2932ce, {
              'document': {
                'url': _0x67d16c.result.download_url
              },
              'mimetype': 'video/mp4',
              'fileName': _0x20f9ec.title + ".mp4",
              'contextInfo': _0xd42b07
            }, {
              'quoted': _0x25a265
            });
            break;
          case '2':
            await _0x1eb94b.sendMessage(_0x2932ce, {
              'video': {
                'url': _0x67d16c.result.download_url
              },
              'mimetype': "video/mp4",
              'contextInfo': _0xd42b07
            }, {
              'quoted': _0x25a265
            });
            break;
          default:
            await _0x1eb94b.sendMessage(_0x2932ce, {
              'text': "*Please Reply with ( 1 , 2 or 3) ❤️"
            }, {
              'quoted': _0x25a265
            });
            break;
        }
      }
    });
  } catch (_0x4650c1) {
    console.log(_0x4650c1);
    _0x3c9e68("An error occurred. Please try again later.");
  }
});
cmd({
  'pattern': "song",
  'alias': ["ytdl3", "playy"],
  'react': '🎶',
  'desc': "Download YouTube song",
  'category': 'main',
  'use': ".song < Yt url or Name >",
  'filename': __filename
}, async (_0x4a6179, _0x2e1f64, _0xe26a5e, {
  from: _0x19f89a,
  prefix: _0xabbef6,
  quoted: _0x255adb,
  q: _0x1a782b,
  reply: _0x3b80b6
}) => {
  try {
    if (!_0x1a782b) {
      return await _0x3b80b6("Please provide a YouTube URL or song name.");
    }
    const _0x21470f = await ytsearch(_0x1a782b);
    if (_0x21470f.results.length < 0x1) {
      return _0x3b80b6("No results found!");
    }
    let _0x507698 = _0x21470f.results[0x0];
    let _0x2820f1 = "https://apis.davidcyriltech.my.id/youtube/mp3?url=" + encodeURIComponent(_0x507698.url);
    let _0x406b69 = await fetch(_0x2820f1);
    let _0x1657e2 = await _0x406b69.json();
    if (_0x1657e2.status !== 0xc8 || !_0x1657e2.success || !_0x1657e2.result.downloadUrl) {
      return _0x3b80b6("Failed to fetch the audio. Please try again later.");
    }
    let _0x556826 = "🎵 *Song Details*\n🎶 *Title:* " + _0x507698.title + "\n⏳ *Duration:* " + _0x507698.timestamp + "\n👀 *Views:* " + _0x507698.views + "\n👤 *Author:* " + _0x507698.author.name + "\n🔗 *Link:* " + _0x507698.url + "\n\n*Choose download format:*\n1. 📄 MP3 as Document\n2. 🎧 MP3 as Audio (Play)\n3. 🎙️ MP3 as Voice Note (PTT)\n\n_Reply with 1, 2 or 3 to this message to download the format you prefer._";
    let _0x3c4ac6 = {
      'mentionedJid': [_0xe26a5e.sender],
      'forwardingScore': 0x3e7,
      'isForwarded': true,
      'forwardedNewsletterMessageInfo': {
        'newsletterJid': '120363366284524544@newsletter',
        'newsletterName': "sir bravin",
        'serverMessageId': 0x8f
      }
    };
    const _0x1f2ac5 = await _0x4a6179.sendMessage(_0x19f89a, {
      'image': {
        'url': _0x507698.thumbnail
      },
      'caption': _0x556826,
      'contextInfo': _0x3c4ac6
    }, {
      'quoted': _0x2e1f64
    });
    _0x4a6179.ev.on("messages.upsert", async _0x8e2cdf => {
      const _0x41fc33 = _0x8e2cdf.messages[0x0];
      if (!_0x41fc33.message || !_0x41fc33.message.extendedTextMessage) {
        return;
      }
      const _0xab2057 = _0x41fc33.message.extendedTextMessage.text.trim();
      if (_0x41fc33.message.extendedTextMessage.contextInfo && _0x41fc33.message.extendedTextMessage.contextInfo.stanzaId === _0x1f2ac5.key.id) {
        await _0x4a6179.sendMessage(_0x19f89a, {
          'react': {
            'text': '⬇️',
            'key': _0x41fc33.key
          }
        });
        switch (_0xab2057) {
          case '1':
            await _0x4a6179.sendMessage(_0x19f89a, {
              'document': {
                'url': _0x1657e2.result.downloadUrl
              },
              'mimetype': "audio/mpeg",
              'fileName': _0x507698.title + ".mp3",
              'contextInfo': _0x3c4ac6
            }, {
              'quoted': _0x41fc33
            });
            break;
          case '2':
            await _0x4a6179.sendMessage(_0x19f89a, {
              'audio': {
                'url': _0x1657e2.result.downloadUrl
              },
              'mimetype': "audio/mpeg",
              'contextInfo': _0x3c4ac6
            }, {
              'quoted': _0x41fc33
            });
            break;
          case '3':
            await _0x4a6179.sendMessage(_0x19f89a, {
              'audio': {
                'url': _0x1657e2.result.downloadUrl
              },
              'mimetype': "audio/mpeg",
              'ptt': true,
              'contextInfo': _0x3c4ac6
            }, {
              'quoted': _0x41fc33
            });
            break;
          default:
            await _0x4a6179.sendMessage(_0x19f89a, {
              'text': "*invalid selection please select between ( 1 or 2 or 3) 🔴*"
            }, {
              'quoted': _0x41fc33
            });
        }
      }
    });
  } catch (_0x49c63b) {
    console.log(_0x49c63b);
    _0x3b80b6("An error occurred. Please try again later.");
  }
});
