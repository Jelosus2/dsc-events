const { EventEmitter } = require('events')
const fetch = require('node-fetch')
const { Client } = require('discord.js')

class InfoRequester extends EventEmitter {

    /**
     * @param {Client} client The Discord Client
     */
    constructor(client) {
        super();

        if (!client) throw new Error('The Discord Client is required')

        /**
         * The Discord Client
         * @type {Client}
         */
        this.client = client
    }

    /**
     * @param {String} botId An id of a bot listed in dsc.best
     */
    async getBotInfo(botId) {

        if (!botId) botId = this.client.user.id
        if (isNaN(botId)) throw new Error('The bot id must be only numbers')

        await fetch(`https://dsc.best/api/v1/bot/${botId}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            /**
             * The bot's avatar url
             * @type {String}
             */
            this.avatar = data.avatar
            /**
             * The owners of the bot
             * @type {Array}
             */
            this.owners = data.owners
            /**
             * The badges of the bot
             * @type {Array}
             */
            this.badges = data.badges
            /**
             * Show's if the bot is cercitified or not
             * @type {Boolean}
             */
            this.isCertified = data.certified
            /**
             * Show's if the bot is approved or not
             * @type {Boolean}
             */
            this.isApproved = data.approved
            /**
             * The number of servers where the bot is in
             * @type {Number}
             */
            this.servers = data.servers
            /**
             * The number of bot's shards
             * @type {Number}
             */
            this.shards = data.shards
            /**
             * The name of the bot
             * @type {String}
             */
            this.name = data.name
            /**
             * A short description about the bot
             * @type {String}
             */
            this.shortDescription = data.shortDescription
            /**
             * The entire description of the bot
             * @type {String}
             */
            this.description = data.description
            /**
             * The prefix of the bot
             * @type {String}
             */
            this.prefix = data.prefix
        })
        .catch(error => {
            return console.log('Something went wrong fetching the information, maybe this bot isn\'t listed in dsc.best')
        })

        const avatar = this.avatar
        const owners = this.owners
        const badges = this.badges
        const certified = this.isCertified
        const approved = this.isApproved
        const servers = this.servers
        const shards = this.shards
        const name = this.name
        const shortDescription = this.shortDescription
        const description = this.description
        const prefix = this.prefix

        return { avatar: avatar, owners: owners, badges: badges, isCertified: certified, isApproved: approved, servers: servers, shards: shards, name: name, shortDescription: shortDescription, description: description, prefix: prefix }
    }

    async getVotes(botId) {
        if (!botId) botId = this.client.user.id
        if (isNaN(botId)) throw new Error('The bot id must be only numbers')

        await fetch(`https://dsc.best/api/v1/votes/${botId}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            /**
             * The bot total votes
             * @type {Number}
             */
            this.votes = data.votes 
            /**
             * The discord ids of the people who voted thebot
             * @type {Array}
             */
            this.voters = data.users
        })
        .catch(error => {
            return console.log('Something went wrong fetching the votes, maybe this bot isn\'t listed in dsc.best')
        })

        const votes = this.votes
        const voters = this.voters

        return { votes: votes, voters: voters }
    }
}

module.exports = InfoRequester