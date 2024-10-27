import Block from '../../services/block'
import { validator } from '../../services/valdator'
import { ChatController } from '../../controllers/chat'

import { ChatWindowKeys, ChatWindowProps } from './types'

import chatWindowTemplate from './chat-window.html?raw'
import { Chat } from '../../app/types'

const chatController = new ChatController()

export class ChatWindow extends Block<ChatWindowProps, ChatWindowKeys> {
    static name = 'ChatWindow'

    constructor(props: ChatWindowProps) {
        super({
            ...props,
            onOpenUserChatControlModal: (e: Event) => {
                e.preventDefault()

                this.setProps({
                    isOpenUserChatControlModal: true,
                })
            },
            onCloseUserChatControlModal: () => {
                this.setProps({
                    isOpenUserChatControlModal: false,
                })
            },
            onOpenDeleteChatModal: (e: Event) => {
                e.preventDefault()

                this.setProps({
                    isOpenDeleteChatModal: true,
                })
            },
            onCloseDeleteChatModal: () => {
                this.setProps({
                    isOpenDeleteChatModal: false,
                })
            },
            onAddUser: (userId: number) => {
                chatController
                    .addUsersInChat({
                        chatId: (this.props.selectedChat as Chat).id,
                        users: [userId],
                    })
                    .catch((err) => console.error(err))
                    .finally(() => {
                        this.setProps({
                            isOpenUserChatControlModal: false,
                        })
                    })
            },
            onDeleteUser: (userId: number) => {
                chatController
                    .deleteUsersInChat({
                        chatId: (this.props.selectedChat as Chat).id,
                        users: [userId],
                    })
                    .catch((err) => console.error(err))
                    .finally(() => {
                        this.setProps({
                            isOpenDeleteChatModal: false,
                        })
                    })
            },
            selectedChat: chatController.getSelectedMessage(),
            onValidate: {
                message: validator.checkMessage,
            },
            events: {
                sendButton: {
                    click: (e: Event) => {
                        e.preventDefault()

                        const { new_message_input } = this
                            .attributes as ChatWindowKeys

                        const isValid = new_message_input.handleValidation()

                        if (isValid) {
                            const inputValue = new_message_input.getInputData(
                                'value',
                            ) as string

                            chatController.sendMessage(inputValue)
                        }
                    },
                },
            },
        })
    }

    render() {
        return this.compile(chatWindowTemplate, this.props)
    }
}
