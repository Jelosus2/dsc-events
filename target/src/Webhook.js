//const { EventEmitter } = require('events');
const { MessageEmbed } = require('discord.js');
class WebhookAPI extends EventEmitter {
    /**
     * @param {Client} client The Discord Client
     * @param {Object} options Post option
     * @param {String} options.ApiToken The dsc.best api key of your bot
     */
    constructor(client, options) {
        super();
        if (!client)
            throw new Error('The Discord Client is required');
        if (!options.ApiToken)
            throw new Error('The API Token is required');
        if (typeof options.ApiToken != 'string')
            throw new Error('The API Token must be a String');
        /**
         * The Discord Client
         * @type {Client}
         */
        this.client = client;
        options = options || {};
        /**
         * The API Token
         * @type {String}
         */
        this.apiToken = options.ApiToken;
        /**
         * The version of discord.js
         * @type {String}
         */
        this.discordJSVersion = 'v13';
    }
    getWebhookData(reqParameter) {
        if (!reqParameter)
            throw new Error('The express post request parameter is required');
        this.reqParameter = reqParameter;
        /**
         * The Api Token of your bot
         * @type {String}
         */
        const verification = this.reqParameter.body.verification;
        if (!verification)
            return;
        if (verification != this.apiToken)
            throw new Error('The API Token sent by the webhook isn\'t the same as the one you introduced, please check it, maybe could be a webhook error');
        /**
         * The eventType, in this case 'vote'
         * @type {String}
         */
        const eventType = this.reqParameter.body.eventType;
        if (eventType != 'vote')
            return;
        /**
         * The id of the voter
         * @type {String}
         */
        const userId = this.reqParameter.body.eventData.user.id;
        /**
         * The discriminator of the voter
         * @type {String}
         */
        const discriminator = this.reqParameter.body.eventData.user.discriminator;
        /**
         * The avatar url of the voter
         * @type {String}
         */
        const userAvatar = this.reqParameter.body.eventData.user.avatar;
        /**
         * The usernmae of the voter
         * @type {String}
         */
        const username = this.reqParameter.body.eventData.user.username;
        /**
         * The total votes of your bot
         * @type {Number}
         */
        const votes = this.reqParameter.body.eventData.votes;
        return { userId: userId, discriminator: discriminator, avatar: userAvatar, username: username, votes: votes };
    }
    /**
     * @param {MessageEmbed} embed The vote webhook embed
     * @param {Object} options The options to send webhooks
     * @param {String} options.channelId The id of the channel where you want to send the webhook
     * @param {String} [options.discordJSVersion] The version of discord.js your using
     * @param {String} [options.reaction] The reaction unicode to react in the embed
     */
    sendWebHook(embed, options) {
        if (!embed)
            throw new Error('The embed is required');
        if (!options.channelId)
            throw new Error('Channel id to send the embed is required');
        if (typeof options.channelId != 'string')
            throw new Error('The id must be a string');
        if (isNaN(Number(options.channelId)))
            throw new Error('The id must be only numbers');
        if (!options.reaction)
            options.reaction = 'none';
        if (!options.discordJSVersion)
            options.discordJSVersion = 'v13';
        if (options.discordJSVersion != 'v13' && options.discordJSVersion != 'v12')
            throw new Error('You must input v12 or v13');
        if (options.discordJSVersion)
            this.discordJSVersion = options.discordJSVersion;
        options = options || {};
        if (this.discordJSVersion == 'v13') {
            try {
                this.client.channels.cache.get(options.channelId).send({ embeds: [embed] }).then((msg) => {
                    if (options.reaction == 'none') {
                    }
                    else {
                        msg.react(options.reaction);
                    }
                });
            }
            catch (error) {
                console.log('Something went wrong sending the webhook, maybe the cache don\'t get the id of the channel or its wrong');
            }
        }
        else if (this.discordJSVersion == 'v12') {
            try {
                this.client.channels.cache.get(options.channelId).send(embed).then((msg) => {
                    if (options.reaction == 'none') {
                    }
                    else {
                        msg.react(options.reaction);
                    }
                });
            }
            catch (error) {
                console.log('Something went wrong sending the webhook, maybe the cache don\'t get the id of the channel or its wrong');
            }
        }
    }
}
module.exports = WebhookAPI;
