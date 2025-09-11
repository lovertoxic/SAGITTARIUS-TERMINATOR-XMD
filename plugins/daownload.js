
const { franceking } = require('../main');
const { fetchAllPosts } = require('../france/Ig');
const axios = require('axios');
const getFBInfo = require('@xaviabot/fb-downloader');
const { search, download } = require('aptoide_scrapper_fixed'); 
const { fetchStories } = require('../france/Ig');
 const getInstaMedia = require('../france/Insta'); 
const getTikTokMedia = require('../france/Tok'); 

function formatDate(dateStr) {
    const date = new Date(dateStr);
    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();
    const hours = ("0" + (date.getHours() % 12 || 12)).slice(-2);
    const minutes = ("0" + date.getMinutes()).slice(-2);
    const ampm = date.getHours() >= 12 ? 'pm' : 'am';
    return `${day}/${month}/${year} at ${hours}:${minutes} ${ampm}`;
}



module.exports = [
 {
  name: 'tiktok3',
  aliases: ['tk', 'tiktokdl'],
  description: 'Download TikTok media by link.',
  category: 'Download-sir toxic',

  execute: async (king, msg, args, fromJid) => {
    const query = args.join(' ').trim();

    if (!query || !query.startsWith('http')) {
      return king.sendMessage(fromJid, {
        text: '📌 *Please provide a valid TikTok video link.*'
      }, { quoted: msg });
    }

    const response = await getTikTokMedia(query);

    if (!response.status) {
      return king.sendMessage(fromJid, {
        text: `❌ *Failed to fetch TikTok media.*\nReason: ${response.message}`
      }, { quoted: msg });
    }

    const caption = `🎵 *${response.title || 'TikTok Media'}*`;

    if (response.video) {
      await king.sendMessage(fromJid, {
        video: { url: response.video },
        caption
      }, { quoted: msg });
    } else {
      await king.sendMessage(fromJid, {
        text: '⚠️ Video link not found.'
      }, { quoted: msg });
    }

    // if (response.audio) {
    //   await king.sendMessage(fromJid, {
    //     document: { url: response.audio },
    //     mimetype: 'audio/mpeg',
    //     fileName: 'tiktok-audio.mp3'
    //   }, { quoted: msg });
    // }
  }
}, 
 {
  name: 'insta2',
  aliases: ['igdl', 'ig', 'instagram'],
  description: 'Download media from an Instagram link.',
  category: 'Download-sir Toxic',

  get flashOnly() {
    return franceking();
  },

  execute: async (king, msg, args, fromJid) => {
    const url = args[0];

    if (!url || !url.startsWith('http') || !url.includes('instagram.com')) {
      return king.sendMessage(fromJid, {
        text: '🔗 *Please provide a valid Instagram URL.*\n\nExample: `!insta https://www.instagram.com/reel/xyz123/`'
      }, { quoted: msg });
    }

    try {
      const { igmp4, error } = await getInstaMedia(url);

      if (error || !igmp4) {
        return king.sendMessage(fromJid, {
          text: `❌ *Failed to download media:*\n${error || 'Invalid or unsupported link.'}`
        }, { quoted: msg });
      }

      const isVideo = igmp4.includes('.mp4') || igmp4.includes('video');

      if (isVideo) {
        await king.sendMessage(fromJid, {
          video: { url3: igmp4 },
          caption: '_*✨ Downloaded by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*_'
        }, { quoted: msg });
      } else {
        await king.sendMessage(fromJid, {
          image: { url3: igmp4 },
          caption: '_*✨ Downloaded by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*_'
        }, { quoted: msg });
      }

    } catch (err) {
      await king.sendMessage(fromJid, {
        text: '❌ *Unexpected error occurred. Please try again later.*'
      }, { quoted: msg });
    }
  }
}, 
 {
  name: 'posts',
  aliases: ['igposts', 'instafeed'],
  description: 'Download recent Instagram posts of a given username.',
  category: 'Download-sir toxic',

  get flashOnly() {
    return franceking();
  },

  execute: async (king, msg, args, fromJid) => {
    const username = args[0];

    if (!username) {
      return king.sendMessage(fromJid, {
        text: '📸 *Please provide an Instagram username.*\n\nExample: `!posts france.king1`'
      }, { quoted: msg });
    }

    try {
      const { total, items } = await fetchAllPosts(username);

      if (total === 0 || !items.length) {
        return king.sendMessage(fromJid, {
          text: `❌ *No posts found for @${username}.*\nMaybe the account is private or invalid.`
        }, { quoted: msg });
      }

      
      const maxPosts = items.slice(0, 5);

      for (const item of maxPosts) {
        if (item.type === 'image') {
          await king.sendMessage(fromJid, {
            image: { url: item.url },
            caption: `📸 _✨ Downloaded by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD`
          }, { quoted: msg });
        } else if (item.type === 'video') {
          await king.sendMessage(fromJid, {
            video: { url: item.url },
            caption: `🎥 _✨ Downloaded by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD`
          }, { quoted: msg });
        }
      }

    } catch (err) {
      console.error('[IG POSTS ERROR]', err);
      await king.sendMessage(fromJid, {
        text: '❌ *Something went wrong fetching posts.* Please try again later.'
      }, { quoted: msg });
    }
  }
}, 
    {
        name: 'npm',
        get flashOnly() {
  return franceking();
},
        aliases: [],
        description: 'Search for an NPM package and view its details.',
        category: 'General',
        execute: async (sock, msg, args) => {
            const chatId = msg.key.remoteJid;

            if (!args || args.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: '❗ Please provide an NPM package name to search for.'
                }, { quoted: msg });
            }

            const query = args.join(' ');
            const apiUrl = `https://weeb-api.vercel.app/npm?query=${encodeURIComponent(query)}`;

            try {
                const res = await axios.get(apiUrl);
                const data = res.data;

                if (!data.results?.length) {
                    return await sock.sendMessage(chatId, {
                        text: `❌ No results found for "${query}".`
                    }, { quoted: msg });
                }

                const pkg = data.results[0];
                const formattedDate = formatDate(pkg.date);

                const result = `*📦 NPM PACKAGE RESULT*

*📁 Name:* ${pkg.name}
*📌 Version:* ${pkg.version}
*📝 Description:* ${pkg.description}
*👤 Publisher:* ${pkg.publisher.username}
*⚖️ License:* ${pkg.license}
*📅 Last Updated:* ${formattedDate}

🔗 *NPM:* ${pkg.links.npm}
🔗 *Repository:* ${pkg.links.repository || 'N/A'}
🔗 *Homepage:* ${pkg.links.homepage || 'N/A'}

_Use this info to explore or install the package via terminal_`;

                await sock.sendMessage(chatId, {
                    text: result,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363366284524544@newsletter',
                            newsletterName: 'sir bravin',
                            serverMessageId: -1
                        }
                    }
                });
            } catch (error) {
                await sock.sendMessage(chatId, {
                    text: '❌ An error occurred while fetching the package info.'
                }, { quoted: msg });
            }
        }
    },
{
  name: "video-dl2",
    get flashOnly() {
  return franceking();
},
  aliases: ["vddownload"],
  description: "Download high-quality videos from social media URLs",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "Please provide a valid video URL."
      }, { quoted: msg });
    }

    try {
      const url = args.join(' ');
      const res = await fetch(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.status && data.BK9 && data.BK9.high) {
        await sock.sendMessage(chatId, {
          video: { url2: data.BK9.high },
          caption: "🎥 *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD* Video Downloader (High Quality)",
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363366284524544@newsletter',
              newsletterName: '乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });

        await sock.sendMessage(chatId, {
          text: "✅ Video downloaded successfully!"
        }, { quoted: msg });

      } else {
        await sock.sendMessage(chatId, {
          text: "❌ No valid video found."
        }, { quoted: msg });
      }

    } catch (error) {
      console.error("Video-DL Error:", error);
      await sock.sendMessage(chatId, {
        text: "An error occurred while processing the video request. Please try again."
      }, { quoted: msg });
    }
  }
}, 
    {
  name: "tgs2",
        get flashOnly() {
  return franceking();
},
  aliases: ["tg"],
  description: "Download and send all stickers from a Telegram pack",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "Please provide a Telegram sticker pack URL."
      }, { quoted: msg });
    }

    try {
      const stickerPackUrl = args.join(" ");
      const res = await fetch(`https://weeb-api.vercel.app/telesticker?url=${encodeURIComponent(stickerPackUrl)}`);
      const data = await res.json();

      if (data.stickers && data.stickers.length > 0) {
        for (const stickerUrl of data.stickers) {
          await sock.sendMessage(chatId, {
            sticker: { url: stickerUrl },
            contextInfo: {
              forwardingScore: 1,
              isForwarded: true,
              forwardedNewsletterMessageInfo: {
                newsletterJid: '120363366284524544@newsletter',
                newsletterName: 'SIR ARNOLD',
                serverMessageId: -1
              }
            }
          }, { quoted: msg });
        }

        await sock.sendMessage(chatId, {
          text: "✅ All Telegram stickers sent successfully!"
        }, { quoted: msg });

      } else {
        await sock.sendMessage(chatId, {
          text: "❌ No stickers found in the provided pack."
        }, { quoted: msg });
      }

    } catch (err) {
      console.error("TGS Error:", err);
      await sock.sendMessage(chatId, {
        text: "An error occurred while fetching the sticker pack. Please try again later."
      }, { quoted: msg });
    }
  }
}, 
{
  name: "xdl",
    get flashOnly() {
  return franceking();
},
  aliases: ["xvideodl2"],
  description: "Download adult video from xnxx in high quality",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "Please provide the video URL to download."
      }, { quoted: msg });
    }

    try {
      const videoUrl = args.join(" ");
      const response = await fetch(`https://api.agatz.xyz/api/xnxxdown?url=${encodeURIComponent(videoUrl)}`);
      const data = await response.json();

      if (!data.status || !data.data || !data.data.status) {
        return await sock.sendMessage(chatId, {
          text: "❌ Failed to retrieve video info. Please check the link."
        }, { quoted: msg });
      }

      const videoData = data.data;
      const highQualityUrl = videoData.files?.high;

      if (!highQualityUrl) {
        return await sock.sendMessage(chatId, {
          text: "❌ High quality video not available."
        }, { quoted: msg });
      }

      const caption = `*🔞 THE JEEPERS CREEPER-XMD X-Video Downloader 🥵*\n\n` +
                      `• *Title:* ${videoData.title}\n` +
                      `• *Duration:* ${videoData.duration}s\n` +
                      `• *Info:* ${videoData.info}\n` +
                      `• *Quality:* High`;

      await sock.sendMessage(chatId, {
        video: { url: highQualityUrl },
        caption,
        contextInfo: {
          forwardingScore: 1,
          isForwarded: true,
          forwardedNewsletterMessageInfo: {
            newsletterJid: '120363366284524544@newsletter',
            newsletterName: 'sir ARNOLD',
            serverMessageId: -1
          }
        }
      }, { quoted: msg });

    } catch (error) {
      console.error("XDL Error:", error);
      await sock.sendMessage(chatId, {
        text: "⚠️ An error occurred while processing the request. Try again later."
      }, { quoted: msg });
    }
  }
}, 
    
 {
  name: "xsearch",
     get flashOnly() {
  return franceking();
},
  aliases: [],
  description: "Search for videos on XNXX",
  category: "download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "Please provide a search query."
      }, { quoted: msg });
    }

    const query = args.join(" ");
    const apiUrl = `https://api.agatz.xyz/api/xnxx?message=${encodeURIComponent(query)}`;

    try {
      const res = await fetch(apiUrl);
      const jsonData = await res.json();

      if (jsonData.status !== 200 || !jsonData.data?.result || jsonData.data.result.length === 0) {
        return await sock.sendMessage(chatId, {
          text: "No results found for your query."
        }, { quoted: msg });
      }

      const results = jsonData.data.result;

      let resultsText = `*YOUR XSEARCH RESULTS*\n\n`;
      for (const video of results) {
        resultsText += 
          `Title: ${video.title}\n` +
          `Info: ${video.info}\n` +
          `Link: ${video.link}\n\n` +
          `Use the xdl command to download your video\n\n`;
      }

      await sock.sendMessage(chatId, { text: resultsText }, { quoted: msg });

    } catch (error) {
      console.error("XSEARCH Error:", error);
      await sock.sendMessage(chatId, {
        text: "An error occurred while fetching the search results. Please try again later."
      }, { quoted: msg });
    }
  }
},   
 
  {
  name: "gitclone",
      get flashOnly() {
  return franceking();
},
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, { text: "Please provide a valid GitHub repo link." }, { quoted: msg });
    }

    const gitlink = args.join(" ");
    if (!gitlink.includes("github.com")) {
      return await sock.sendMessage(chatId, { text: "Is that a GitHub repo link?!" }, { quoted: msg });
    }

    try {
      let regex1 = /(?:https|git)(?::\/\/|@)github\.com[\/:]([^\/:]+)\/(.+)/i;
      let [, user3, repo] = gitlink.match(regex1) || [];
      if (!user3 || !repo) {
        return await sock.sendMessage(chatId, { text: "Invalid GitHub repo link." }, { quoted: msg });
      }

      repo = repo.replace(/\.git$/, "");
      let url = `https://api.github.com/repos/${user3}/${repo}/zipball`;

      const headResponse = await fetch(url, { method: "HEAD" });
      const contentDisposition = headResponse.headers.get("content-disposition");
      if (!contentDisposition) {
        return await sock.sendMessage(chatId, { text: "Failed to get repo archive." }, { quoted: msg });
      }

      const filenameMatch = contentDisposition.match(/attachment; filename=(.*)/);
      if (!filenameMatch) {
        return await sock.sendMessage(chatId, { text: "Failed to parse filename." }, { quoted: msg });
      }

      const filename = filenameMatch[1];
      await sock.sendMessage(
        chatId,
        {
          document: { url2 },
          fileName: filename.endsWith(".zip") ? filename : filename + ".zip",
          mimetype: "application/zip",
        },
        { quoted: msg }
      );
    } catch (error) {
      console.error("GitClone Error:", error);
      await sock.sendMessage(chatId, { text: "An error occurred while fetching the GitHub repo." }, { quoted: msg });
    }
  },
}, 
    
  {
  name: "math",
      get flashOnly() {
  return franceking();
},
  category: "General",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
    const input = args.join("").replace(/\s+/g, "");

    if (!/^[0-9+\-*/().]+$/.test(input)) {
      return await sock.sendMessage(chatId, { text: "Invalid input. Please use a valid format like '1+1' or '2*3+5/2'." }, { quoted: msg });
    }

    try {
      const result = eval(input);
      if (!isFinite(result)) {
        return await sock.sendMessage(chatId, { text: "Error: Division by zero or other invalid operation." }, { quoted: msg });
      }

      await sock.sendMessage(chatId, { text: `The result is: ${result}` }, { quoted: msg });
    } catch {
      await sock.sendMessage(chatId, { text: "Invalid expression. Please ensure you are using valid mathematical operators." }, { quoted: msg });
    }
  },
},  
{
  name: "fb3",
    get flashOnly() {
  return franceking();
},
  aliases: ["fbdl3", "facebook", "fb1"],
  reaction: "📽️",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363366284524544@newsletter',
        newsletterName: 'sir ARNOLD',
        serverMessageId: -1
      }
    };

    if (!args[0]) {
      return await sock.sendMessage(chatId, {
        text: "Insert a public facebook video link!"
      }, { quoted: msg });
    }

    const queryURL = args.join(" ");

    try {
      getFBInfo(queryURL)
        .then(async (result) => {
          const caption = `*Title:* ${result.title}\n\n*Direct Link:* ${result.url}`;
          await sock.sendMessage(chatId, {
            image: { url: result.thumbnail },
            caption
          }, { quoted: msg });

          await sock.sendMessage(chatId, {
            video: { url: result.hd },
            caption: "_╰►FB VIDEO DOWNLOADED BY_ *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*",
            contextInfo
          }, { quoted: msg });
        })
        .catch(async () => {
          await sock.sendMessage(chatId, {
            text: "try fb3 on this link"
          }, { quoted: msg });
        });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: "An error occurred while downloading your media."
      }, { quoted: msg });
    }
  }
}, 
   {
  name: "fb3",
       get flashOnly() {
  return franceking();
},
  aliases: ["fbdl3", "fb3", "facebook3"],
  reaction: "📽️",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363366284524544@newsletter',
        newsletterName: 'sir ARNOLD',
        serverMessageId: -1
      }
    };

    if (!args[0]) {
      return await sock.sendMessage(chatId, {
        text: "Insert a public facebook video link!"
      }, { quoted: msg });
    }

    const queryURL = args.join(" ");

    try {
      getFBInfo(queryURL)
        .then(async (result) => {
          const caption = `*Title:* ${result.title}\n\n*Direct Link:* ${result.url}`;
          await sock.sendMessage(chatId, {
            image: { url: result.thumbnail },
            caption
          }, { quoted: msg });

          await sock.sendMessage(chatId, {
            video: { url: result.sd },
            caption: "_╰►FACEBOOK VIDEO DOWNLOADED BY_ *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*",
            contextInfo
          }, { quoted: msg });
        })
        .catch(async (error) => {
          await sock.sendMessage(chatId, {
            text: error.toString()
          }, { quoted: msg });
        });
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: "An error occurred while Flash-MD was downloading your media."
      }, { quoted: msg });
    }
  }
}, 
    
  {
  name: "element",
      get flashOnly() {
  return franceking();
},
  aliases: ["chem", "study"],
  category: "download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363366284524544@newsletter',
        newsletterName: 'sir ARNOLD',
        serverMessageId: -1
      }
    };

    const element = args.join(" ");
    if (!element) {
      return await sock.sendMessage(chatId, {
        text: "Please specify an element name or symbol."
      }, { quoted: msg });
    }

    try {
      const apiUrl = `https://api.popcat.xyz/periodic-table?element=${encodeURIComponent(element)}`;
      const response = await fetch(apiUrl);
      const result = await response.json();

      if (result && !result.error) {
        const info = 
          `Element Name: ${result.name}\n` +
          `Element Symbol: ${result.symbol}\n` +
          `Atomic Number: ${result.atomic_number}\n` +
          `Atomic Mass: ${result.atomic_mass}\n` +
          `Period: ${result.period}\n` +
          `Phase: ${result.phase}\n` +
          `Discovered By: ${result.discovered_by}`;

        await sock.sendMessage(chatId, {
          text: "A moment, 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD is sending your results"
        }, { quoted: msg });

        if (result.image) {
          await sock.sendMessage(chatId, {
            image: { url: result.image },
            caption: info,
            contextInfo
          }, { quoted: msg });
        } else {
          await sock.sendMessage(chatId, {
            text: info,
            contextInfo
          }, { quoted: msg });
        }
      } else {
        await sock.sendMessage(chatId, {
          text: "Element not found or error fetching data."
        }, { quoted: msg });
      }
    } catch (error) {
      await sock.sendMessage(chatId, {
        text: "Error fetching element data."
      }, { quoted: msg });
    }
  }
}, 
{
  name: "blackpink",
    get flashOnly() {
  return franceking();
},
  aliases: ["bpink"],
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    const contextInfo = {
      forwardingScore: 1,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: '120363366284524544@newsletter',
        newsletterName: 'sir ARNOLD',
        serverMessageId: -1
      }
    };

    if (args[0]) {
      return await sock.sendMessage(chatId, {
        text: "This command doesn't require any arguments. Just type the command to get 5 random Blackpink images!"
      }, { quoted: msg });
    }

    try {
      const response = await fetch('https://raw.githubusercontent.com/arivpn/dbase/master/kpop/blekping.txt');
      const textData = await response.text();
      const imageUrls = textData.split('\n').filter(url => url.trim() !== '');

      if (imageUrls.length < 5) {
        return await sock.sendMessage(chatId, {
          text: "There aren't enough images available at the moment. Please try again later."
        }, { quoted: msg });
      }

      const selectedImages = [];
      while (selectedImages.length < 5) {
        const randomImage = imageUrls[Math.floor(Math.random() * imageUrls.length)];
        if (!selectedImages.includes(randomImage)) {
          selectedImages.push(randomImage);
        }
      }

      await sock.sendMessage(chatId, {
        text: "sir bravin is sending you 5 BLACKPINK IMAGES"
      }, { quoted: msg });

      for (const imageUrl of selectedImages) {
        await sock.sendMessage(chatId, {
          image: { url: imageUrl },
          caption: "_╰►DOWNLOADED BY_ *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*",
          contextInfo
        }, { quoted: msg });
      }

      await sock.sendMessage(chatId, {
        text: "SUCCESSFULLY SENT THE 5 IMAGES ✅"
      }, { quoted: msg });

    } catch (e) {
      await sock.sendMessage(chatId, {
        text: "A fatal error has occurred... \n " + e.message
      }, { quoted: msg });
    }
  }
}, 
   
{
  name: 'story',
    get flashOnly() {
  return franceking();
}, 
  aliases: ['igstories', 'stories'],
  description: 'Fetch Instagram stories using.',
  category: 'Download-sir',

  async execute(king, msg, args, fromJid) {
    const username = args[0]?.toLowerCase(); 
    if (!username) {
      return king.sendMessage(fromJid, {
        text: '📖 *Provide a username to fetch stories.*\n\nExample: `story france.king1`'
      }, { quoted: msg });
    }

    try {
      const res = await fetchStories(username);

      if (!res || res.total === 0 || !Array.isArray(res.items)) {
        return king.sendMessage(fromJid, {
          text: `⚠️ No stories found for *${username}*.`
        }, { quoted: msg });
      }

      const stories = res.items.slice(0, 5); 

      for (const [index, item] of stories.entries()) {
        const caption = `📖 *${username}* - Story ${index + 1} of ${stories.length}\n\n_*✨Downloaded by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*_`;

        if (item.type === 'image') {
          await king.sendMessage(fromJid, {
            image: { url: item.url },
            caption
          }, { quoted: msg });
        } else if (item.type === 'video') {
          await king.sendMessage(fromJid, {
            video: { url: item.url },
            caption
          }, { quoted: msg });
        } else {
          await king.sendMessage(fromJid, {
            text: `⚠️ Unknown media type:\n${item.url}`
          }, { quoted: msg });
        }
      }

    } catch (error) {
      console.error('Error fetching Instagram stories:', error);
      return king.sendMessage(fromJid, {
        text: `❌ Failed to fetch stories for *${username}*. Try again later.`
      }, { quoted: msg });
    }
  }
}, 
      {
  name: "mediafire",
       get flashOnly() {
  return franceking();
},
  aliases: ["mf2", "mfdl2"],
  description: "Download files from MediaFire",
  category: "Download-sir",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;
const contextInfo = {
  forwardingScore: 1,
  isForwarded: true,
  forwardedNewsletterMessageInfo: {
    newsletterJid: '120363366284524544@newsletter',
    newsletterName: 'sir ARNOLD',
    serverMessageId: -1
  }
};
    const input = args.join(' ');
    if (!input) {
      return await sock.sendMessage(chatId, {
        text: "Please insert a MediaFire file link.",
        contextInfo
      }, { quoted: msg });
    }

    try {
      await sock.sendMessage(chatId, {
        text: "Fetching your file from MediaFire, please wait...",
        contextInfo
      }, { quoted: msg });

      const res = await axios.get(`https://bk9.fun/download/mediafire?url=${encodeURIComponent(input)}`);
      const data = res.data;

      if (!data.status || !data.BK9 || !data.BK9.link) {
        return await sock.sendMessage(chatId, {
          text: "Failed to retrieve file. Please check the link and try again.",
          contextInfo
        }, { quoted: msg });
      }

      const file = data.BK9;

      await sock.sendMessage(chatId, {
        document: { url: file.link },
        fileName: file.name,
        mimetype: `application/${file.mime.toLowerCase()}`,
        caption:
          `╰► *MediaFire Download Completed!*\n` +
          `Downloaded by: *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*\n\n` +
          `📂 *Name:* ${file.name}\n` +
          `📦 *Size:* ${file.size}\n` +
          `📄 *Type:* ${file.filetype}\n` +
          `📅 *Uploaded:* ${file.uploaded}`
      }, { quoted: msg });

    } catch (err) {
      console.error("MediaFire Error:", err);
      await sock.sendMessage(chatId, {
        text: "An error occurred while processing the request. Please try again later.",
        contextInfo
      }, { quoted: msg });
    }
  }
}, 

     
{
  name: "image-dl",
    get flashOnly() {
  return franceking();
},
  aliases: ["imgdl"],
  description: "Download high-quality images from social media URLs",
  category: "Download",
  execute: async (sock, msg, args) => {
    const chatId = msg.key.remoteJid;

    if (!args || args.length === 0) {
      return await sock.sendMessage(chatId, {
        text: "Please provide a valid image URL."
      }, { quoted: msg });
    }

    try {
      const url = args.join(' ');
      const res = await fetch(`https://bk9.fun/download/alldownload?url=${encodeURIComponent(url)}`);
      const data = await res.json();

      if (data.status && data.BK9 && data.BK9.high) {
        await sock.sendMessage(chatId, {
          image: { url: data.BK9.high },
          caption: "📸 *乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD* Image Downloader (High Quality)",
          contextInfo: {
            forwardingScore: 1,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
              newsletterJid: '120363238139244263@newsletter',
              newsletterName: '乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD',
              serverMessageId: -1
            }
          }
        }, { quoted: msg });

        await sock.sendMessage(chatId, {
          text: "✅ Image downloaded successfully!"
        }, { quoted: msg });

      } else {
        await sock.sendMessage(chatId, {
          text: "❌ No valid high-quality image found."
        }, { quoted: msg });
      }

    } catch (error) {
      console.error("Image-DL Error:", error);
      await sock.sendMessage(chatId, {
        text: "An error occurred while processing the image request. Please try again."
      }, { quoted: msg });
    }
  }
}, 
 
   
{
    name: 'apk',
    aliases: ['app', 'application'],
    get flashOnly() {
    return franceking();
  },
    description: 'Search and download Android APK files.',
    category: 'Download',
    execute: async (sock, msg, args) => {
        const chatId = msg.key.remoteJid;

        if (!args || !args.length) {
            return await sock.sendMessage(chatId, {
                text: '❗ Please provide an app name to search for.'
            }, { quoted: msg });
        }

        const query = args.join(' ');

        try {
            await sock.sendMessage(chatId, {
                text: '🔍 Searching for the APK, please wait...'
            }, { quoted: msg });

            const results = await search(query); 
            if (!results || results.length === 0) {
                return await sock.sendMessage(chatId, {
                    text: `❌ No APKs found for "${query}".`
                }, { quoted: msg });
            }

            const apk = results[0]; 
            const dlInfo = await download(apk.id); 

            if (!dlInfo || !dlInfo.dllink) {
                return await sock.sendMessage(chatId, {
                    text: '❌ Failed to retrieve the download link.'
                }, { quoted: msg });
            }

            await sock.sendMessage(chatId, {
                document: { url: dlInfo.dllink },
                mimetype: 'application/vnd.android.package-archive',
                fileName: `${apk.name}.apk`,
                caption: `*📥 APK DOWNLOADER*

*📌 App:* ${apk.name}
*📎 Type:* APK File
*⚙️ Powered by:* 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD`
            }, { quoted: msg });

            await sock.sendMessage(chatId, {
                text: `✅ Successfully fetched and sent APK for *${apk.name}*.

_Enjoy using the app. Powered by 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD_`,
                contextInfo: {
                    forwardingScore: 1,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363238139244263@newsletter',
                        newsletterName: '乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD',
                        serverMessageId: -1
                    }
                }
            });

        } catch (error) {
            console.error('APK Error:', error);
            await sock.sendMessage(chatId, {
                text: '❌ An error occurred while processing your APK request.'
            }, { quoted: msg });
        }
    }
}, 

    {
        name: 'fetch',
        get flashOnly() {
  return franceking();
},
        aliases: [],
        description: 'Fetches content from a URL and responds with the appropriate media or text.',
        category: 'Search',
        execute: async (sock, msg, args) => {
            const chatId = msg.key.remoteJid;
            const url = args.join(' ');

            if (!/^https?:\/\//.test(url)) {
                return await sock.sendMessage(chatId, {
                    text: '❗ Please start the URL with *http://* or *https://*'
                }, { quoted: msg });
            }

            try {
                const response = await axios.get(url, {
                    responseType: 'arraybuffer',
                    maxContentLength: 100 * 1024 * 1024,
                    validateStatus: () => true
                });

                const contentType = response.headers['content-type'] || '';
                const contentLength = parseInt(response.headers['content-length'] || '0');

                if (response.status >= 400) {
                    return await sock.sendMessage(chatId, {
                        text: `❌ Failed to fetch the URL. Status: ${response.status}`
                    }, { quoted: msg });
                }

                if (contentLength > 100 * 1024 * 1024) {
                    return await sock.sendMessage(chatId, {
                        text: '⚠️ The content is too large to process (over 100MB).'
                    }, { quoted: msg });
                }

                const meta = {
                    quoted: msg,
                    contextInfo: {
                        forwardingScore: 1,
                        isForwarded: true,
                        forwardedNewsletterMessageInfo: {
                            newsletterJid: '120363238139244263@newsletter',
                            newsletterName: '乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD',
                            serverMessageId: -1
                        }
                    }
                };

                const buffer = Buffer.from(response.data);

                if (/image\//.test(contentType)) {
                    return await sock.sendMessage(chatId, {
                        image: buffer,
                        caption: '> > *POWERED BY 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*'
                    }, meta);
                }

                if (/video\//.test(contentType)) {
                    return await sock.sendMessage(chatId, {
                        video: buffer,
                        caption: '> > *POWERED BY 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*'
                    }, meta);
                }

                if (/audio\//.test(contentType)) {
                    return await sock.sendMessage(chatId, {
                        audio: buffer,
                        caption: '> > *POWERED BY 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*'
                    }, meta);
                }

                if (/json|text\//.test(contentType)) {
                    let textContent = buffer.toString();
                    try {
                        const parsed = JSON.parse(textContent);
                        textContent = JSON.stringify(parsed, null, 2);
                    } catch {}
                    return await sock.sendMessage(chatId, {
                        text: `*FETCHED CONTENT*\n\n${textContent.slice(0, 65536)}`
                    }, meta);
                }

                return await sock.sendMessage(chatId, {
                    document: buffer,
                    mimetype: contentType,
                    fileName: 'fetched_content',
                    caption: '> > *POWERED BY 乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD*'
                }, meta);
            } catch (err) {
                return await sock.sendMessage(chatId, {
                    text: `❌ Error fetching content: ${err.message}`
                }, { quoted: msg });
            }
        }
    }
];
