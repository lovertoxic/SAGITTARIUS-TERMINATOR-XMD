const axios = require('axios');
const {
  cmd
} = require("../command");
cmd({
  'pattern': "tempmail",
  'alias': ["genmail"],
  'desc': "Generate a new temporary email address",
  'category': "utility",
  'react': '📧',
  'filename': __filename
}, async (_0x1b59b6, _0x1ce0e8, _0x300bb4, {
  from: _0x2aa868,
  reply: _0x447fb2,
  prefix: _0x1ed4b3
}) => {
  try {
    const _0x378e30 = await axios.get('https://apis.davidcyriltech.my.id/temp-mail');
    const {
      email: _0x4d1f87,
      session_id: _0x4fcb9f,
      expires_at: _0x4509d2
    } = _0x378e30.data;
    const _0x553f37 = new Date(_0x4509d2);
    const _0x1d7e2d = _0x553f37.toLocaleTimeString("en-US", {
      'hour': "2-digit",
      'minute': "2-digit",
      'hour12': true
    });
    const _0x890438 = _0x553f37.toLocaleDateString("en-US", {
      'weekday': 'short',
      'month': "short",
      'day': "numeric",
      'year': "numeric"
    });
    const _0x3e8b76 = "\n📧 *TEMPORARY EMAIL GENERATED*\n\n✉️ *Email Address:*\n" + _0x4d1f87 + "\n\n⏳ *Expires:*\n" + _0x1d7e2d + " • " + _0x890438 + "\n\n🔑 *Session ID:*\n```" + _0x4fcb9f + "```\n\n📥 *Check Inbox:*\n.inbox " + _0x4fcb9f + "\n\n_Email will expire after 24 hours_\n";
    await _0x1b59b6.sendMessage(_0x2aa868, {
      'text': _0x3e8b76,
      'contextInfo': {
        'forwardingScore': 0x3e7,
        'isForwarded': true,
        'forwardedNewsletterMessageInfo': {
          'newsletterJid': '120363366284524544@newsletter',
          'newsletterName': "TempMail Service",
          'serverMessageId': 0x65
        }
      }
    }, {
      'quoted': _0x1ce0e8
    });
  } catch (_0x3537d3) {
    console.error("TempMail error:", _0x3537d3);
    _0x447fb2("❌ Error: " + _0x3537d3.message);
  }
});
cmd({
  'pattern': "checkmail",
  'alias': ["inbox", "tmail", 'mailinbox'],
  'desc': "Check your temporary email inbox",
  'category': "utility",
  'react': '📬',
  'filename': __filename
}, async (_0x91bebb, _0xce4b1f, _0x11005a, {
  from: _0xd06434,
  reply: _0xac9a89,
  args: _0x412a84
}) => {
  try {
    const _0x5ae9cd = _0x412a84[0x0];
    if (!_0x5ae9cd) {
      return _0xac9a89("🔑 Please provide your session ID\nExample: .checkmail YOUR_SESSION_ID");
    }
    const _0xa1bb36 = "https://apis.davidcyriltech.my.id/temp-mail/inbox?id=" + encodeURIComponent(_0x5ae9cd);
    const _0x321e56 = await axios.get(_0xa1bb36);
    if (!_0x321e56.data.success) {
      return _0xac9a89("❌ Invalid session ID or expired email");
    }
    const {
      inbox_count: _0x2239b2,
      messages: _0x3a9e02
    } = _0x321e56.data;
    if (_0x2239b2 === 0x0) {
      return _0xac9a89("📭 Your inbox is empty");
    }
    let _0xfb19fc = "📬 *You have " + _0x2239b2 + " message(s)*\n\n";
    _0x3a9e02.forEach((_0x4972ce, _0x312c8b) => {
      _0xfb19fc += "━━━━━━━━━━━━━━━━━━\n" + ("📌 *Message " + (_0x312c8b + 0x1) + "*\n") + ("👤 *From:* " + _0x4972ce.from + "\n") + ("📝 *Subject:* " + _0x4972ce.subject + "\n") + ("⏰ *Date:* " + new Date(_0x4972ce.date).toLocaleString() + "\n\n") + ("📄 *Content:*\n" + _0x4972ce.body + "\n\n");
    });
    await _0xac9a89(_0xfb19fc);
  } catch (_0x16a29d) {
    console.error("CheckMail error:", _0x16a29d);
    _0xac9a89("❌ Error checking inbox: " + (_0x16a29d.response?.['data']?.["message"] || _0x16a29d.message));
  }
});
