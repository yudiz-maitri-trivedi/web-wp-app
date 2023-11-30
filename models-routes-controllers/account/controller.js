const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal');

async function initAccount(req, res) {
    const wpClient = new Client({ authStrategy: new LocalAuth({ clientId: req.body.clientId })})

    wpClient.on('qr', (qr) => {
        qrcode.generate(qr, { small: true })
    })
    
    wpClient.on('ready', () => {
        console.log('client is ready')
        wpClient.getChats().then((chats) => {
            const data = chats.find((chat) => chat.name === 'Dad')
            wpClient.sendMessage(data.id._serialized, 'Hello..This is automated message!!')
            // const media =  MessageMedia.fromUrl('./test.png');
            // data.sendMessage(media, { caption: 'Hello, Greetings from...'});
        })
    })
    wpClient.initialize()
}

module.exports = initAccount
