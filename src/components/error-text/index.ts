import Block from '../../services/block'
import { ErrorTextProps } from './types'

import { template } from './error-text.hbs.ts'

export class ErrorText extends Block<ErrorTextProps> {
    static name = 'ErrorText'

    constructor(props: ErrorTextProps) {
        super(props)
    }

    render() {
        return this.compile(template, this.props)
    }
}
