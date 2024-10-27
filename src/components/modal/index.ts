import Block from '../../services/block'
import { ModalKeys, ModalProps } from './types'
import modalTemplate from './modal.html?raw'

export class Modal extends Block<ModalProps, ModalKeys> {
    static name = 'Modal'

    constructor(props: ModalProps) {
        super({
            ...props,
            events: {
                form: {
                    submit: (e: Event) => this.handleSubmit(e),
                },
            },
        })
    }

    handleSubmit(e: Event) {
        e.preventDefault()
        const attributes = this.attributes as ModalKeys

        const newAvatar = attributes.file_input.files?.[0] as File

        attributes.errorText.setProps({
            errorText: undefined,
        })

        if (!newAvatar) {
            attributes.errorText.setProps({
                errorText: 'Выберите файл',
            })
        }

        const callback = this.props.onSubmit as ModalProps['onSubmit']

        callback?.(newAvatar)
    }

    render() {
        return this.compile(modalTemplate, this.props)
    }
}
