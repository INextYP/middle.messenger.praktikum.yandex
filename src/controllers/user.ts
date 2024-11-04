import {
    SearchUserBody,
    UpdatePasswordBody,
    UpdateUserBody,
} from '../app/types'
import Store from '../services/Store'
import { UserApi } from '../api/user-api'

const userApi = new UserApi()

export class UserController {
    public async updateUserData(data: UpdateUserBody) {
        const user = await userApi.updateUserData(data)

        Store.set('user', user)
    }

    public async updateUserAvatar(avatar: File) {
        const user = await userApi.updateUserAvatar(avatar)

        Store.set('user', user)
    }

    public async updateUserPassword(data: UpdatePasswordBody) {
        await userApi.updateUserPassword(data)
    }

    public async searchUserByLogin(data: SearchUserBody) {
        const user = await userApi.searchUserByLogin(data)

        Store.set('chatUsers', user)
    }
}
