import { RequestHandler } from './RequestHandler'
import { Client } from 'discord.js'

export class RESTManager {
    readonly handler: RequestHandler

    constructor(ApiToken: string) {
        this.handler = new RequestHandler(ApiToken)
    }

    async serverCount(DiscordClient: Client, showOnPost?: boolean) {
        const body = {server_count: DiscordClient.guilds.cache.size}

        return this.handler.post(`${DiscordClient.user?.id}/stats`, body, showOnPost)
    }

    async botInfo(botId: string) {
        return this.handler.request(`bot/${botId}`)
    }

    async botVotes(botId: string) {
        return this.handler.request(`votes/${botId}`)
    }
}