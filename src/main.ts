import { Routes } from './app/types'
import { router } from './services/Router'
import { ChatPage, LoginPage, ProfilePage, RegisterPage } from './pages'
import { buildTemplates, registerPartials, registerHelpers } from './helpers'
import './style.scss'
import { connect } from './services/connect'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const withUser = connect((state) => ({ user: state.user }))
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const withChats = connect((state) => ({
    chats: state.chats,
    messages: state.messages,
    selectedMessage: state.selectedMessage,
}))

document.addEventListener('DOMContentLoaded', () => {
    buildTemplates()

    registerPartials()

    registerHelpers()

    router
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .use(Routes.login, withUser(LoginPage))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .use(Routes.register, RegisterPage)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .use(Routes.chatPage, withChats(ChatPage))
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        .use(Routes.profile, withUser(ProfilePage))

    router.start()
})
