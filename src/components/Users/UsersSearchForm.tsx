import React from 'react';
import { Field, Form, Formik } from "formik";
import { getUsersThunk } from '../../state/usersReducer'
import { AppDispatch, useTypedSelector } from '../../state/redux';
import { useDispatch } from 'react-redux';
import css from './Users.module.css'
import { SearchOutlined } from '@ant-design/icons';


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
        <Form className={css.form_search}>
          <Field className={css.form_input_term} placeholder='Найти пользователя...' type="text" name="term"/>
          <Field className={css.form_input_select} as="select" name="friend">
            <option value="null">Все пользователи</option>
            <option value="true">Только друзья</option>
            <option value="false">Только не друзья</option>
          </Field>
          <button className={css.form_btn_search} type="submit" disabled={isSubmitting}>
            <SearchOutlined />
          </button>
        </Form>
      )}
    </Formik>
  )
}
export default UsersSearchForm;