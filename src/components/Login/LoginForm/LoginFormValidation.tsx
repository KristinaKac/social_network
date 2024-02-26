import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Должно быть не менее 8 символов')
        .max(30, 'Не более 30 символов')
        .required('Поле должно быть заполнено'),
    password: Yup.string()
        .min(8, 'Должно быть не менее 8 символов')
        .max(30, 'Не более 30 символов')
        .required('Поле должно быть заполнено'),
});

export default LoginSchema;