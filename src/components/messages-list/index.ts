import Block from '../../services/block'
import { MessageListProps } from './types'

import messagesListTemplate from './messages-list.html?raw'

export class MessagesList extends Block<MessageListProps> {
    static name = 'MessagesList'

    constructor(props: MessageListProps) {
        super({
            ...props,
            messages: props.messages,
        })
    }

    render() {
        return this.compile(messagesListTemplate, this.props)
    }
}
