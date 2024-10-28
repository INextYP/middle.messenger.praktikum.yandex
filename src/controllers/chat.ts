import Store, { State } from '../services/Store.ts'
import { ChatApi } from '../api/chat-api.ts'
import { AddUsersToChatBody, CreateChatDto, Message } from '../app/types'
import { MessagesApi } from '../api/messages-api.ts'

const chatApi = new ChatApi()

let messagesApi: MessagesApi | undefined

export class ChatController {
    public async getChatList() {
        const chats = await chatApi.getChatList()

        Store.set('chats', chats)
    }

    public async createChat(data: CreateChatDto) {
        await chatApi.createChat(data)

        await this.getChatList()
    }

    public async selectMessage(id: number) {
        const store = Store.getState() as State
        const chat = store['chats'].find((chat) => chat.id === id)

        const token = await chatApi.getToken(id)
        const userId = store['user']['id']

        messagesApi?.disconnect()

        messagesApi = new MessagesApi(
            userId,
            id,
            token,
            this.addNewMessages(id),
        )

        messagesApi.connect()

        Store.set('selectedMessage', chat)
        Store.set('messages', [])
    }

    sendMessage(message: string) {
        messagesApi?.addMessage(message)
    }

    public addNewMessages = (chatId: number) => (newMessages: Message[]) => {
        const store = Store.getState() as State
        const messages = store['messages']
        const chats = store['chats']

        const newMessagesArray = [...(messages || []), ...newMessages]
        const newChatsArray = [...(chats || [])]

        const chat = newChatsArray.find((chat) => chat.id == chatId)

        if (chat && newMessagesArray.length) {
            const lastMessage = newMessagesArray[newMessagesArray.length - 1]
            chat.last_message.time = lastMessage.time
            chat.last_message.content = lastMessage.content
        }

        Store.set('chats', newChatsArray)
        Store.set('messages', newMessagesArray)
    }

    public getSelectedMessage() {
        const store = Store.getState() as State
        return store['selectedMessage']
    }

    public async addUsersInChat(data: AddUsersToChatBody) {
        return chatApi.addUsersToChat(data)
    }

    public async deleteUsersInChat(data: AddUsersToChatBody) {
        return chatApi.deleteUsersToChat(data)
    }

    public async updateChatAvatar(file: File) {
        const store = Store.getState() as State
        const chat = store['selectedMessage']

        const newChatData = await chatApi.updateChatAvatar(
            file,
            String(chat.id),
        )

        Store.set('selectedMessage', { ...chat, ...newChatData })

        return this.getChatList()
    }
}
