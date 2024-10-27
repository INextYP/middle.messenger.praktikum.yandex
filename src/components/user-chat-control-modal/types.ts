import { Input } from '../input'

export interface UserChatControlModalProps {
    onClose?: () => void
    onAddUser?: (userId: string) => void
}

export interface UserChatControlModalKeys {
    add_user_input: Input
}
