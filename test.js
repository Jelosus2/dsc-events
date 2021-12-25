const discord = require('discord.js')
const client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]
})

const { InfoRequester } = require('./index/main')
const info = new InfoRequester(client)

client.on('ready', async() => {
    console.log('Noice')

    await info.getBotInfo('876901696738058261')
    console.log(info)
})

client.login('')