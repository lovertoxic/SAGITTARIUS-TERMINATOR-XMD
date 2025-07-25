const { cmd } = require('../command');
const fs = require('fs');
const path = require('path');
const { default: makeWASocket, useSingleFileAuthState, DisconnectReason } = require("@whiskeysockets/baileys");

cmd({
  pattern: "anticall",
  desc: "Toggle auto reject & block calls",
  category: "system",
  filename: __filename,
  use: '.anticall on / off'
}, async (Void, m, text) => {

  const settingPath = path.join(__dirname, '../config.js');

  const fakeContact = {
    key: {
      fromMe: false,
      participant: '0@s.whatsapp.net',
      remoteJid: 'status@broadcast'
    },
    message: {
      contactMessage: {
        displayName: "sir bravin SYSTEM",
        vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:sir bravin SYSTEM\nORG:sir bravin;\nTEL;type=CELL;type=VOICE;waid=254700000000:+254700000000\nEND:VCARD"
      }
    }
  };

  const newState = text.trim().toLowerCase();
  if (!["on", "off"].includes(newState)) {
    return await Void.sendMessage(m.chat, {
      text: `*Anti-Call Toggle*

Usage: 
*.anticall on* – Reject & Block Calls
*.anticall off* – Disable Call Protection`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "sir bravin SECURITY",
          body: "Call Blocker Control",
          thumbnailUrl: "https://files.catbox.moe/9bclq1.jpg",
          sourceUrl: "https://github.com/lovertoxic/TOXIC-LOVER-V2-XMD",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363366284524544@newsletter",
          newsletterName: "sir bravin Bot Updates",
          serverMessageId: "77"
        }
      },
      quoted: fakeContact
    });
  }

  try {
    let configData = fs.readFileSync(settingPath, 'utf8');
    const updated = configData.replace(/global\.ANTICALL1\s*=\s*(true|false)/, `global.ANTICALL1 = ${newState === "on"}`);
    fs.writeFileSync(settingPath, updated, 'utf8');

    await Void.sendMessage(m.chat, {
      text: `✅ Anti-Call system has been turned *${newState.toUpperCase()}* successfully.\n\nAll calls will be *${newState === "on" ? "rejected and blocked*" : "ignored*"} now.`,
      contextInfo: {
        forwardingScore: 999,
        isForwarded: true,
        externalAdReply: {
          title: "sir bravin SECURITY",
          body: `AntiCall: ${newState.toUpperCase()}`,
          thumbnailUrl: ".https://files.catbox.moe/9bclq1.jpg",
          sourceUrl: "https://github.com/mejjar00254/PK-XMD",
          mediaType: 1,
          renderLargerThumbnail: true,
          showAdAttribution: true
        },
        mentionedJid: [m.sender],
        forwardedNewsletterMessageInfo: {
          newsletterJid: "120363366284524544@newsletter",
          newsletterName: "sir bravin Bot Updates",
          serverMessageId: "78"
        }
      },
      quoted: fakeContact
    });
  } catch (e) {
    console.error(e);
    await Void.sendMessage(m.chat, { text: "❌ Failed to update anticall setting. Check config.js permission." }, { quoted: m });
  }
});
      
