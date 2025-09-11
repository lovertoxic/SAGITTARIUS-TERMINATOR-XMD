"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { ezra } = require("../fredi/ezra");

ezra({ nomCom: "channel", reaction: "💐", nomFichier: __filename }, async (dest, zk, commandeOptions) => {
    console.log("Commande saisie !!!s");
    let z = 'Salut je m\'appelle TERMINATOR-XMD* \n\n ' + 'je suis un bot Whatsapp Multi-appareil voici la chaîne';
    let d = ' developpé par *sir bravin*';
    let varmess = z + d;
    var lien = 'https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d';  // Remplacez cet URL par le lien que vous souhaitez envoyer
    await zk.sendMessage(dest, { text: varmess + "\n" + lien });
});

console.log("mon test");

;
console.log("mon test");
/*module.exports.commande = () => {
  var nomCom = ["test","t"]
  var reaction="☺️"
  return { nomCom, execute,reaction }
};

async function  execute  (origineMessage,zok) {
  console.log("Commande saisie !!!s")
   let z ='Salut je m\'appelle *TERMONATOR-XMD* \n\n '+'je suis un bot Whatsapp Multi-appareil '
      let d =' developpé par *sir ArnoldT20*'
      let varmess=z+d
      var img='https://whatsapp.com/channel/0029Vb6H6jF9hXEzZFlD6F3d'
await  zok.sendMessage(origineMessage,  { image:{url:img},caption:varmess});
}  */ 
