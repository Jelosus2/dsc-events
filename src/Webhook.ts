const { EventEmitter } = require('events');
const { Client, MessageEmbed } = require('discord.js')

class WebhookAPI extends EventEmitter {
    /**
     * @param {Client} client The Discord Client
     * @param {Object} options Post option
     * @param {String} options.ApiToken The dsc.best api key of your bot
     */

    constructor(client, options) {
        super();

        if (!client) throw new Error('The Discord Client is required')

        if (!options.ApiToken) throw new Error('The API Token is required')
        if (typeof options.ApiToken != 'string') throw new Error('The API Token must be a String')

        /**
         * The Discord Client
         * @type {Client}
         */
        this.client = client

        options = options || {}

        /**
         * The API Token
         * @type {String}
         */ 
        this.apiToken = options.ApiToken 

        /**
         * The version of discord.js
         * @type {String}
         */
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
      /**
       * The Api Token of your bot
       * @type {String}
       */
      this.verification = this.reqParameter.body.verification
      if (!this.verification) return
      if (this.verification != this.apiToken) throw new Error('The API Token sent by the webhook isn\'t the same as the one you introduced, please check it, maybe could be a webhook error')
      /**
       * The eventType, in this case 'vote'
       * @type {String}
       */
      this.eventType = this.reqParameter.body.eventType
      if (this.eventType != 'vote') return
      /**
       * The id of the voter
       * @type {String}
       */
      this.userId = this.reqParameter.body.eventData.user.id
      /**
       * The discriminator of the voter
       * @type {String}
       */
      this.discriminator = this.reqParameter.body.eventData.user.discriminator
      /**
       * The avatar url of the voter
       * @type {String}
       */
      this.userAvatar = this.reqParameter.body.eventData.user.avatar
      /**
       * The usernmae of the voter
       * @type {String}
       */
      this.username = this.reqParameter.body.eventData.user.username
      /**
       * The total votes of your bot
       * @type {Number}
       */
      this.votes = this.reqParameter.body.eventData.votes
    }

    /**
     * @param {MessageEmbed} embed The vote webhook embed
     * @param {String} channelId The channel where vote embed will be sent
     * @param {String} reaction React to the embed (not required)
     */
    sendWebHook(embed, channelId, reaction) {
      if (!embed) throw new Error('The embed is required')

      if (!channelId) throw new Error('Channel id to send the embed is required')
      if (typeof channelId != 'string') throw new Error('The id must be a string')
      if (isNaN(Number(channelId))) throw new Error('The id must be only numbers')

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

export default WebhookAPI