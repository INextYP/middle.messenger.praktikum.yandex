import { EventBus } from './event-bus'
import { Chat, Message, UserResponse } from '../app/types'

export const StoreEvents = {
    Updated: 'updated',
} as const

export enum StatePath {
    User = 'user',
    Chats = 'chats',
    SelectedMessage = 'selectedMessage',
    Messages = 'messages',
    ChatUsers = 'chatUsers',
}

export interface State {
    user: UserResponse
    chats: Chat[]
    selectedMessage: Chat
    messages: Message[]
    chatUsers: UserResponse
}

class Store extends EventBus {
    private state: State | Record<string, unknown> = {}

    public getState() {
        return this.state
    }

    public set(path: `${StatePath}`, value: unknown) {
        this.state[path] = value

        this.emit(StoreEvents.Updated)
    }
}

export default new Store()
