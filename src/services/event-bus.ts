type EventType = Record<string, unknown[]>
type CallbackType<T extends unknown[]> = (...args: T) => void
type ListenerType<Events extends EventType> = {
    [Key in keyof Events]?: CallbackType<Events[Key]>[]
}

interface IEventBus<Events extends EventType> {
    on<Event extends keyof Events>(
        event: Event,
        callback: CallbackType<Events[Event]>,
    ): void
    off<Event extends keyof Events>(
        event: Event,
        callback: CallbackType<Events[Event]>,
    ): void
    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]): void
}

export class EventBus<Events extends EventType = EventType>
    implements IEventBus<Events>
{
    listeners: ListenerType<Events>

    constructor() {
        this.listeners = {} as ListenerType<Events>
    }

    on<Event extends keyof Events>(
        event: Event,
        callback: CallbackType<Events[Event]>,
    ) {
        if (!this.listeners[event]) {
            this.listeners[event] = []
        }

        this.listeners[event].push(callback)
    }

    off<Event extends keyof Events>(
        event: Event,
        callback: CallbackType<Events[Event]>,
    ) {
        this._checkEvent(event)

        this.listeners[event] = this.listeners[event]?.filter(
            (listener) => listener !== callback,
        )
    }

    emit<Event extends keyof Events>(event: Event, ...args: Events[Event]) {
        this._checkEvent(event)

        this.listeners[event]?.forEach((listener) => {
            listener(...args)
        })
    }

    private _checkEvent<Event extends keyof Events>(event: Event) {
        if (!this.listeners[event]) {
            throw new Error(`Нет события: ${event as string}`)
        }
    }
}
