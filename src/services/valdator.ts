export type InputType =
    | 'login'
    | 'password'
    | 'first_name'
    | 'second_name'
    | 'phone'
    | 'email'
    | 'message'
export type ValidationReturnType = [boolean, string | null]

class Validator {
    checkLogin(value: string): ValidationReturnType {
        if (value.length < 3 || value.length > 20) {
            return [false, 'Логин должен быть от 3 до 20 символов']
        }

        const loginRegex = /^[A-Za-z][A-Za-z0-9_-]*$/
        if (!loginRegex.test(value)) {
            return [
                false,
                'Логин должен содержать латиницу, цифры, дефис, нижнее подчёркивание',
            ]
        }

        if (/^\d+$/.test(value)) {
            return [false, 'Логин не должен состоять только из цифр']
        }

        return [true, null]
    }

    checkPassword(value: string): ValidationReturnType {
        console.log(value)

        if (value.length < 8 || value.length > 40) {
            return [false, 'Пароль должен быть от 8 до 40 символов']
        }

        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)/
        if (!passwordRegex.test(value)) {
            return [false, 'Обязательно хотя бы одна заглавная буква и цифра']
        }

        return [true, null]
    }

    checkName(value: string): ValidationReturnType {
        if (value === '') {
            return [false, 'Не может быть пустым']
        }

        if (value[0] !== value[0].toUpperCase()) {
            return [false, 'Имя должно начинаться с заглавной буквы']
        }

        const nameRegex = /^[A-ZА-ЯЁ][a-zA-Zа-яёА-ЯЁ-]*$/

        if (!nameRegex.test(value)) {
            return [false, 'Пробелы, цифры и спецсимволы запрещены']
        }

        return [true, null]
    }

    checkEmail(value: string): ValidationReturnType {
        if (value === '') {
            return [false, 'Email не может быть пустым']
        }

        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!emailRegex.test(value)) {
            return [false, 'Неправильный формат email']
        }

        return [true, null]
    }

    checkPhone(value: string): ValidationReturnType {
        if (value === '') {
            return [false, 'Телефон не может быть пустым']
        }

        const phoneRegex = /^\+?\d{10,15}$/

        if (!phoneRegex.test(value)) {
            return [false, 'Неправильный формат телефона']
        }

        return [true, null]
    }

    checkMessage(value: string): ValidationReturnType {
        const messageRegex = /.+/

        if (!messageRegex.test(value)) {
            return [false, 'Сообщение не может быть пустым']
        }

        return [true, null]
    }

    public validate(
        type: InputType,
        value: string,
    ): ValidationReturnType | undefined {
        if (type === 'login') {
            return this.checkLogin(value)
        }

        if (type === 'password') {
            return this.checkPassword(value)
        }

        if (type === 'first_name' || type === 'second_name') {
            return this.checkName(value)
        }

        if (type === 'email') {
            return this.checkEmail(value)
        }

        if (type === 'phone') {
            return this.checkPhone(value)
        }

        if (type === 'message') {
            return this.checkMessage(value)
        }
    }
}

export const validator = new Validator()
