import Block from '../../services/block'
import { MessageInputProps, MessageInputKeys } from './types'

import { template } from './message-input.hbs.ts'

export class MessageInput extends Block<MessageInputProps, MessageInputKeys> {
    static name = 'MessageInput'

    constructor(props: MessageInputProps) {
        super({
            ...props,
            events: {
                messageInput: {
                    blur: () => this.handleValidation(),
                },
            },
        })
    }

    getInputData(key?: keyof HTMLInputElement) {
        const input = this.attributes
            .messageInput as MessageInputKeys['messageInput']

        return key ? input[key] : input
    }

    handleValidation() {
        const { value } =
            this.getInputData() as MessageInputKeys['messageInput']

        const validationCallback = this.props
            ?.onValidate as MessageInputProps['onValidate']

        const [isValid, message] = validationCallback!(value)
        const attributes = this.attributes as MessageInputKeys

        if (!isValid) {
            attributes.errorText.setProps({
                errorText: message,
            })
            return false
        }

        attributes.errorText.setProps({
            errorText: undefined,
        })
        return true
    }

    render() {
        return this.compile(template, this.props)
    }
}
