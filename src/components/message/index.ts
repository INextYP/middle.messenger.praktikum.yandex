import Block from '../../services/block'
import { MessageProps } from './types'
import { ChatController } from '../../controllers/chat'

import messageTemplate from './message.html?raw'

const chatController = new ChatController()

export class Message extends Block<MessageProps> {
    static name = 'Message'

    constructor(props: MessageProps) {
        super({
            ...props,
            events: {
                chat: {
                    click: (e: Event) => {
                        e.preventDefault()
                        chatController
                            .selectMessage(props.id as number)
                            .catch((err: Error) => {
                                console.error(err)
                            })
                    },
                },
            },
            mainMessage: () =>
                chatController.getSelectedMessage()?.id === props.id,
        })
    }

    render() {
        console.log(this.props)
        return this.compile(messageTemplate, this.props)
    }
}
