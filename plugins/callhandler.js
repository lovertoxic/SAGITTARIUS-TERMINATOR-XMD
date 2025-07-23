// lib/callhandler.js
const settingsManager = require('./settingsmanager'); // Essential to get live settings

/**
 * Handles incoming WhatsApp calls, rejects them, and sends a warning message.
 * @param {import('@whiskeysockets/baileys').WASocket} conn Baileys WhatsApp connection object.
 */
module.exports = (conn) => { // Removed the 'anticallEnabled' parameter
    conn.ev.on('call', async (callData) => {
        // --- THIS IS THE CRUCIAL LINE ---
        // It must check settingsManager.getSetting('ANTICALL') for the live status
        if (!settingsManager.getSetting('ANTICALL')) {
            console.log("[ANTICALL] Call received but feature is OFF. Ignoring.");
            return; // If ANTICALL is false, just stop here and don't reject
        }
        // --- END CRUCIAL LINE ---

        for (const call of callData) {
            if (call.status === 'offer') {
                const callerId = call.from;

                // Reject the call
                await conn.rejectCall(call.id, callerId);

                // Send warning message to caller
                await conn.sendMessage(callerId, {
                    text: `🚫 *Auto Call Rejection!*\n\ndear customer the person you are trying to owner you're trying to call is not in service please hold or call back later sir bravin .`,
                });

                // Log the event
                console.log(`[ANTICALL] Rejected call from: ${callerId}`);
            }
        }
    });

    console.log("[ANTICALL] Call handler loaded.");
};
