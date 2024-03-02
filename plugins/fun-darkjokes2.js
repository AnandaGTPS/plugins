let fetch = require('node-fetch')
let handler = async (m, { conn, text }) => {
    try { 
        let img = await fetch(`https://api.betabotz.eu.org/api/wallpaper/darkjokes?apikey=KLWJcZYg`).then(result => result.buffer())
        await conn.sendFile(m.chat, img, 'file.jpg', wm, m)
    } catch (e) {
        throw `Error ${e}`
    }
}
handler.command = /^(darkjokes2)$/i
handler.tags = ['fun']
handler.help = ['darkjokes2']
handler.limit = true
module.exports = handler