import Block, { AttributesType } from '../../services/block'
import {
    InputType,
    ValidationReturnType,
    validator,
} from '../../services/valdator'
import { ChatPageKeys, ChatPageProps } from './types'

import chatPageTemplate from './chat-page.html?raw'

export class ChatPage extends Block<ChatPageProps, ChatPageKeys> {
    constructor(props: ChatPageProps) {
        super({
            ...props,
            onBlur: (e: Event) => {
                const { id, value } = e.currentTarget as HTMLInputElement

                const key = id as keyof ChatPageKeys
                const currentAttribute = this.attributes?.[
                    key
                ] as AttributesType

                const [isValid, message] = validator.validate(
                    id as InputType,
                    value,
                ) as ValidationReturnType

                if (!isValid) {
                    currentAttribute.attributes.errorText.setProps({
                        errorText: message,
                    })

                    return false
                }

                currentAttribute.attributes.errorText.setProps({
                    errorText: undefined,
                })

                return true
            },
        })
    }

    render() {
        return this.compile(chatPageTemplate, this.props)
    }
}
