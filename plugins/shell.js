const { ezra } = require('../fredi/ezra');
const Heroku = require('heroku-client');
const s = require("../set");
const axios = require("axios");
const speed = require("performance-now");
const { exec } = require("child_process");
const conf = require(__dirname + "/../set");

// Command to execute shell commands
ezra({
  nomCom: "shell",
  aliases: ["getcmd", "cmd"],
  reaction: '💨',
  categorie: "system"
}, async (context, message, params) => {
  const { repondre: sendResponse, arg: commandArgs, superUser: Owner, auteurMessage } = params;
  if (!Owner) {
    return sendResponse("You are not authorized to execute shell commands.");
  }
  const command = commandArgs.join(" ").trim();
  if (!command) {
    return sendResponse("Please provide a valid shell command.");
  }
  exec(command, (err, stdout, stderr) => {
    if (err) {
      return sendResponse(`Error: ${err.message}`);
    }
    if (stderr) {
      return sendResponse(`stderr: ${stderr}`);
    }
    if (stdout) {
      return sendResponse(stdout);
    }
    return sendResponse("Command executed successfully, but no output was returned.");
  });
});

// Command to fetch URL content
ezra({
  nomCom: "fetch",
  aliases: ["get", "find"],
  categorie: "system",
  reaction: '🧳',
}, async (sender, zk, context) => {
  const { repondre: sendResponse, arg: args } = context;
  const urlInput = args.join(" ");
  if (!/^https?:\/\//.test(urlInput)) {
    return sendResponse("Start the *URL* with http:// or https://");
  }
  try {
    const url = new URL(urlInput);
    const fetchUrl = `${url.origin}${url.pathname}?${url.searchParams.toString()}`;
    const response = await axios.get(fetchUrl, { responseType: 'arraybuffer' });
    if (response.status !== 200) {
      return sendResponse(`Failed to fetch the URL. Status: ${response.status} ${response.statusText}`);
    }
    const contentLength = response.headers['content-length'];
    if (contentLength && parseInt(contentLength) > 104857600) {
      return sendResponse(`Content-Length exceeds the limit: ${contentLength}`);
    }
    const contentType = response.headers['content-type'];
    console.log('Content-Type:', contentType);
    const buffer = Buffer.from(response.data);
    if (/image\/.*/.test(contentType)) {
      await zk.sendMessage(sender, { image: { url: fetchUrl }, caption: `> > *${conf.BOT}*` }, { quoted: context.ms });
    } else if (/video\/.*/.test(contentType)) {
      await zk.sendMessage(sender, { video: { url: fetchUrl }, caption: `> > *${conf.BOT}*` }, { quoted: context.ms });
    } else if (/audio\/.*/.test(contentType)) {
      await zk.sendMessage(sender, { audio: { url: fetchUrl }, caption: `> > *${conf.BOT}*` }, { quoted: context.ms });
    } else if (/text|json/.test(contentType)) {
      try {
        const json = JSON.parse(buffer);
        console.log("Parsed JSON:", json);
        sendResponse(JSON.stringify(json, null, 10000));
      } catch {
        sendResponse(buffer.toString().slice(0, 10000));
      }
    } else {
      await zk.sendMessage(sender, { document: { url: fetchUrl }, caption: `> > *${conf.BOT}*` }, { quoted: context.ms });
    }
  } catch (error) {
    console.error("Error fetching data:", error.message);
    sendResponse(`Error fetching data: ${error.message}`);
  }
});
