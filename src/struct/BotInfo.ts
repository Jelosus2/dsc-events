import { APIBotInfo } from '../types'

export class BotInfo {
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

    constructor(data: APIBotInfo) {
        this.avatar = data.avatar
        this.owners = data.owners
        this.badges = data.badges
        this.certified = data.certified
        this.approved = data.approved
        this.status = data.status
        this.servers = data.servers
        this.shards = data.shards
        this.name = data.name
        this.shortDescription = data.shortDescription
        this.description = data.description
        this.prefix = data.prefix
    }
}