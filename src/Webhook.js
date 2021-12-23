const { EventEmitter } = require('events');
const { MessageEmbed, Client } = require('discord.js')

class WebhookAPI extends EventEmitter {
    /**
     * @param {Client} client The Discord Client
     * @param {String} apiToken The api token of dsc.best
     */

    constructor(client, apiToken) {
        super();

        if (!client) throw new Error('The Discord Client is required')
        if (!(client instanceof Client)) throw new Error('This is not a discord client')

        if (!apiToken) throw new Error('The API Token is required')
        if (typeof apiToken != 'string') throw new Error('The API Token must be a string')

        /**
         * @ The Discord Client
         * @type {Client}
         */
        this.client = client

        /**
         * The API Token
         * @type {String}
         */ 
        this.apiToken = apiToken 

        this.version = 'v13'
    }

    /**
     * @param {String} version
     *  
     */
    discordJSVersion(version) {
        if (!version) version = 'v13'
        if (version != 'v13' && version != 'v12') throw new Error('You must input v12 or v13')

        if (version) this.version = version
    }

    getWebhookData(reqParameter) {
      if (!reqParameter) throw new Error('The express post request parameter is required')

      this.reqParameter = reqParameter
      this.verification = this.reqParameter.body.verification
      if (!this.verification) return
      if (this.verification != this.apiToken) throw new Error('The API Token sent by the webhook isn\'t the same as the one you introduced, please check it, maybe could be a webhook error')
      this.eventType = this.reqParameter.body.eventType
      if (this.eventType != 'vote') return
      this.userId = this.reqParameter.body.eventData.user.id
      this.discriminator = this.reqParameter.body.eventData.user.discriminator
      this.userAvatar = this.reqParameter.body.eventData.user.avatar
      this.username = this.reqParameter.body.eventData.user.username
      this.votes = this.reqParameter.body.eventData.votes
    }

    /**
     * @param {MessageEmbed} embed The vote webhook embed
     * @param {String} channelId The channel where vote embed will be sent
     * @param {String} reaction React to the embed (not required)
     */
    sendWebHook(embed, channelId, reaction) {
      if (!embed) throw new Error('The embed is required')
      if (!(embed instanceof MessageEmbed)) throw new Error('This is not an embed')

      if (!channelId) throw new Error('Channel id to send the embed is required')
      if (typeof channelId != 'string') throw new Error('The id must be a string')
      if (isNaN(channelId)) throw new Error('The id must be only numbers')

      if (!reaction) reaction = 'none'

      if (this.version == 'v13') {
        this.client.channels.cache.get(channelId).send({ embeds: [embed] }).then(msg => {
            if (reaction == 'none') {
    
            } else {
                msg.react(reaction)
            }
          }).catch(error => {
              console.log('Something went wrong \n' + error)
          })
      } else if (this.version == 'v12') {
        this.client.channels.cache.get(channelId).send(embed).then(msg => {
            if (reaction == 'none') {
    
            } else {
                msg.react(reaction)
            }
          }).catch(error => {
              console.log('Something went wrong \n' + error)
          })
      }

    }

} 

module.exports = WebhookAPI