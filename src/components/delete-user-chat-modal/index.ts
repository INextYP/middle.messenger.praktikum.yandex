import Block from '../../services/block'
import { DeleteUserChatModalKeys, DeleteUserChatModalProps } from './types'

import { template } from './delete-user-chat-modal.hbs.ts'

export class DeleteUserChatModal extends Block<
    DeleteUserChatModalProps,
    DeleteUserChatModalKeys
> {
    static name = 'DeleteUserChatModal'

    constructor(props: DeleteUserChatModalProps) {
        super({
            ...props,
            events: {
                close_button: {
                    click: (e: Event) => {
                        e.preventDefault()

                        const callback = this.props
                            .onClose as DeleteUserChatModalProps['onClose']

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
        const { delete_user_input } = this.attributes as DeleteUserChatModalKeys

        const userId = delete_user_input.getInputData('value') as string

        const callback = this.props
            .onDeleteUser as DeleteUserChatModalProps['onDeleteUser']

        callback?.(userId)
    }

    render() {
        return this.compile(template, this.props)
    }
}
