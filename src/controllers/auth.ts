import { AuthApi } from '../api/auth-api.ts'
import { router } from '../services/Router'
import { LoginBody, RegisterBody, Routes } from '../app/types'
import Store from '../services/Store'

const authApi = new AuthApi()

export class AuthController {
    public async login(data: LoginBody) {
        await authApi.signIn(data)

        const user = await authApi.getUserProfile()

        Store.set('user', user)

        router.go(Routes.chatPage)
    }

    public async register(data: RegisterBody) {
        const user = await authApi.signUp(data)

        Store.set('user', user)

        router.go(Routes.chatPage)
    }

    public async logout() {
        await authApi.logout()

        Store.set('user', null)

        router.go(Routes.login)
    }
}
