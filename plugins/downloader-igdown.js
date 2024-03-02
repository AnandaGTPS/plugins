// saat ingin menggunakan fitur ini, jangan lupa install package nya
// npm i btch-downloader

const { igdl } = require('btch-downloader')

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Contoh:* ${usedPrefix}${command} https://www.instagram.com/p/ByxKbUSnubS/?utm_source=ig_web_copy_link`

    try {
        const url = args[0];
        const data = await igdl(url);
        const videoUrl = data[0].url;

        await conn.sendFile(m.chat, videoUrl, null, `*Instagram Downloader*`, m);
    } catch (e) {
        throw `*Server Down!*`;
    }
}

handler.help = ['igdown'].map(v => v + ' <url>')
handler.tags = ['downloader']
handler.command = /^(igdown)$/i
handler.limit = false

module.exports = handler