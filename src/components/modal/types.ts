import { ErrorText } from '../error-text'

export interface ModalProps {
    onSubmit?: (avatar: File) => void
}

export interface ModalKeys {
    errorText: ErrorText
    file_input: HTMLInputElement
}
