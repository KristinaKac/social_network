import React, { FC } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from '../Profile.module.css'

import ProfileSchema from './ProfileFormValidation';

type PropsType = {
    currentUser: ProfileUserType,
    saveChangesProfile: (
        profile: ProfileUserType,
        setStatus: any,
    ) => void
}

const ProfileForm: FC<PropsType> = ({ currentUser, saveChangesProfile }) => {
    return (
        <div className={css.profile}>

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
                    saveChangesProfile(profile, setStatus);
                    setSubmitting(false);
                }}
            >
                {({ isSubmitting, status }) => (
                    <Form>
                        <div>
                            <label htmlFor="fullName">Name</label>
                            <Field type='text' name='fullName' />
                        </div>
                        <ErrorMessage name="fullName" component="div" />
                        <div>
                            <label htmlFor="aboutMe">About Me</label>
                            <Field type='text' name='aboutMe' />
                        </div>
                        <ErrorMessage name="aboutMe" component="div" />

                        <div>
                            <label htmlFor="lookingForAJob">Looking For a Job</label>
                            <Field type='checkbox' name='lookingForAJob' />
                        </div>
                        <ErrorMessage name="lookingForAJob" component="div" />

                        <div>
                            <label htmlFor="lookingForAJobDescription">Looking For a Job Description</label>
                            <Field type='text' name='lookingForAJobDescription' />
                        </div>
                        <ErrorMessage name="lookingForAJobDescription" component="div" />

                        {status && status.message && <div className={css.messageError}>{status.message}</div>}

                        <button type="submit" disabled={isSubmitting}>
                            Save
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

export default ProfileForm;