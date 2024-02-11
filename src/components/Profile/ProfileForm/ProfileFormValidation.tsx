import * as Yup from 'yup';

const ProfileSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(3, 'Must be longer than 3 characters')
        .max(30, 'Too Long')
        .required('Required'),
    aboutMe: Yup.string()
        .max(500, 'Too Long')
        .min(3, 'Must be longer than 3 characters')
        .required('Required'),
});

export default ProfileSchema;