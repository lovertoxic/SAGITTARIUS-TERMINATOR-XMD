const { ezra } = require("../fredi/ezra");
const { ajouterOuMettreAJourJid, mettreAJourAction, verifierEtatJid } = require("../lib/antilien");
const { atbajouterOuMettreAJourJid, atbverifierEtatJid } = require("../lib/antibot");
const fs = require("fs-extra");
const conf = require("../set");
const { default: axios } = require('axios');

ezra({ nomCom: "forward", categorie: 'Fredi-Group', reaction: "📤" }, async (dest, zk, commandeOptions) => {
  const { ms, repondre, arg, verifGroupe, nomGroupe, infosGroupe, nomAuteurMessage, verifAdmin, superUser  } = commandeOptions;

  if (!verifGroupe) {
    repondre("*😮‍💨  😮‍💨 Uuuuhh!! this command is reserved for groups Only❌*");
    return;
  }

  let mess = arg && arg.length > 0 ? arg.join(' ') : 'Aucun Message';
  let membresGroupe = verifGroupe ? await infosGroupe.participants : "";

  if ( verifAdmin | superUser ) {
    // Send the message to each member's number
    for (const membre of membresGroupe) {
      const memberNumber = membre.id.split('@')[0]; // Extract the number from the ID
      // Send the message directly to the member's DM
      await zk.sendMessage(memberNumber, { text: mess });
    }
    repondre('*乂✰ȶɛʀʍɨռǟȶօʀ✰乂-XMD Forwarded Your Message To All group members in their DMs.*');
  } else {
    repondre('*Only My Owner Can Use This Command.*');
  }
});
