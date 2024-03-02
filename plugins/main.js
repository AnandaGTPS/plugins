let handler = async (m, {conn, text}) => {
  if (!text) return m.reply('Contoh penggunaan:\n.nazzplugins list <tags (opsional)>\n.nazzplugins get javascript-obfuscator');
  const version = "1.0.1"
  let nazz = text.split(" ");
  const fetch = require('node-fetch');
    const res = await fetch('https://raw.githubusercontent.com/AnandaGTPS/plugins/main/version.json');
    const data = await res.json();
    if(parseInt(version.split(".").join("")) < parseInt(data.plugins.main.split(".").join(""))) return m.reply(data.outdated_mess) 
  if (nazz[0] === 'list') {
    const teks = '『 ɴᴀᴀᴀᴢᴢᴢᴢ 』\n*𖦹 Creator*: '+data.creator+'\n*𖦹 Contact*: '+data.contact+'\n*𖦹 Community*: '+data.community+'\n*𖦹 Message*: '+data.message+'\n\n⧼ List Plugins ⧽\n'+Object.keys(data.plugins).map(v => `*×* ${v} : ${data.plugins[v]}`).join("\n");
    m.reply(teks);
  } else if (nazz[0] === 'get') {
    if (!nazz[1]) return m.reply('Masukan nama pluginnya!');
    if(Object.keys(data.plugins).includes(nazz[1])) {
      const axios = require('axios');
      const util = require('util');
      const fs = require('fs');
      const response = await axios.get(`https://raw.githubusercontent.com/AnandaGTPS/plugins/main/${data.path}/${nazz[1]}.js`);
      let path = `./plugins/${nazz[1]}.js`
      fs.writeFileSync(path, response.data.toString());
      m.reply(`Plugins "${nazz[1]}" tersimpan di ${path}`);
    } else {
      m.reply(`Plugin "${nazz[1]}" tidak ditemukan`);
    }
  } else {
    m.reply('Contoh penggunaan:\n.nazzplugins list\nnazzplugins get javascript-obfuscator');
  }
};

handler.help = ['nazzplugin'];
handler.tags = ['tool'];
handler.command = /^(nazzplugin|nazzplugins)$/i;
handler.owner = true;

module.exports = handler;