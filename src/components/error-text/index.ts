import Block from '../../services/block'
import { ErrorTextProps } from './types'

import errorTextTemplate from './error-text.html?raw'

export class ErrorText extends Block<ErrorTextProps> {
    constructor(props: ErrorTextProps) {
        super(props)
    }

    render() {
        return this.compile(errorTextTemplate, this.props)
    }
}
