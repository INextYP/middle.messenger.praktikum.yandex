import { Routes } from '../types'
import {
    ChatPage,
    EditPasswordPage,
    EditProfilePage,
    LoginPage,
    Page404,
    Page500,
    ProfilePage,
    RegisterPage,
} from '../../pages'

export const BASE_URL = 'http://localhost:3000/'

export const pageConfig = {
    [Routes.login]: LoginPage,
    [Routes.register]: RegisterPage,
    [Routes.chatPage]: ChatPage,
    [Routes.profile]: ProfilePage,
    [Routes.editProfile]: EditProfilePage,
    [Routes.editPassword]: EditPasswordPage,
    [Routes.page404]: Page404,
    [Routes.page500]: Page500,
}

export const appContainer = document.querySelector<HTMLDivElement>(
    '#app',
) as HTMLDivElement
