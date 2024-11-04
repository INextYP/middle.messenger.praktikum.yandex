import { Input } from '../input'
import { CreateChatDto } from '../../app/types'

export interface AddChatModalProps {
    onSubmit?: (data: CreateChatDto) => void
    onClose?: () => void
}

export interface AddChatModalKeys {
    close_button: HTMLButtonElement
    input: Input
}
