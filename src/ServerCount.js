const { EventEmitter } = require('events')
const fetch = require('node-fetch')
const { Client } = require('discord.js')

class ServerCount extends EventEmitter {

    /**
     * @param {Client} client The Discord Client
     * @param {Object} options Post options
     * @param {String} options.ApiToken The dsc.best api key of your bot
     * @param {Number} options.Interval The interval of time in ms you want to post server count
     */
    constructor(client, options) {
        super();

        if (!client) throw new Error('The Discord Client is required')
        if (!options.ApiToken) throw new Error('The API Token is required')
        if (typeof options.ApiToken != 'string') throw new Error('The API Token must be a String')

        if (!options.Interval) options.Interval = 3600000
        if (isNaN(options.Interval)) throw new Error('The Interval must be only numbers')
        if (parseInt(options.Interval) < 1200000) throw new Error('The Interval must be higher than 20 minutes in ms')

        /**
         * The Discord Client
         */
        this.client = client

        options = options || {};

        /**
         * The API Token
         * @type {String}
         */
        this.apiToken = options.ApiToken

        /**
         * The Interval of time to post server count in ms
         * @type {Number}
         */
        this.interval = options.Interval
    }

    postServerCount() {
        setInterval(() => {
            try {
                fetch(`https://dsc.best/api/v3/${this.client.user.id}/stats`, {
                    method: "POST",
                    headers: {
                        auth: `${this.apiToken}`,
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({server_count: this.client.guilds.cache.size})
                })
                .then(res => res.json())
                .then(data =>{
                    if(data.code !== 200) return console.log(`Error: ${data.msg}`);
                    return console.log(`Status: ${data.msg}`)
                });
                } catch (err) {
                    return console.err(`Failed to update stats on dsc.best: ${err}`);
                }
        }, this.interval)
        
    }

}

module.exports = ServerCount