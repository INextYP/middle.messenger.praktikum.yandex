import { MessageInput } from '../mesage-input'
import { Chat } from '../../app/types'

export interface ChatWindowProps {
    selectedChat?: Chat
}

export interface ChatWindowKeys {
    new_message_input: MessageInput
}
