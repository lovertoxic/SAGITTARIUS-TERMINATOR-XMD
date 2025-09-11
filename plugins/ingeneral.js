
const { ezra } = require('../fredi/ezra');
const axios = require('axios');
const wiki = require('wikipedia');
const conf = require(__dirname + "/../set");

ezra({
  nomCom: "technews",
  reaction: '📰',
  categorie: 'New'
}, async (dest, zk, context) => {
  const { repondre, ms } = context;

  try {
    // Fetching tech news from the API
    const response = await axios.get("https://fantox001-scrappy-api.vercel.app/technews/random");
    const data = response.data;
    const { thumbnail, news } = data;

    await zk.sendMessage(dest, {
      text: news,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir bravin",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching tech news:", error);
    await repondre("Sorry, there was an error retrieving the news. Please try again later.\n" + error);
  }
});


ezra({
  nomCom: "bible",
  reaction: '📖',
  categorie: "God"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const reference = arg.join(" ");
  
  if (!reference) {
    return repondre("Please specify the book, chapter, and verse you want to read. Example: bible Mathew 3:16", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir terminator",
         serverMessageId: 143,
        },
      },
    });
  }
  
  try {
    const response = await axios.get(`https://bible-api.com/${reference}`);
    
    if (!response.data) {
      return repondre("Invalid reference. Example: bible mathew 3:16", {
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@terminator",
         serverMessageId: 143,
          },
        },
      });
    }
    
    const data = response.data;
    const messageText = `
📖 ☢️乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD☢️ HOLY BIBLE 📖

⁠ *_WE'RE READING:_* ${data.reference}

⁠ *_NUMBER OF VERSES:_* ${data.verses.length}

⁠ *_NOW READ:_* ${data.text}

⁠ *_LANGUAGE:_* ${data.translation_name}
 `;
    
    await zk.sendMessage(dest, {
      text: messageText,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir bravo",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });
    
  } catch (error) {
    console.error("Error fetching Bible passage:", error);
    await repondre("An error occurred while fetching the Bible passage. Please try again later.", {
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@terminator",
         serverMessageId: 143,
        },
      },
    });
  }
});

ezra({
  nomCom: "define",
  aliases: ["dictionaries", "dict", "def"],
  reaction: '😁',
  categorie: "New"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const term = arg.join(" ");

  if (!term) {
    return repondre("Please provide a term to define.");
  }

  try {
    const { data } = await axios.get(`http://api.urbandictionary.com/v0/define?term=${term}`);
    const definition = data.list[0];

    if (definition) {
      const definitionMessage = `
        Word: ${term}
        Definition: ${definition.definition.replace(/\[|\]/g, '')}
        Example: ${definition.example.replace(/\[|\]/g, '')}
      `;

      await zk.sendMessage(dest, {
        text: definitionMessage,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@terminator",
         serverMessageId: 143,
          },
        },
      }, { quoted: ms });

    } else {
      return repondre(`No result found for "${term}".`);
    }
  } catch (error) {
    console.error(error);
    return repondre("An error occurred while fetching the definition.");
  }
});

ezra({
  nomCom: "pair",
  aliases: ["session", "qrcode"],
  reaction: '🚀',
  categorie: 'General'
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;

  if (!arg || arg.length === 0) {
    const replyText = "Example Usage: .code 255752xxxxxx.";
    return repondre(replyText);
  }

  try {
    // Notify user that pairing is in progress
    const replyText = "*Wait 🫸 sir Terminator ☢️ is getting your pair code ...*";
    await repondre(replyText);

    // Prepare the API request
    const encodedNumber = encodeURIComponent(arg.join(" "));
    const apiUrl = `https://lucky-site.onrender.com/code?number=${encodedNumber}`;

    // Fetch the pairing code from the API
    const response = await axios.get(apiUrl);
    const data = response.data;

    if (data && data.code) {
      const pairingCode = data.code;
      await zk.sendMessage(dest, {
        text: pairingCode,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@sir bravin",
         serverMessageId: 143,
          },
        },
      }, { quoted: ms });

      const secondReplyText = "Here is your pair code, copy and paste it to the notification above or link devices.";
      await repondre(secondReplyText);
    } else {
      throw new Error("Invalid response from API.");
    }
  } catch (error) {
    console.error("Error getting API response:", error.message);
    const replyText = "Error getting response from API.";
    repondre(replyText);
  }
});

ezra({
  nomCom: "elements",
  reaction: '📓',
  categorie: "New"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const elementQuery = arg.join(" ").trim();

  if (!elementQuery) {
    return repondre("Please provide an element symbol or name.");
  }

  try {
    const response = await axios.get(`https://api.popcat.xyz/periodic-table?element=${elementQuery}`);
    
    if (!response.data) {
      return repondre("Could not find information for the provided element. Please check the symbol or name.");
    }

    const data = response.data;
    const thumb = data.image; // Assuming the API returns an 'image' property for the element thumbnail

    const formattedMessage = `
*☢️ terminator ☢️ ELEMENT INFO:*
🚀 *Name:* ${data.name}
🚀 *Symbol:* ${data.symbol}
🚀 *Atomic Number:* ${data.atomic_number}
🚀 *Atomic Mass:* ${data.atomic_mass}
🚀 *Period:* ${data.period}
🚀 *Phase:* ${data.phase}
🚀 *Discovered By:* ${data.discovered_by}
🚀 *Summary:* ${data.summary}
   
Regards ${conf.OWNER_NAME} `;

    await zk.sendMessage(dest, {
      text: formattedMessage,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@terminator",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching the element data:", error);
    repondre("An error occurred while fetching the element data. Please try again later.");
  }
});

ezra({
  nomCom: "githubs",
  aliases: ["gits"],
  reaction: '💻',
  categorie: "New"
}, async (dest, zk, commandeOptions) => {
  const { repondre, arg, ms } = commandeOptions;
  const githubUsername = arg.join(" ");

  if (!githubUsername) {
    return repondre("Give me a valid GitHub username like: github Fred1e or mr-X-force");
  }

  try {
    const response = await axios.get(`https://api.github.com/users/${githubUsername}`);
    const data = response.data;

    if (data.message === "Not Found") {
      return repondre(`User ${githubUsername} not found.`);
    }

    const thumb = data.avatar_url; // Using the avatar_url as the thumbnail

    const githubMessage = `
°GITHUB USER INFO°
🚩 Id: ${data.id}
🔖 Name: ${data.name}
🔖 Username: ${data.login}
✨ Bio: ${data.bio}
🏢 Company: ${data.company}
📍 Location: ${data.location}
📧 Email: ${data.email || "Not provided"}
📰 Blog: ${data.blog || "Not provided"}
🔓 Public Repos: ${data.public_repos}
🔐 Public Gists: ${data.public_gists}
👪 Followers: ${data.followers}
🫶 Following: ${data.following}
`;

    await zk.sendMessage(dest, {
      text: githubMessage,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '+120363420222821450@newsletter',
         newsletterName: "@bravo",
         serverMessageId: 143,
        },
      },
    }, { quoted: ms });

  } catch (error) {
    console.error("Error fetching GitHub user data:", error);
    await repondre("An error occurred while fetching GitHub user data.");
  }
});

ezra({
  nomCom: "tempmail",
  aliases: ['maile', 'tempe'],
  reaction: '📧',
  categorie: "New"
}, async (dest, zk, context) => {
  const { repondre: replyToUser, prefix, ms: messageQuote } = context;

  try {
    const tempEmail = Math.random().toString(36).substring(2, 14) + "@1secmail.com";

    await zk.sendMessage(dest, {
      text: `Your temporary email is: ${tempEmail}

You can use this email for temporary purposes. I will notify you if you receive any emails.`,
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '+120363420222821450@newsletter',
         newsletterName: "@sir bravin",
         serverMessageId: 143,
        }
      }
    }, { quoted: messageQuote });

    // Function to check for new emails
    const checkEmails = async () => {
      try {
        const response = await axios.get(`https://www.1secmail.com/api/v1/?action=getMessages&login=${tempEmail}&domain=1secmail.com`);
        const emails = response.data;

        if (emails.length > 0) {
          for (const email of emails) {
            const emailDetails = await axios.get(`https://www.1secmail.com/api/v1/?action=readMessage&login=${tempEmail}&domain=1secmail.com&id=${email.id}`);
            const emailData = emailDetails.data;
            const links = emailData.textBody.match(/(https?:\/\/[^\s]+)/g);
            const linksText = links ? links.join("\n") : "No links found in the email content.";

            await zk.sendMessage(dest, {
              text: `You have received a new email!\n\nFrom: ${emailData.from}\nSubject: ${emailData.subject}\n\n${emailData.textBody}\nLinks found:\n${linksText}`,
              contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@bravo",
         serverMessageId: 143,
                }
              }
            }, { quoted: messageQuote });
          }
        }
      } catch (error) {
        console.error("Error checking temporary email:", error.message);
      }
    };

    // Set an interval to check for new emails every 30 seconds
    const emailCheckInterval = setInterval(checkEmails, 30000);

    // End the email session after 10 minutes
    setTimeout(() => {
      clearInterval(emailCheckInterval);
      zk.sendMessage(dest, {
        text: "Your temporary email session has ended. Please create a new temporary email if needed.",
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363420222821450@newsletter',
         newsletterName: "@bravo",
         serverMessageId: 143,
          }
        }
      }, { quoted: messageQuote });
    }, 600000); // 10 minutes in milliseconds

  } catch (error) {
    console.error("Error generating temporary email:", error.message);
    await zk.sendMessage(dest, {
      text: "Error generating temporary email. Please try again later.",
      contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363313124070136@newsletter',
         newsletterName: "@FrediEzra",
         serverMessageId: 143,
        }
      }
    }, { quoted: messageQuote });
  }
});
ezra({
  nomCom: "wikipedia",
  aliases: ["wiki", "wikipeda"],
  reaction: '🤡',
  categorie: "Fredi-New"
}, async (zk, dest, context) => {
  const { repondre, arg, ms } = context;

  // Ensure that the search term is provided
  const text = arg.join(" ").trim(); 

  try {
    if (!text) return repondre(`Provide the term to search,\nE.g What is JavaScript!`);
    
    // Fetch summary from Wikipedia
    const con = await wiki.summary(text);
    
    // Format the reply message
    const texa = `
*📚 Wikipedia Summary 📚*

🔍 *Title*: _${con.title}_

📝 *Description*: _${con.description}_

💬 *Summary*: _${con.extract}_

🔗 *URL*: ${con.content_urls.mobile.page}

> Powered by terminator
    `;
    repondre(texa);
  } catch (err) {
    console.error(err);
    repondre(`Got 404. I did not find anything!`);
  }
});

// Request for Islam Hadith
ezra({
  nomCom: "hadith",
  aliases: ["islam", "hadees"],
  reaction: '📖',
  categorie: "New"
}, async (dest, zk, params) => {
  const { repondre } = params;

  try {
    const response = await axios.get("https://bk9.fun/Islam/hadith", {
      timeout: 10000 // 10 seconds timeout
    });

    if (response.status === 200 && response.data) {
      const hadithText = response.data.hadith || response.data; // Adjust based on API response format

      await zk.sendMessage(dest, {
        text: `📜 *Hadith of the Day:*\n\n"${hadithText}"`,
        contextInfo: {
         isForwarded: true,
         forwardedNewsletterMessageInfo: {
         newsletterJid: '120363313124070136@newsletter',
         newsletterName: "@FrediEzra",
         serverMessageId: 143,
          },
        },
      });
    } else {
      throw new Error("Invalid response from Hadith API");
    }
  } catch (error) {
    console.error("Error fetching Hadith:", error.message);
    await repondre("Sorry, I couldn't fetch a Hadith at the moment.");
  }
});
