import Block from '../../services/block'
import { ModalProps } from './types'

import modalTemplate from './modal.html?raw'

export class Modal extends Block<ModalProps> {
    constructor(props: ModalProps) {
        super(props)
    }

    render() {
        return this.compile(modalTemplate, this.props)
    }
}
