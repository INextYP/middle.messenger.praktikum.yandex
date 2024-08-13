import { Button, Input } from '../../components'

export interface EditPasswordPageProps {}

export interface EditPasswordPageKeys {
    form: HTMLFormElement
    old_password: Input
    new_password: Input
    check_new_password: Input
    submitButton: Button
}
