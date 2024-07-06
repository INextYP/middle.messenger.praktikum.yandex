import { Routes } from '../types'

export const BASE_URL = 'http://localhost:3000/'

export const pageContext: Record<`${Routes}`, NonNullable<unknown>> = {
    [Routes.login]: {
        href: Routes.register,
        to: Routes.chatPage,
    },
    [Routes.register]: {
        href: Routes.login,
        to: Routes.chatPage,
    },
    [Routes.chatPage]: {
        href: Routes.profile,
    },
    [Routes.profile]: {
        to: Routes.chatPage,
    },
    [Routes.editProfile]: {
        to: Routes.chatPage,
    },
    [Routes.editPassword]: {
        to: Routes.chatPage,
    },
    [Routes.page404]: {
        to: Routes.chatPage,
    },
    [Routes.page500]: {
        to: Routes.chatPage,
    },
} as const

export const pageConfig: Record<`${Routes}`, string> = {
    [Routes.login]: '',
    [Routes.register]: '',
    [Routes.chatPage]: '',
    [Routes.profile]: '',
    [Routes.editProfile]: '',
    [Routes.editPassword]: '',
    [Routes.page404]: '',
    [Routes.page500]: '',
}

export const appContainer = document.querySelector<HTMLDivElement>(
    '#app',
) as HTMLDivElement
