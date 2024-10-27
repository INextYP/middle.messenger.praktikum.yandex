import { validator } from '../../services/valdator'
import Block from '../../services/block'
import { AddChatModalKeys, AddChatModalProps } from './types'

import addChatModalTemplate from './add-chat-modal.html?raw'

export class AddChatModal extends Block<AddChatModalProps, AddChatModalKeys> {
    static name = 'AddChatModal'

    constructor(props: AddChatModalProps) {
        super({
            ...props,
            onValidate: {
                first_name: validator.checkName,
            },
            events: {
                close_button: {
                    click: (e: Event) => {
                        e.preventDefault()

                        const callback = this.props
                            .onClose as AddChatModalProps['onClose']

                        callback?.()
                    },
                },
                form: {
                    submit: (e: Event) => this.handleSubmit(e),
                },
            },
        })
    }

    handleSubmit(e: Event) {
        e.preventDefault()
        const { input } = this.attributes as AddChatModalKeys

        const isValid = input.handleValidation()

        if (isValid) {
            const value = input.getInputData('value') as string

            const callback = this.props
                .onSubmit as AddChatModalProps['onSubmit']

            callback?.({ title: value })
        }
    }

    render() {
        return this.compile(addChatModalTemplate, this.props)
    }
}
