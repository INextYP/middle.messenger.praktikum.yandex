import { HTTPTransport } from './httpTransport.ts'

export const BASE_URL = 'https://ya-praktikum.tech/api/v2'

export abstract class Api {
    private readonly baseUrl: string
    private httpInstance?: HTTPTransport

    constructor(path: string) {
        this.baseUrl = BASE_URL + path
    }

    getInstance() {
        if (!this.httpInstance) {
            this.httpInstance = new HTTPTransport(this.baseUrl)
        }

        return this.httpInstance
    }
}
