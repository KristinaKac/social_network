import React, { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import css from '../Profile.module.css'
import avatar from '../../../img/avatar.png'

import Status from '../Status/Status';
import ProfileSchema from './ProfileFormValidation';

const ProfileForm = (props) => {
    if(!props.currentUser.aboutMe) props.currentUser.aboutMe = '';
    if(!props.currentUser.lookingForAJobDescription) props.currentUser.lookingForAJobDescription = '';
    return (
        <div className={css.profile}>

            <Formik
                initialValues={{ fullName: props.currentUser.fullName, aboutMe: props.currentUser.aboutMe,
                    lookingForAJob: props.currentUser.lookingForAJob, lookingForAJobDesc: props.currentUser.lookingForAJobDescription}}
                validationSchema={ProfileSchema}
                onSubmit={(values, { setSubmitting, setStatus }) => {
                    props.saveChangesProfile(values.fullName, values.aboutMe,
                        values.lookingForAJob, values.lookingForAJobDesc, setStatus);
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
                            <label htmlFor="lookingForAJobDesc">Looking For a Job Description</label>
                            <Field type='text' name='lookingForAJobDesc' />
                        </div>
                        <ErrorMessage name="lookingForAJobDesc" component="div" />

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