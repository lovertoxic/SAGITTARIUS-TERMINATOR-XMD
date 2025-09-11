const axios = require("axios");
const { ezra } = require("../fredi/ezra");

// Request Jokes 
ezra({
  nomCom: "joke",
  aliases: ["jokeapi", "getjoke"],
  desc: "Fetch a random joke from JokeAPI.",
  categorie: "Fun",
  reaction: '🤭',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return repondre("❌ Error fetching joke. Please try again later.");
    }

    let jokeMessage = `😂 *☢️乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD ☢️ random Joke:*\n\n${data.joke}\n\n`;
    jokeMessage += `🤷 *Category:* ${data.category}\n`;
    jokeMessage += `🤭 *Safe:* ${data.safe}\n`;
    jokeMessage += `*ID:* ${data.id}\n`;

    repondre(jokeMessage);
  } catch (error) {
    console.error("Error fetching joke:", error);
    repondre("❌ Error fetching joke. Please try again later.");
  }
});


ezra({
  nomCom: "randomjoke",
  aliases: ["jokeap"],
  desc: "Fetch a random joke from JokeAPI.",
  categorie: "Fun",
  reaction: '🤭',
}, async (dest, zk, context) => {
  const { repondre } = context;

  try {
    const apiUrl = "https://v2.jokeapi.dev/joke/Any?type=single";
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data.error) {
      return repondre("❌ Error fetching joke. Please try again later.");
    }

    let jokeMessage = `😂 *☢️乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD☢️ random Joke:*\n\n${data.joke}\n\n`;
    jokeMessage += `🤷 *Category:* ${data.category}\n`;
    jokeMessage += `🤭 *Safe:* ${data.safe}\n`;
    jokeMessage += `*ID:* ${data.id}\n`;

    repondre(jokeMessage);
  } catch (error) {
    console.error("Error fetching joke:", error);
    repondre("❌ Error fetching joke. Please try again later.");
  }
});
