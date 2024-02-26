import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from './ProfileForm.module.css'

import ProfileSchema from './ProfileFormValidation';
import { AppDispatch } from '../../../state/redux';
import { useDispatch } from 'react-redux';
import { setProfileSettingsThunk } from '../../../state/profileReducer';

type PropsType = {
    currentUser: ProfileUserType,
}

const ProfileForm: FC<PropsType> = ({ currentUser }) => {
    const dispatch: AppDispatch = useDispatch();

    return (
        <div className={css.profile_form}>
            <h2 className={css.profile_form_header}>Редактирование профиля</h2>
            <Formik
                initialValues={{
                    fullName: currentUser.fullName, aboutMe: currentUser.aboutMe,
                    lookingForAJob: currentUser.lookingForAJob, lookingForAJobDescription: currentUser.lookingForAJobDescription
                }}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                    const profile: ProfileUserType = {
                        userId: currentUser.userId,
                        fullName: values.fullName,
                        aboutMe: values.aboutMe,
                        lookingForAJob: values.lookingForAJob,
                        lookingForAJobDescription: values.lookingForAJobDescription
                    }
                    dispatch(setProfileSettingsThunk(profile, setStatus));
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, status }) => (
                    <Form className={css.form}>
                        <div className={css.form_control}>
                            <label className={css.form_label} htmlFor="fullName">Изменить имя: </label>
                            <Field className={css.form_input} type='text' name='fullName' />
                        </div>
                        <ErrorMessage name="fullName" component="div" />
                        <div className={css.form_control}>
                            <label className={css.form_label} htmlFor="aboutMe">Краткая информация: </label>
                            <Field className={css.form_input} type='text' name='aboutMe' />
                        </div>
                        <ErrorMessage name="aboutMe" component="div" />

                        <div className={css.form_control}>
                            <label className={css.form_label} htmlFor="lookingForAJob">Поиск работы: </label>
                            <Field type='checkbox' name='lookingForAJob' />
                        </div>
                        <ErrorMessage name="lookingForAJob" component="div" />

                        <div className={css.form_control}>
                            <label className={css.form_label} htmlFor="lookingForAJobDescription">Информация о поиске работы: </label>
                            <Field className={css.form_input} type='text' name='lookingForAJobDescription' />
                        </div>
                        <ErrorMessage name="lookingForAJobDescription" component="div" />

                        {status && status.message && <div className={css.messageError}>{status.message}</div>}

                        <button className={css.form_submit} type="submit" disabled={isSubmitting}>
                            Сохранить
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileForm;