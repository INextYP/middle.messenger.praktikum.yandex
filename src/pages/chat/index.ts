import Block from '../../services/block'
import { router } from '../../services/Router'
import { CreateChatDto, Routes } from '../../app/types'
import { ChatController } from '../../controllers/chat'
import { AuthController } from '../../controllers/auth'

import { ChatPageKeys, ChatPageProps } from './types'

import chatPageTemplate from './chat-page.html?raw'

const chatController = new ChatController()
const authController = new AuthController()

export class ChatPage extends Block<ChatPageProps, ChatPageKeys> {
    constructor(props: ChatPageProps) {
        super({
            ...props,
            onAddChat: (e: Event) => {
                e.preventDefault()
                this.setProps({
                    isOpenAddChatModal: true,
                })
            },
            onCloseAddChatModal: () => {
                this.setProps({
                    isOpenAddChatModal: false,
                })
            },
            onSubmitChat: (data: CreateChatDto) => {
                chatController
                    .createChat(data)
                    .catch((err: Error) => {
                        console.error(err)
                    })
                    .finally(() => {
                        this.setProps({
                            isOpenAddChatModal: false,
                        })
                    })
            },
            onRoute: (e: Event) => {
                e.preventDefault()
                router.go(Routes.profile)
            },
        })
    }

    render() {
        return this.compile(chatPageTemplate, this.props)
    }

    componentDidMount() {
        Promise.all([
            authController.getUserData(),
            chatController.getChatList(),
        ]).catch((err: Error) => {
            console.error(err)
        })
    }
}
