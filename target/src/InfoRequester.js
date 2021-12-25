"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InfoRequester = void 0;
const { EventEmitter } = require('events');
const fetch = require('node-fetch');
const { Client } = require('discord.js');
class InfoRequester extends EventEmitter {
    /**
     * @param {Client} client The Discord Client
     */
    constructor(client) {
        super();
        if (!client)
            throw new Error('The Discord Client is required');
        /**
         * The Discord Client
         * @type {Client}
         */
        this.client = client;
    }
    /**
     * @param {String} botId An id of a bot listed in dsc.best
     */
    async getBotInfo(botId) {
        if (!botId)
            botId = this.client.user.id;
        if (isNaN(botId))
            throw new Error('The bot id must be only numbers');
        await fetch(`https://dsc.best/api/v1/bot/${botId}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
            /**
             * The bot's avatar url
             * @type {String}
             */
            this.avatar = data.avatar;
            /**
             * The owners of the bot
             * @type {Array}
             */
            this.owners = data.owners;
            /**
             * The badges of the bot
             * @type {Array}
             */
            this.badges = data.badges;
            /**
             * Show's if the bot is cercitified or not
             * @type {Boolean}
             */
            this.isCertified = data.certified;
            /**
             * Show's if the bot is approved or not
             * @type {Boolean}
             */
            this.isApproved = data.approved;
            /**
             * The number of servers where the bot is in
             * @type {Number}
             */
            this.servers = data.servers;
            /**
             * The number of bot's shards
             * @type {Number}
             */
            this.shards = data.shards;
            /**
             * The name of the bot
             * @type {String}
             */
            this.name = data.name;
            /**
             * A short description about the bot
             * @type {String}
             */
            this.shortDescription = data.shortDescription;
            /**
             * The entire description of the bot
             * @type {String}
             */
            this.description = data.description;
            /**
             * The prefix of the bot
             * @type {String}
             */
            this.prefix = data.prefix;
        })
            .catch((error) => {
            return console.log('Something went wrong fetching the information, maybe this bot isn\'t listed in dsc.best');
        });
    }
    async getVotes(botId) {
        if (!botId)
            botId = this.client.user.id;
        if (isNaN(botId))
            throw new Error('The bot id must be only numbers');
        await fetch(`https://dsc.best/api/v1/votes/${botId}`, {
            method: 'get',
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((res) => res.json())
            .then((data) => {
            /**
             * The bot total votes
             * @type {Number}
             */
            this.votes = data.votes;
            /**
             * The discord ids of the people who voted thebot
             * @type {Array}
             */
            this.voters = data.users;
        })
            .catch((error) => {
            return console.log('Something went wrong fetching the votes, maybe this bot isn\'t listed in dsc.best');
        });
    }
}
exports.InfoRequester = InfoRequester;
