const { ezra } = require("../fredi/ezra");
const fancy = require("../fredi/style");

ezra({ nomCom: "fancy", categorie: "sir bravin-Fun", reaction: "✍️" }, async (dest, zk, commandeOptions) => {
    const { arg, repondre, prefixe } = commandeOptions;
    const id = arg[0]?.match(/\d+/)?.join('');
    const text = arg.slice(1).join(" ");

    try {
        if (id === undefined || text === undefined) {
            return await repondre(`\nExemple : ${prefixe}fancy 10 👩‍❤️‍💋‍👩TOXIC LOVER-V2 XMD👩‍❤️‍💋‍👩\n` + String.fromCharCode(8206).repeat(4001) + fancy.list('👩‍❤️‍💋‍👩TOXIC LOVER-V2 XMD👩‍❤️‍💋‍👩', fancy));
        }

        const selectedStyle = fancy[parseInt(id) - 1];
        if (selectedStyle) {
            return await repondre(fancy.apply(selectedStyle, text));
        } else {
            return await repondre('_Style introuvable :(_');
        }
    } catch (error) {
        console.error(error);
        return await repondre('_Une erreur s\'est produite :(_');
    }
});
