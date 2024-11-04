import { Block } from '../../services/block'
import { router } from '../../services/Router'
import { validator } from '../../services/valdator'
import { AuthController } from '../../controllers/auth'
import { Routes } from '../../app/types'

import { LoginPageKeys, LoginPageProps } from './types'

import loginTemplate from './login.html?raw'

const authController = new AuthController()

export class LoginPage extends Block<LoginPageProps, LoginPageKeys> {
    constructor(props: LoginPageProps) {
        super({
            ...props,
            onValidate: {
                login: validator.checkLogin,
                password: validator.checkPassword,
            },
            onRoute: (e: Event) => {
                e.preventDefault()
                router.go(Routes.register)
            },
            events: {
                form: {
                    submit: (e: Event) => {
                        e.preventDefault()

                        const attributes = this.attributes as LoginPageKeys

                        const loginInput = attributes.login
                        const passwordInput = attributes.password

                        const isValidLoginInput = loginInput.handleValidation()
                        const isValidPasswordInput =
                            passwordInput.handleValidation()

                        if (isValidLoginInput && isValidPasswordInput) {
                            authController
                                .login({
                                    login: loginInput.getInputData(
                                        'value',
                                    ) as string,
                                    password: passwordInput.getInputData(
                                        'value',
                                    ) as string,
                                })
                                .catch((error) => {
                                    console.error(error)
                                })
                        }
                    },
                },
            },
        })
    }

    render() {
        return this.compile(loginTemplate, this.props)
    }
}
