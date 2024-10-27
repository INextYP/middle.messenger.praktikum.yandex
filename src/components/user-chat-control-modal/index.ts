import Block from '../../services/block'
import { UserChatControlModalProps, UserChatControlModalKeys } from './types'

import userChatControlModalTemplate from './user-chat-control-modal.html?raw'

export class UserChatControlModal extends Block<
    UserChatControlModalProps,
    UserChatControlModalKeys
> {
    static name = 'UserChatControlModal'

    constructor(props: UserChatControlModalProps) {
        super({
            ...props,
            events: {
                close_button: {
                    click: (e: Event) => {
                        e.preventDefault()

                        const callback = this.props
                            .onClose as UserChatControlModalProps['onClose']

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
        const { add_user_input } = this.attributes as UserChatControlModalKeys

        const userId = add_user_input.getInputData('value') as string

        const callback = this.props
            .onAddUser as UserChatControlModalProps['onAddUser']

        callback?.(userId)
    }

    render() {
        return this.compile(userChatControlModalTemplate, this.props)
    }
}
