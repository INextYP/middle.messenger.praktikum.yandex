import Block from '../../services/block'
import { ChatMessageProps } from './types'

import { template } from './chat-message.hbs.ts'

export class ChatMessage extends Block<ChatMessageProps> {
    static name = 'ChatMessage'

    constructor(props: ChatMessageProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
