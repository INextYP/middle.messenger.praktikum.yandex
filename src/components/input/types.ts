import { ErrorText } from '../error-text'
import { ValidationReturnType } from '../../services/valdator'

export interface InputProps {
    onBlur?: () => void
    onValidate?: (value: string) => ValidationReturnType
}

export interface InputKeys {
    input: HTMLInputElement
    errorText: ErrorText
}
