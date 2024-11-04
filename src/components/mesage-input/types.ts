import { ErrorText } from '../error-text'
import { ValidationReturnType } from '../../services/valdator'

export interface MessageInputProps {
    onBlur?: () => void
    onValidate?: (value: string) => ValidationReturnType
}

export interface MessageInputKeys {
    messageInput: HTMLInputElement
    errorText: ErrorText
}
