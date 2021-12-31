import { EventEmitter } from 'events'
import { RESTManager } from '../rest/RESTManager'
import { Request as ExpressRequest } from 'express'
import { Client } from 'discord.js'
import { ClientOptions } from '../types'

import {
    Webhook,
    BotInfo,
    BotVotes
}
from '../struct'

export class DscClient extends EventEmitter {
    readonly client: Client
    readonly apiToken: string
    readonly rest: RESTManager

    constructor(options: ClientOptions) {
        super()

        if (!options.DiscordClient) throw new Error('The Discord Client is required')
        if (!options.DscAPIToken) throw new Error('The Dsc API Token is required')

        if (typeof options.DscAPIToken !== 'string') throw new Error('The API Token must be a string') 

        this.client = options.DiscordClient
        this.apiToken = options.DscAPIToken
        this.rest = new RESTManager(options.DscAPIToken)
    }

    webhooks(reqParameter: ExpressRequest) {
        if (!reqParameter) throw new Error('The express request parameter is required')
        const data = reqParameter.body

        return new Webhook(data, this.client, this.apiToken)
    }

    async postServerCount(Interval?: number, logOnPost?: boolean) {
        if (!logOnPost) logOnPost = false

        if (!Interval) Interval = 3600000 
        if (Interval < 1200000) throw new Error('The Interval must be higher than 20 minutes in ms')

        setInterval(async () => {
            await this.rest.serverCount(this.client, logOnPost)
        }, Interval)
    }

    async getBotInfo(botId?: string) {
        if (!botId) botId = this.client.user?.id
        if (typeof botId != 'string') throw new Error('The bot id must be a string')

        const data = await this.rest.botInfo(botId)
        if (!data) return console.log('Something wrong happened fetching the info, check the bot id')

        return new BotInfo(data)
    }

    async getBotVotes(botId?: string) {
        if (!botId) botId = this.client.user?.id
        if (typeof botId != 'string') throw new Error('The bot id must be a string')

        const data = await this.rest.botVotes(botId)
        if (!data) return console.log('Something wrong happened fetching the info, check the bot id')

        return new BotVotes(data)
    }

}