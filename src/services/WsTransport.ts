import { EventBus } from './event-bus.ts'

const WS_PING_INTERVAL = 5000

export const WSEvents = {
    Connected: 'connected',
    Error: 'error',
    Close: 'close',
    Message: 'message',
} as const

export class WsTransport extends EventBus {
    private socketUrl: string
    private socket?: WebSocket
    private ping?: ReturnType<typeof setInterval>

    constructor(socketUrl: string) {
        super()
        this.socketUrl = socketUrl
    }

    send(data: unknown) {
        if (!this.socket) {
            throw new Error('Socket is not connected')
        }

        this.socket.send(JSON.stringify(data))
    }

    connect(): Promise<void> {
        if (this.socket) {
            throw new Error('The socket is already connected')
        }

        this.socket = new WebSocket(this.socketUrl)

        this.subscribe(this.socket)

        this.setupPing()

        return new Promise((resolve, reject) => {
            this.on(WSEvents.Error, reject)
            this.on(WSEvents.Connected, () => {
                this.off(WSEvents.Error, reject)
                resolve()
            })
        })
    }

    private setupPing() {
        this.ping = setInterval(() => {
            this.send({ type: 'ping' })
        }, WS_PING_INTERVAL)

        this.on(WSEvents.Close, () => {
            clearInterval(this.ping)
            this.ping = undefined
        })
    }

    close() {
        this.socket?.close()
    }

    private subscribe(socket: WebSocket) {
        socket.addEventListener('open', () => {
            this.emit(WSEvents.Connected)
        })

        socket.addEventListener('close', () => {
            this.emit(WSEvents.Close)
        })

        socket.addEventListener('error', (error) => {
            this.emit(WSEvents.Error, error)
        })

        socket.addEventListener('message', (message) => {
            const data = JSON.parse(message.data)
            if (['pong', 'user connected'].includes(data?.type)) {
                return
            }
            this.emit(WSEvents.Message, data)
        })
    }
}
