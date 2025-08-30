const { ezra } = require("../fredi/ezra");

// 
let botMessages = {};

ezra(
  {
    nomCom: "clear",
    categorie: "new",
    reaction: "⚡",
  },
  async (dest, zk, commandeOptions) => {
    const { repondre, ms } = commandeOptions;

    // Initialize message tracking for this chat if not already
    if (!botMessages[dest]) {
      botMessages[dest] = [];
    }

    try {
      // Send initial message and store its key
      const message = await zk.sendMessage(
        dest,
        { text: "Clearing bot message in this chat..." },
        { quoted: ms }
      );
      botMessages[dest].push(message.key);

      // Delete all tracked bot messages in this chat
      let deletedCount = 0;
      for (const key of botMessages[dest]) {
        try {
          await zk.sendMessage(dest, { delete: key });
          deletedCount++;
          // Small delay to avoid rate limits
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (e) {
          console.error("Failed to delete message:", e);
        }
      }

      // Clear the tracked messages after deletion
      botMessages[dest] = [];

      // Send confirmation (won't be tracked to avoid infinite loop)
      await zk.sendMessage(
        dest,
        {
          text: `Success cleared ${deletedCount} bot message ${deletedCount === 1 ? "" : "𝐻"}!\n\n> Powered by FredieTech`,
        },
        { quoted: ms }
      );
    } catch (error) {
      console.error("Error clearing messages:", error);
      repondre(
        `An errors cleaning: ${error.message}`
      );
    }
  }
);

module.exports = { ezra };
