import React from 'react';
import { Field, Form, Formik } from "formik";
import { actions, getUsersThunk } from '../../state/usersReducer'
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const UsersSearchForm = () => {
    const maxPortionOnPage = useTypedSelector((state) => state.usersPage.maxPortionOnPage);
    const filter = useTypedSelector((state) => state.usersPage.filter);
    const dispatch: AppDispatch = useDispatch();

    return (
        <Formik
            enableReinitialize
            initialValues={{ term: filter.term, friend: String(filter.friend) }}
            onSubmit={(values, { setSubmitting }) => {
                const filter: FilterType = {
                    term: values.term,
                    friend: values.friend === "null" ? null : values.friend === "true" ? true : false,
                }
                dispatch(getUsersThunk(1, maxPortionOnPage, filter));
                setSubmitting(false);
            }}
        >
            {({ isSubmitting }) => (
                <Form>
                    <Field type="text" name="term" />
                    <Field as="select" name="friend">
                        <option value="null">All</option>
                        <option value="true">Followed</option>
                        <option value="false">Unfollowed</option>
                    </Field>
                    <button type="submit" disabled={isSubmitting}>
                        Search
                    </button>
                </Form>
            )}
        </Formik>
    )
}
export default UsersSearchForm;