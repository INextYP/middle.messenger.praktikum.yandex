export const enum Routes {
    login = '/',
    register = '/sign-up',
    chatPage = '/messenger',
    profile = '/settings',
    page404 = '/page404',
    page500 = '/page500',
}

export const AuthRoutes = {
    Root: '/auth',
    User: '/user',
    SignIn: '/signin',
    SignUp: '/signup',
    Logout: '/logout',
} as const

export const UserRoutes = {
    Root: '/user',
    ChangeProfile: '/profile',
    ChangeAvatar: '/profile/avatar',
    ChangePassword: '/password',
    SearchUser: '/search',
} as const

export const ChatRoutes = {
    Root: '/chats',
} as const

export interface BaseResponse {
    id: number
}

export interface UserResponse extends BaseResponse {
    first_name: string
    second_name: string
    display_name: string
    phone: string
    login: string
    avatar: string
    email: string
}

export interface User extends Omit<UserResponse, 'display_name' | 'id'> {}

export interface RegisterBody {
    first_name: string
    second_name: string
    login: string
    email: string
    password: string
    phone: string
}

export interface UpdateUserBody
    extends Partial<Omit<UserResponse, 'avatar' | 'id'>> {}

export interface UpdatePasswordBody {
    oldPassword: string
    newPassword: string
}

export interface SearchUserBody {
    login: string
}

export interface LoginBody extends Pick<RegisterBody, 'login' | 'password'> {}

export interface Chat {
    id: number
    title: string
    avatar: string
    unread_count: number
    created_by: number
    last_message: {
        user: User
        time: string
        content: string
    }
}

export interface CreateChatDto extends Pick<Chat, 'title'> {}

export interface AddUsersToChatBody {
    users: number[]
    chatId: number
}

export interface Message {
    content: string
    time: string
    user_id: number
}
