import Block from '../../services/block'
import { ButtonProps } from './types'

import { template } from './button.hbs.ts'

export class Button extends Block<ButtonProps> {
    static name = 'Button'

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
        return this.compile(template, this.props)
    }
}
