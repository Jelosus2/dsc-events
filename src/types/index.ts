import { Client } from 'discord.js'

export interface ClientOptions {
    DscAPIToken: string
    DiscordClient: Client
}

export interface APIWebhook {
    verification: string
    eventType: string
    eventData: WebhookEventData
}

export interface WebhookEventData {
    user: WebhookUserData
    votes: number
}

export interface WebhookUserData {
    id: string
    username: string
    discriminator: string
    avatar: string
}

export interface WebhookOptions {
    channelId: string 
    reaction?: string
    discordJSVersion?: 'v12' | 'v13'
}

export interface APIBotInfo {
    avatar: string
    owners: string[]
    badges: string[]
    certified: boolean
    approved: boolean
    status: number
    servers: number
    shards: number
    name: string
    shortDescription: string
    description: string
    prefix: string
}

export interface APIBotVotes {
    votes: number
    users: string[]
}