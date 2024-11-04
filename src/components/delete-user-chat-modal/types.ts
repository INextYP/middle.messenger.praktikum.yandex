import { Input } from '../input'

export interface DeleteUserChatModalProps {
    onClose?: () => void
    onDeleteUser?: (userId: string) => void
}

export interface DeleteUserChatModalKeys {
    delete_user_input: Input
}
