import { Api } from '../services/Api.ts'
import {
    SearchUserBody,
    UpdatePasswordBody,
    UpdateUserBody,
    UserResponse,
    UserRoutes,
} from '../app/types'

export class UserApi extends Api {
    constructor() {
        super(UserRoutes.Root)
    }

    async updateUserData(data: UpdateUserBody) {
        return this.getInstance().put<UserResponse>(UserRoutes.ChangeProfile, {
            data,
        })
    }

    async updateUserAvatar(avatar: File) {
        const data = new FormData()
        data.append('avatar', avatar)

        return this.getInstance().put<UserResponse>(UserRoutes.ChangeAvatar, {
            data,
        })
    }

    async updateUserPassword(data: UpdatePasswordBody) {
        return this.getInstance().put<string>(UserRoutes.ChangePassword, {
            data,
        })
    }

    async searchUserByLogin(data: SearchUserBody) {
        return this.getInstance().post<UserResponse>(UserRoutes.SearchUser, {
            data,
        })
    }
}
