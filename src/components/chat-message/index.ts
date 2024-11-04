import Block from '../../services/block'
import { ChatMessageProps } from './types'

import chatMessageTemplate from './chat-message.html?raw'

export class ChatMessage extends Block<ChatMessageProps> {
    static name = 'ChatMessage'

    constructor(props: ChatMessageProps) {
        super(props)
    }

    render() {
        return this.compile(chatMessageTemplate, this.props)
    }
}
