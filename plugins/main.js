let handler = async (m, {conn, text}) => {
  if (!text) return m.reply('Contoh penggunaan:\n.nazzplugins list <tags (opsional)>\n.nazzplugins get javascript-obfuscator');
  const version = "1.0.2"
  let nazz = text.split(" ");
  const axios = require('axios');

async function fetchJson(url, options) {
    try {
        options ? options : {}
        const res = await axios({
            method: 'GET',
            url: url,
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
            },
            ...options
        })
        return res.data
    } catch (err) {
        return err
    }
}
    const data = await fetchJson('https://raw.githubusercontent.com/AnandaGTPS/plugins/main/version.json');
    if(parseInt(version.split(".").join("")) < parseInt(data.plugins.main.split(".").join(""))) return m.reply(data.outdated_mess) 
  if (nazz[0] === 'list') {
  	let plug = nazz[1] ? Object.keys(data.plugins).filter(v => v.startsWith(nazz[1])):Object.keys(data.plugins) 
    const teks = '* Creator*: '+data.creator+'\n* Contact*: '+data.contact+'\n* Community*: '+data.community+'\n* Message*: '+data.message+'\n* Total*: '+plug.length.toString()+'\n\n List Plugins \n'+plug.sort((a, b) => a.localeCompare(b)).map(v => `*×* ${v} : ${data.plugins[v]}`).join("\n");
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