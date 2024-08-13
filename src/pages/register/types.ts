import { Button, Input } from '../../components'

export interface RegisterPageProps {}

export interface RegisterPageKeys {
    form: HTMLFormElement
    first_name: Input
    second_name: Input
    login: Input
    phone: Input
    password: Input
    password_check: Input
    registerButton: Button
}
