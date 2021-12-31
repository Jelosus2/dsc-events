import { APIWebhook, WebhookEventData, WebhookOptions } from '../types'
import { Client, MessageEmbed } from 'discord.js'

export class Webhook {
    verification: string
    eventType: string
    eventData: WebhookEventData

    constructor(data: APIWebhook, private DiscordClient: Client, ApiToken: string) {
        this.verification = data.verification
        this.eventType = data.eventType
        this.eventData = data.eventData

        if (!this.verification) return
        if (this.verification != ApiToken) throw new Error('The API Token sent by the webhook isn\'t the same as the one you introduced, please check it, maybe could be a webhook error')

        if (this.eventType != 'vote') return
    }

    sendWebhook(embed: MessageEmbed, options: WebhookOptions) {
        if (!embed) throw new Error('The embed is required')

        if (!options.channelId) throw new Error('Channel id to send the embed is required')
        if (typeof options.channelId != 'string') throw new Error('The id must be a string')

        if (!options.reaction) options.reaction = 'none'

        if (!options.discordJSVersion) options.discordJSVersion = 'v13'
        if (options.discordJSVersion != 'v13' && options.discordJSVersion != 'v12') throw new Error('You must input v12 or v13 in discord.js version')
  
        if (options.discordJSVersion == 'v13') {
            try {
                // @ts-ignore
                this.DiscordClient.channels.cache.get(options.channelId).send({ embeds: [embed] }).then(msg => {
                    if (options.reaction == 'none') {
            
                    } else {
                        msg.react(options.reaction)
                    }
                  })
                } catch (error) {
                    console.log('Something went wrong sending the webhook, maybe the cache don\'t get the id of the channel or its wrong')
                }
        } else if (options.discordJSVersion == 'v12') {
            try {
                // @ts-ignore
                this.DiscordClient.channels.cache.get(options.channelId).send(embed).then(msg => {
                    if (options.reaction == 'none') {
            
                    } else {
                        msg.react(options.reaction)
                    }
                })
            } catch (error) {
                console.log('Something went wrong sending the webhook, maybe the cache don\'t get the id of the channel or its wrong')
            }
        }
    }
}