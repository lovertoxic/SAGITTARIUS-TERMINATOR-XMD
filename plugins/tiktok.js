const { ezra } = require('../fredi/ezra');
const axios = require("axios");

// tiktok
ezra({
  nomCom: "tiktoksearch",
  aliases: ["tiksearch", "tiktoklist"],
  categorie: "Search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Check if there is a query in the arguments
  if (!arg || !arg[0]) {
    return repondre('🤦Please provide a query!');
  }

  try {
    // URL for the TikTok search API
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/tiktoksearch?text=${encodeURIComponent(arg.join(' '))}`;
    const response = await axios.get(searchApiUrl);

    // Check if response data is valid and contains search results
    const searchData = response.data.data;
    if (!searchData || searchData.length === 0) {
      return repondre("❌No TikTok search results found.");
    }

    // Construct TikTok search message
    let searchMessage = `乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD PLANET TIKTOK SEARCH\n\n`;

    // Loop through search results and construct track info with numbers
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*${trackNumber}.* ${track.title}\n`;
      searchMessage += `*Region*: ${track.region || "Unknown"}\n`;
      searchMessage += `*ID*: ${track.id}\n`;  // `id` is the video ID
      searchMessage += `*Video URL*: ${track.url}\n`;
      searchMessage += `*Cover Image*: ${track.cover}\n`;
      searchMessage += `*Views*: ${track.views || 0}\n`;
      searchMessage += `*Likes*: ${track.likes || 0}\n`;
      searchMessage += `*Comments*: ${track.comments || 0}\n`;
      searchMessage += `*Shares*: ${track.share || 0}\n`;
      searchMessage += `*Download Count*: ${track.download || 0}\n`;
      searchMessage += `────────────────\n\n`;
    });

    // Send the playlist message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir bravo",
         serverMessageId: 143,
          },
        },
      },
    );
  } catch (error) {
    // Log and respond with error message
    console.error(error);  // Log the error to the console
    repondre(`❌Error: ${error.message || 'Something went wrong.'}`);
  }
});

// Twitter 
ezra({
  nomCom: "twittersearch",
  aliases: ["xsearch", "twitterlist", "tweetsearch", "xsearch"],
  categorie: "Fredi-Search",
  reaction: "📽️"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg } = commandeOptions;

  // Ensure a query is provided in the arguments
  if (!arg[0]) {
    return repondre('🤦 Please provide a thing!');
  }

  try {
    // Define the search API URL
    const searchApiUrl = `https://apis-starlights-team.koyeb.app/starlight/Twitter-Posts?text=${encodeURIComponent(arg[0])}`;
    const response = await axios.get(searchApiUrl);
    const searchData = response.data.result;  // Assuming 'result' contains an array of tweets

    // Check if no results are found
    if (!searchData || searchData.length === 0) {
      return repondre("❌No Twitter search results found.");
    }

    // Construct the search message
    let searchMessage = `sir terminator PLANET TWITTER SEARCH\n\n`;
    searchMessage += `Creator: ${response.data.creator}\n\n`;  // Include the creator info

    // Loop through search results and append details to the message
    searchData.forEach((track, index) => {
      const trackNumber = index + 1; // Number tracks starting from 1
      searchMessage += `*${trackNumber}.* ${track.user}\n`;
      searchMessage += `*Profile*: ${track.profile || "Unknown"}\n`;
      searchMessage += `*Post*: ${track.post}\n`;  // The text of the tweet
      searchMessage += `*User Link*: ${track.user_link}\n`;  // Link to the user's profile
      searchMessage += `──────────────\n\n`;
    });

    // Send the search result message
    await zk.sendMessage(
      dest,
      {
        text: searchMessage,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir bravin",
         serverMessageId: 143,
          },
        },
      }
    );
  } catch (error) {
    // Log and respond with the error message
    console.error(error);  // Log the error to the console
    repondre(`❌Error: ${error.message || 'Something went wrong.'}`);
  }
});
