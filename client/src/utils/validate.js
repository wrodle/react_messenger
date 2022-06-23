const validate = ({isAuth, values, errors}) => {

    const rules = {
        email: (value) => {
            if (!value) {
                errors.email = 'Введите E-Mail';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
                errors.email = 'Неверный E-Mail';
            }
        },

        fullname: (value) => {
            if (!value) {
                errors.fullname = 'Введите Ваше имя';
            }
        },

        password: (value) => {
            if (!value) {
                errors.password = 'Введите пароль';
            } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(value)) {
                if (!isAuth) {
                    errors.password = 'Нужны цифры, буквы нижнего и верхнего регистра.';
                }
            }
        },

        password_repeat: (value) => {
            if (!value) {
                errors.password_repeat = 'повторите пароль';
            }
            if (value !== values.password) {
                errors.password_repeat = 'Пароли не совпадают';
            }
        }
    }

    Object.keys(values).forEach(
        key => rules[key] && rules[key](values[key])
    );

}

export default validate;