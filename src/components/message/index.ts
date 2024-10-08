import Block from '../../services/block'
import { MessageProps } from './types'

import messageTemplate from './message.html?raw'

export class Message extends Block<MessageProps> {
    static name = 'Message'

    constructor(props: MessageProps) {
        super(props)
    }

    render() {
        return this.compile(messageTemplate, this.props)
    }
}
