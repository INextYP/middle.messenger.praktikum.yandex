import Block from '../../services/block'
import { InputProps } from './types'

import inputTemplate from './input.html?raw'

export class Input extends Block<InputProps> {
    static name = 'Input'

    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                input: {
                    blur: props.onBlur,
                },
            },
        })
    }

    render() {
        return this.compile(inputTemplate, this.props)
    }
}
