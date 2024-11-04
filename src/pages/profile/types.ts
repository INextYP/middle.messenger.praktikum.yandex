import { Input } from '../../components'

export interface ProfilePageProps {
    isEdit?: boolean
    isEditPassword?: boolean
}

export interface ProfilePageKeys {
    form: HTMLFormElement
    first_name: Input
    second_name: Input
    login: Input
    phone: Input
    email: Input
    display_name: Input
    old_password: Input
    new_password: Input
    check_new_password: Input
}
