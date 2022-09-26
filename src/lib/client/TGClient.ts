import { TelegramClient } from "telegram"
import { StringSession } from "telegram/sessions"
import { isBrowser } from "telegram/platform"

export class TGClient {
    // API Config
    private API_CONFIG = {
        ID: 16936116,
        HASH: "fc7121dfb734f9b331a54348dae89982"
    }
    private client: TelegramClient

    // Events
    public onError: ((err: Error) => void) | undefined = undefined;
    public onLoginSuccess: ((token: string) => void) | undefined = undefined

    // Login Events
    public queryPassword: undefined | (() => Promise<string>) = undefined;
    public queryCode: undefined | (() => Promise<string>) = undefined;

    // Constructor
    constructor(strSession = "") {
        if (!isBrowser) throw new Error("This constructor can run only in browser");

        this.client = new TelegramClient(new StringSession(strSession), this.API_CONFIG.ID, this.API_CONFIG.HASH, {
            connectionRetries: 5,
            appVersion: "0.1",
        });
    }

    /* METHODS */
    public async login(number = "") {
        const [qPass, qCode] = [this.queryPassword, this.queryCode]

        if (number == "") throw new Error("Number not set");
        if (qPass == undefined) throw new Error("queryPassword not hocked");
        if (qCode == undefined) throw new Error("queryCode not hocked");

        await this.client.start({
            phoneNumber: async () => number,
            password: async () => await qPass(),
            phoneCode: async () => await qCode(),
            onError: async (err) => {
                this.onError ? this.onError(err) : console.error(err)
                await this.client.disconnect()
                await this.client.destroy()
                return true;
            }
        });

        console.log("Login OK", this.getTokenString())
    }

    public getTokenString(): string | undefined {
        const tkn = this.client.session.save()
        if (typeof (tkn) == "string") return tkn
        return undefined
    }

}