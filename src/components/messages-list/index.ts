import Block from '../../services/block'
import { MessageListProps } from './types'

import { template } from './messages-list.hbs.ts'

export class MessagesList extends Block<MessageListProps> {
    static name = 'MessagesList'

    constructor(props: MessageListProps) {
        super({
            ...props,
            messages: props.messages,
        })
    }

    render() {
        return this.compile(template, this.props)
    }
}
