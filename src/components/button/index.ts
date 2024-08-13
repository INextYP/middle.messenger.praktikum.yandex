import { ButtonProps } from './types'

import buttonTemplate from './button.html?raw'
import Block from '../../services/block'

export class Button extends Block<ButtonProps> {
    constructor(props: ButtonProps) {
        super({
            ...props,
            events: {
                button: {
                    click: props.onClick,
                },
            },
        })
    }

    render() {
        return this.compile(buttonTemplate, this.props)
    }
}
