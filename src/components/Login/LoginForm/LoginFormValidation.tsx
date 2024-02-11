import * as Yup from 'yup';

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .min(3, 'Must be longer than 3 characters')
        .max(30, 'Too Long')
        .required('Required'),
    password: Yup.string()
        .min(8, 'Must be longer than 8 characters')
        .max(30, 'Too Long')
        .required('Required'),
});

export default LoginSchema;