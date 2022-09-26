import { TelegramClient, Api } from "telegram"
import { StringSession } from "telegram/sessions"

type INITConfig = {
    phone: string
    passwd?: string
    code?: string
}

type LoginWithString = { type: "string", data: { strSession: string } }
type LoginWithAuth = { type: "auth", data: { phone: string, passwd: string, code: string } }

export class TGClient {

    private API_CONFIG = {
        ID: 16936116,
        HASH: "fc7121dfb734f9b331a54348dae89982"
    }

    private client: TelegramClient

    constructor(strSession: string) {
        this.client = new TelegramClient(new StringSession(strSession), this.API_CONFIG.ID, this.API_CONFIG.HASH, {
            connectionRetries: 5,
            appVersion: "0.1"
        });
    }

    public getMe() {
        return this.client.getMe()
    }
}