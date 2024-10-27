import { WSEvents, WsTransport } from '../services/WsTransport.ts'
import { Message } from '../app/types'

const WS_URL = 'wss://ya-praktikum.tech/ws/chats'

type MessagesHandler = (messages: Message[]) => void

export class MessagesApi {
    private wsTransport: WsTransport
    private callback: MessagesHandler

    constructor(
        userId: number,
        chatId: number,
        token: string,
        callback: MessagesHandler,
    ) {
        this.wsTransport = new WsTransport(
            `${WS_URL}/${userId}/${chatId}/${token}`,
        )
        this.callback = callback
    }

    public connect() {
        const messagesHandler = this.receiveMessages.bind(this)
        this.wsTransport.on(WSEvents.Message, messagesHandler)

        return this.wsTransport
            .connect()
            .then(() => {
                this.wsTransport.send({ content: '0', type: 'get old' })
            })
            .catch((error) => {
                console.error(error)
            })
    }

    disconnect() {
        this.wsTransport.close()
    }

    public addMessage(message: string) {
        this.wsTransport.send({ content: message, type: 'message' })
    }

    private receiveMessages(data: unknown) {
        const messages = Array.isArray(data) ? data : [data]

        this.callback(messages)
    }
}
