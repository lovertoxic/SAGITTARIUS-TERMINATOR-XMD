const {ezra} = require('..fredi/ezra');
const path = require('path');
const { cmd } = require('../command');
const { sleep } = require('../lib/functions');

const DATA_PATH = path.resolve(__dirname, '../data/send_data.json');
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, JSON.stringify({
        templates: {},
        sentToday: [],
        dailyCount: 0,
        lastReset: Date.now(),
        reports: []
    }, null, 2));
}
let store = JSON.parse(fs.readFileSync(DATA_PATH));

function saveStore() {
    fs.writeFileSync(DATA_PATH, JSON.stringify(store, null, 2));
}

function resetIfNeeded() {
    const last = new Date(store.lastReset).toDateString();
    const now = new Date().toDateString();
    if (last !== now) {
        store.sentToday = [];
        store.dailyCount = 0;
        store.lastReset = Date.now();
        saveStore();
    }
}

const BRANDING = `
🟦╔════════════════════════════╗🟦
🟦║  🟥████████╗🟩███████╗🟨██████╗  ║🟦
🟦║  🟥╚══██╔══╝🟩██╔════╝🟨██╔══██╗ ║🟦
🟦║     🟥██║   🟩█████╗  🟨██████╔╝ ║🟦
🟦║     🟥██║   🟩██╔══╝  🟨██╔═══╝  ║🟦
🟦║     🟥██║   🟩███████╗🟨██║      ║🟦
🟦║     🟥╚═╝   🟩╚══════╝🟨╚═╝      ║🟦
🟦║       TERAN  •  XMD        ║🟦
🟦╚════════════════════════════╝🟦
`;

/* =========================
   🔹 TEMPLATE COMMANDS
========================= */

// Save template
cmd({
    pattern: "savetemplate",
    react: "💾",
    desc: "Save a broadcast message template",
    category: "owner",
    use: ".savetemplate <name> | <message>",
    filename: __filename
}, async (conn, mek, m, { q, isCreator, reply }) => {
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    if (!q.includes('|')) return reply(`${BRANDING}\n❗ Usage: .savetemplate <name> | <message>`);

    const [name, content] = q.split('|').map(s => s.trim());
    store.templates[name] = content;
    saveStore();
    reply(`${BRANDING}\n✅ Template "${name}" saved!`);
});

// List templates
cmd({
    pattern: "listtemplates",
    react: "📋",
    desc: "List all saved templates",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    const templates = Object.keys(store.templates);
    if (templates.length === 0) return reply(`${BRANDING}\n📭 No templates saved.`);
    let txt = `${BRANDING}\n📋 Saved Templates:\n\n`;
    for (const t of templates) txt += `- ${t}\n`;
    reply(txt);
});

// Delete template
cmd({
    pattern: "deletetemplate",
    react: "❌",
    desc: "Delete a saved template",
    category: "owner",
    use: ".deletetemplate <name>",
    filename: __filename
}, async (conn, mek, m, { q, isCreator, reply }) => {
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    if (!q) return reply(`${BRANDING}\n❗ Usage: .deletetemplate <name>`);
    if (!store.templates[q]) return reply(`${BRANDING}\n⚠️ Template "${q}" not found.`);
    delete store.templates[q];
    saveStore();
    reply(`${BRANDING}\n🗑️ Template "${q}" deleted.`);
});

/* =========================
   🔹 GROUP COMMANDS
========================= */

// List groups
cmd({
    pattern: "listgroups",
    react: "📋",
    desc: "List all groups",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    const groups = await conn.groupFetchAllParticipating();
    let txt = `${BRANDING}\n📋 Groups:\n\n`;
    for (const g of Object.values(groups)) txt += `- ${g.subject}\n`;
    reply(txt);
});

// Broadcast custom message
cmd({
    pattern: "send",
    react: "📢",
    desc: "Broadcast message to multiple groups",
    category: "owner",
    use: ".send Group1,Group2 | Hello!",
    filename: __filename
}, async (conn, mek, m, { q, isCreator, reply }) => {
    resetIfNeeded();
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    if (!q.includes('|')) return reply(`${BRANDING}\n❗ Usage: .send Group1,Group2 | message`);

    const [groupList, messageBody] = q.split('|').map(s => s.trim());
    await broadcastToGroups(conn, groupList, messageBody, reply);
});

// Broadcast saved template
cmd({
    pattern: "sendtemplate",
    react: "📨",
    desc: "Send a saved template to multiple groups",
    category: "owner",
    use: ".sendtemplate <templateName> | Group1,Group2",
    filename: __filename
}, async (conn, mek, m, { q, isCreator, reply }) => {
    resetIfNeeded();
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    if (!q.includes('|')) return reply(`${BRANDING}\n❗ Usage: .sendtemplate <templateName> | Group1,Group2`);

    const [templateName, groupList] = q.split('|').map(s => s.trim());
    if (!store.templates[templateName]) return reply(`${BRANDING}\n⚠️ Template "${templateName}" not found.`);

    const messageBody = store.templates[templateName];
    await broadcastToGroups(conn, groupList, messageBody, reply);
});

// Stop broadcast
cmd({
    pattern: "stopbroadcast",
    react: "🛑",
    desc: "Stop ongoing broadcast",
    category: "owner",
    filename: __filename
}, async (conn, mek, m, { isCreator, reply }) => {
    if (!isCreator) return reply(`${BRANDING}\n🚫 Owner only.`);
    global.broadcastStop = true;
    reply(`${BRANDING}\n🛑 Broadcast stopping...`);
});

/* =========================
   🔹 CORE BROADCAST FUNCTION
========================= */
async function broadcastToGroups(conn, groupList, messageBody, reply) {
    const groupNames = groupList.split(',').map(g => g.trim());
    const greetings = ["Hey 👋", "Hi there 😊", "Hello 🙂", "Good day 🌟"];

    let totalSent = 0, totalFail = 0, startTime = Date.now();
    global.broadcastStop = false;

    let allTargets = [];
    for (const groupName of groupNames) {
        const allGroups = await conn.groupFetchAllParticipating();
        const grp = Object.values(allGroups).find(g => g.subject.toLowerCase() === groupName.toLowerCase());
        if (!grp) continue;
        const meta = await conn.groupMetadata(grp.id);
        const members = meta.participants.map(p => p.id).filter(id => !store.sentToday.includes(id));
        allTargets.push(...members);
    }
    const totalTargets = allTargets.length || 1;

    for (const groupName of groupNames) {
        if (store.dailyCount >= 300) {
            reply(`${BRANDING}\n📛 Daily limit of 300 messages reached.`);
            break;
        }
        if (global.broadcastStop) {
            reply(`${BRANDING}\n🛑 Broadcast stopped.`);
            break;
        }

        const allGroups = await conn.groupFetchAllParticipating();
        const grp = Object.values(allGroups).find(g => g.subject.toLowerCase() === groupName.toLowerCase());
        if (!grp) continue;

        const meta = await conn.groupMetadata(grp.id);
        const members = meta.participants.map(p => p.id).filter(id => !store.sentToday.includes(id));

        for (const userId of members) {
            if (store.dailyCount >= 300 || global.broadcastStop) break;

            await conn.sendPresenceUpdate('composing', userId);
            await sleep(Math.floor(Math.random() * 2000) + 2000);

            const greeting = greetings[Math.floor(Math.random() * greetings.length)];
            const text = `${greeting}\n${messageBody}`;

            try {
                await conn.sendMessage(userId, { text });
                store.sentToday.push(userId);
                store.dailyCount++;
                totalSent++;
            } catch {
                totalFail++;
            }

            saveStore();

            const progress = ((totalSent + totalFail) / totalTargets * 100).toFixed(1);
            await reply(`${BRANDING}\n📊 Progress: ${progress}%\n✅ Sent: ${totalSent}\n❌ Failed: ${totalFail}\n📤 Daily: ${store.dailyCount}/300`);
        }
    }

    const elapsed = ((Date.now() - startTime) / 1000).toFixed(1);
    reply(`${BRANDING}\n✅ Broadcast complete!\n🕒 Time: ${elapsed}s\n📤 Sent: ${totalSent}\n❌ Failed: ${totalFail}`);
}
