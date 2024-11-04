import { Api } from '../services/Api'
import {
    AuthRoutes,
    BaseResponse,
    LoginBody,
    RegisterBody,
    UserResponse,
} from '../app/types'

export class AuthApi extends Api {
    constructor() {
        super(AuthRoutes.Root)
    }

    async getUserProfile() {
        return this.getInstance().get<UserResponse>(AuthRoutes.User)
    }

    async signIn(data: LoginBody) {
        return this.getInstance().post<string>(AuthRoutes.SignIn, {
            data,
        })
    }

    async signUp(data: RegisterBody) {
        return this.getInstance().post<BaseResponse>(AuthRoutes.SignUp, {
            data,
        })
    }

    async logout() {
        return this.getInstance().post<string>(AuthRoutes.Logout)
    }
}
