import { Block } from '../../services/block'
import { Routes } from '../../app/types'
import { Button } from '../../components'
import {
    validator,
    InputType,
    ValidationReturnType,
} from '../../services/valdator'

import { LoginPageKeys, LoginPageProps } from './types'

import loginTemplate from './login.html?raw'

export class LoginPage extends Block<LoginPageProps, LoginPageKeys> {
    constructor(props: LoginPageProps) {
        super({
            ...props,
            onBlur: (e: Event) => {
                const { id, value } = e.currentTarget as HTMLInputElement

                const [isValid, message] = validator.validate(
                    id as InputType,
                    value,
                ) as ValidationReturnType

                if (!isValid) {
                    ;(
                        this.attributes?.[id as keyof LoginPageKeys] as Record<
                            string,
                            Record<string, Block<unknown>>
                        >
                    ).attributes.errorText.setProps({
                        errorText: message,
                    })

                    return false
                }

                ;(
                    this.attributes?.[id as keyof LoginPageKeys] as Record<
                        string,
                        Record<string, Block<unknown>>
                    >
                ).attributes.errorText.setProps({
                    errorText: undefined,
                })

                return true
            },
            events: {
                form: {
                    submit: (e: Event) => {
                        e.preventDefault()

                        const { id: loginInputId, value: loginInputValue } =
                            this.getInputValue('login')
                        const {
                            id: passwordInputId,
                            value: passwordInputValue,
                        } = this.getInputValue('password')

                        const [isValidLoginInput, loginInputErrorMessage] =
                            validator.validate(
                                loginInputId as InputType,
                                loginInputValue,
                            ) as ValidationReturnType

                        const [
                            isValidPasswordInput,
                            passwordInputErrorMessage,
                        ] = validator.validate(
                            passwordInputId as InputType,
                            passwordInputValue,
                        ) as ValidationReturnType

                        if (!isValidLoginInput) {
                            ;(
                                this.attributes[
                                    loginInputId as keyof LoginPageKeys
                                ] as Record<
                                    string,
                                    Record<string, Block<unknown>>
                                >
                            ).attributes.errorText.setProps({
                                errorText: loginInputErrorMessage,
                            })
                        }

                        if (!isValidPasswordInput) {
                            ;(
                                this.attributes[
                                    passwordInputId as keyof LoginPageKeys
                                ] as Record<
                                    string,
                                    Record<string, Block<unknown>>
                                >
                            ).attributes.errorText.setProps({
                                errorText: passwordInputErrorMessage,
                            })
                        }

                        if (isValidLoginInput && isValidPasswordInput) {
                            ;(this.attributes.loginButton as Button).setProps({
                                to: Routes.chatPage,
                            })
                        }

                        console.log(
                            'submitData',
                            loginInputValue,
                            passwordInputValue,
                        )
                    },
                },
            },
        })
    }

    getInputValue(key: 'login' | 'password'): HTMLInputElement {
        return (
            this.attributes[key] as Record<
                string,
                Record<string, Block<unknown>>
            >
        ).attributes.input as unknown as HTMLInputElement
    }

    render() {
        return this.compile(loginTemplate, this.props)
    }
}
