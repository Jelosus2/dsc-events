import fetch from "node-fetch"

export class RequestHandler {
    apiToken: string

    constructor(ApiToken: string) {
        this.apiToken = ApiToken
    }

    async request(path: string) {
        const res = await fetch(`https://dsc.best/api/v1/${path}`, {
            method: 'GET', 
            headers: { 
                "Content-Type": "application/json" 
            }
        }).catch(() => null)

        const data = await res?.json().catch(() => null)

        return data
    } 

    async post(path: string, body: object, showOnPost?: boolean) {
        try {
            await fetch(`https://dsc.best/api/v3/${path}`, {
                method: 'POST',
                body: JSON.stringify(body), 
                headers: { 
                    auth: `${this.apiToken}`, "Content-Type": "application/json" 
                }
            })
            .then(res => res.json())
            .then(data => {
                if (data?.code !== 200) return console.log(`Error: ${data.msg}`)
                if (showOnPost == true) return console.log(`Status: ${data.msg}`)
            })
            .catch(() => null)
        } catch (err) {
            return console.error(`Failed to update stats on dsc.best: ${err}`);
        }

    }

}