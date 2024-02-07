import React, { useEffect } from 'react';
import { addPost, changeTextareaPost, getUserThunk, 
  getStatusThunk, updateStatusThunk, setPhotoThunk } from '../../state/profileReducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { compose } from 'redux';

const ProfileContainer = (props) => {
  let userId = props.router.params.userId;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      userId = props.authorizedUserId;
      if (!userId) {
        return navigate('/login');
      }
    }
    props.getUserThunk(userId);
    props.getStatusThunk(userId);
  }, [props.authorizedUserId, props.router.params.userId]);

  return (
    <Profile
      profilePage={props.profilePage}
      addPost={props.addPost}
      changeTextareaPost={props.changeTextareaPost}
      isAuth={props.isAuth}
      currentStatus={props.currentStatus}
      updateStatusThunk={props.updateStatusThunk}
      isOwner={!props.router.params.userId}
      setPhotoThunk={props.setPhotoThunk} />
  )
}

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();

    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }
  return ComponentWithRouterProp;
}

const mapStateToProps = (state) => {
  return {
    profilePage: state.profilePage,
    currentStatus: state.profilePage.currentStatus,
    authorizedUserId: state.auth.id
  }
}

export default compose(
  connect(mapStateToProps, { addPost, changeTextareaPost, getUserThunk, getStatusThunk, updateStatusThunk, setPhotoThunk }),
  withRouter,
)(ProfileContainer);