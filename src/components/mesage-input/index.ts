import Block from '../../services/block'
import { MessageInputProps } from './types'

import messageInputTemplate from './message-input.html?raw'

export class MessageInput extends Block<MessageInputProps> {
    constructor(props: MessageInputProps) {
        super({
            ...props,
            events: {
                messageInput: {
                    blur: props.onBlur,
                },
            },
        })
    }

    render() {
        return this.compile(messageInputTemplate, this.props)
    }
}
