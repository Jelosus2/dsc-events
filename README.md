# Dsc.best Functions
> Manage the dsc.best events easily

# Support
If you need help with the package or have any question you can join our [support server](https://discord.gg/UqUcHVhdhV)

# Table of Contents
- [Webhooks](https://github.com/Jelosus2/dsc-functions#webhooks)
- [Post Server Count](https://github.com/Jelosus2/dsc-functions#post-server-count)
- [Bot Information and Votes](https://github.com/Jelosus2/dsc-functions#bot-information-and-votes)

**Its highly recommended using node v16+ for a good performance of the package**

# Webhooks
Send a message (or embed) when someone votes for your bot

## Prerequisites 
Before you configure the package you need to do 3 things:
1. Have your bot listed in [dsc.best](https://dsc.best/)  
2. **Install and setup the [express](https://www.npmjs.com/package/express) and [discord.js](https://www.npmjs.com/package/discord.js) packages**
3. Add the endpoint url in your bot's panel (https://dsc.best/dashboard/bot/YOUR-BOT-ID-HERE) of dsc.best

_Picture Example_
![](https://i.imgur.com/qMNf9lI.png) 
## Setup 
```npm
npm install dsc-functions --save
```
### In your main file
```js
const Discord = require('discord.js');
const Client = new Discord.Client({
	intents: [Discord.Intents.FLAGS.GUILDS, 
	Discord.Intents.FLAGS.GUILD_MESSAGES] //Only add intents if you work in v13
})

const { WebhookAPI } = require('dsc-functions') // import the package
const express = require('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

client.on('ready', () => {
	console.log('Online!')
})

const dscWebhook = new WebhookAPI(Client, { ApiToken: 'YOUR-DSC-BEST-BOT-API-TOKEN' }) // add the discord client and the dsc.best api token of your bot

app.post('/endpointname', (req, res) => {
	const info = dscWebhook.getWebhookData(req)
	
	const webhookEmbed = new Discord.MessageEmbed()
	.setDescription(`${info.username} has voted, and now i have ${info.votes} votes`)
	
	dscWebhook.sendWebhook(webhookEmbed, {
		channelId: '856544223801245736', // Here goes the id the channel where you want to send the embed
		reaction: '💟', // Reaction not required (reaction unicode), support animated, normal and custom emojis
		discordJSVersion: 'v13' //We support v12 too (if you are a v13 user this line is optional)
	})
})

app.listen(3000, console.log('Server listening on port 3000'))
Client.login('YOUR-BOT-TOKEN-HERE')
```

## Data you can request of Webhooks
- Username
- Discriminator
- User ID
- User Avatar
- Total Votes of your bot

# Post Server Count
Post the server count of your bot

## Prerequisites
  1. Have your bot listed in [dsc.best](https://dsc.best/)

### In your main file
```js
/* The server count will not be updated till the interval time ends */

const Discord = require('discord.js')
const Client = new Discord.Client({
	intents: [Discord.Intents.FLASG.GUILDS,
	Discord.Intents.FLAGS.GUILD_MESSAGES]
})
const { ServerCount } = require('dsc-functions') //import the package
const post_server_count = new ServerCount(Client, {
	ApiToken: 'YOUR-DSC-BEST-API-TOKEN' ,
	Interval: 1200000 // Interval in ms to post server count, can't be less than 1200000 (20min)
})

Client.on('ready', () => {
	post_server_count.postServerCount() // put it in the ready event
})

Client.login('YOUR-BOT-TOKEN-HERE')
```

# Bot Information and Votes
Get information and vote's information about dsc.best listed bots

### In your main file
```js
const Discord = require('discord.js')
const Client = new Discord.Client({
	intents: [Discord.Intents.FLASG.GUILDS,
	Discord.Intents.FLAGS.GUILD_MESSAGES]
})
const { InfoRequester } = require('dsc-functions')
const infoRequester = new InfoRequester(Client)

client.on('ready', async() => { // The methods getBotInfo and getVotes must be in a client event such as ready, messageCreate (message for v12), etc.
	/* Information */
	const botInfo = await info.getBotInfo('BOT-ID-HERE') // if you have your bot listed and want to get the info you don't need to input the id 
	
	console.log(`${botInfo.name}\n${botInfo.owners}`) // Scroll down to see what information you can get
	
	/* Votes */
	const votesInfo = await info.getVotes('BOT-ID-HERE') // if you have your bot listed and want to get the votes you don't need to input the id
	console.log(`Votes: ${votesInfo.votes}\nVoters: ${votesInfo.voters}`)
})

Client.login('YOUR-BOT-TOKEN-HERE')
```

## Information you can request about bots
- Avatar
- Owners
- Badges
- If its certified
- If its approved
- Servers count
- Shards count
- Name
- Short Description
- Entire Description
- Prefix

### Creators
Coder: [Jelosus1](https://github.com/Jelosus2/)
Project Setup: [ASHUdev05](https://github.com/ASHUdev05)

## License
MIT License

Copyright (c) 2021 Jelosus1

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

