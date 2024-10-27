import Block from '../../services/block'
import { InputKeys, InputProps } from './types'

import inputTemplate from './input.html?raw'

export class Input extends Block<InputProps, InputKeys> {
    static name = 'Input'

    constructor(props: InputProps) {
        super({
            ...props,
            events: {
                input: {
                    blur: () => this.handleValidation(),
                },
            },
        })
    }

    getInputData(key?: keyof HTMLInputElement) {
        const input = this.attributes.input as InputKeys['input']

        return key ? input[key] : input
    }

    handleValidation() {
        const { value } = this.getInputData() as InputKeys['input']

        const [isValid, message] = (this.props as InputProps).onValidate!(value)
        const attributes = this.attributes as InputKeys

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
        return this.compile(inputTemplate, this.props)
    }
}
