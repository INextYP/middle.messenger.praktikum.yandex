import { Api } from '../services/Api'
import {
    AddUsersToChatBody,
    Chat,
    ChatRoutes,
    CreateChatDto,
} from '../app/types'

export class ChatApi extends Api {
    constructor() {
        super(ChatRoutes.Root)
    }

    async getChatList() {
        return this.getInstance().get<Chat[]>('/')
    }

    async createChat(data: CreateChatDto) {
        return this.getInstance().post<Pick<Chat, 'id'>>('/', { data })
    }

    async addUsersToChat(data: AddUsersToChatBody) {
        return this.getInstance().put<string>('/users', { data })
    }

    async updateChatAvatar(avatar: File, chatId: string) {
        const data = new FormData()
        data.append('chatId', chatId)
        data.append('avatar', avatar)

        return this.getInstance().put<
            Pick<Chat, 'avatar' | 'id' | 'title' | 'created_by'>
        >('/avatar', { data })
    }

    async deleteUsersToChat(data: AddUsersToChatBody) {
        return this.getInstance().delete('/users', { data })
    }

    async getToken(chatId: number) {
        const { token } = await this.getInstance().post<{ token: string }>(
            `/token/${chatId}`,
        )

        return token
    }
}
