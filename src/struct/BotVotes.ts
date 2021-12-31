import { APIBotVotes } from '../types'

export class BotVotes {
    votes: number
    users: string[]

    constructor(data: APIBotVotes) {
        this.votes = data.votes
        this.users = data.users
    }
}