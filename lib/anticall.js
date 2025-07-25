const { isAntiCallEnabled } = require('../data/AntiCallDB');
const { sleep } = require('./functions');

module.exports = async function AntiCallHandler(conn, callData) {
    const call = callData[0];
    const from = call.from;

    if (!isAntiCallEnabled(from)) return;

    const reason = `🚫 You called the bot.\nCalls are not allowed. You will be blocked.`;
    await conn.sendMessage(from, { text: reason });
    
    await sleep(5000);
    await conn.updateBlockStatus(from, "block");
    console.log(`[ANTICALL] Blocked ${from} for calling.`);
};
