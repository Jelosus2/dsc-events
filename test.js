const discord = require('discord.js')
const client = new discord.Client({
    intents: [discord.Intents.FLAGS.GUILDS, discord.Intents.FLAGS.GUILD_MESSAGES]
})

const { InfoRequester } = require('../target/main') //ok we have js one running in mainstream i will handle this personally if i find a fix
 // but if we only import one then ppl only can import one // i prefer having it in js that making 3 packages, ik, xd, imagine 3 packages // ok
const infoRequester = new InfoRequester(client,'works') // im testing if works outside the folder
 
client.on('ready', async() => { // bro you literally required ./main how will it work? //thats when i got the files out of the folder
    console.log('Noice') 

    const info = await infoRequester.getBotInfo('id_here') 
    console.log(info) 
})    

client.login('token_here') 