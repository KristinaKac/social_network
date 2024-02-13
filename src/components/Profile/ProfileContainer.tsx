import React, { FC, useEffect, useState } from 'react';
import {
  getUserThunk,
  getStatusThunk, updateStatusThunk, setPhotoThunk, setProfileSettingsThunk
} from '../../state/profileReducer';
import { actions } from '../../state/profileReducer';
import Profile from './Profile';
import { connect } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import { compose } from 'redux';
import { StateType } from '../../state/redux';
import { withRouter, PropsWithRouter } from '../../hoc/withRouter';

type MapStateType = {
  currentUser: ProfileUserType | null,
  posts: Array<PostType>,
  textAreaNewPost: string,
  currentStatus: string,
  authorizedUserId: number | null,
  isSuccessEdit: boolean,
}
type OwnProps = {};

interface PathParamsType extends PropsWithRouter {
  userId: string
}

type MapDispatchType = {
  setEdit: (success: boolean) => void,
  setPhotoThunk: (file: File) => void,
  setProfileSettingsThunk: (profile: ProfileUserType, setStatus: any) => void,
  updateStatusThunk: (status: string) => void,
  addPost: () => void,
  changeTextareaPost: (text: string) => void,
  getUserThunk: (userId: number) => void,
  getStatusThunk: (userId: number) => void,
}
type PropsType = MapStateType & MapDispatchType & PathParamsType;


const ProfileContainer: FC<PropsType> = (props) => {
  const navigate = useNavigate();
  const [isOwner, setOwner] = useState(false);

  let { userId } = useParams();
  

  useEffect(() => {
    if (Number(userId)) {
      props.getUserThunk(Number(userId));
      props.getStatusThunk(Number(userId));
      setOwner(false);
    }
    if (!userId) {
      if (!props.authorizedUserId) {
        return navigate('/login');
      } else {
        props.getUserThunk(props.authorizedUserId);
        props.getStatusThunk(props.authorizedUserId);
        setOwner(true);
      }
    }
  }, [props.authorizedUserId, props.router.params.userId]);

  return (
    <Profile
      addPost={props.addPost}
      posts={props.posts}
      textAreaNewPost={props.textAreaNewPost}
      changeTextareaPost={props.changeTextareaPost}
      currentStatus={props.currentStatus}
      currentUser={props.currentUser}
      updateStatusThunk={props.updateStatusThunk}
      isOwner={isOwner}
      setPhotoThunk={props.setPhotoThunk}
      setProfileSettingsThunk={props.setProfileSettingsThunk}
      isSuccessEdit={props.isSuccessEdit}
      setEdit={props.setEdit} />
  )
}

const mapStateToProps = (state: StateType): MapStateType => {
  return {
    currentUser: state.profilePage.currentUser,
    posts: state.profilePage.posts,
    textAreaNewPost: state.profilePage.textAreaNewPost,
    currentStatus: state.profilePage.currentStatus,
    authorizedUserId: state.auth.id,
    isSuccessEdit: state.profilePage.isSuccessEdit
  }
}

export default compose<React.ComponentType>(
  connect<MapStateType, MapDispatchType, OwnProps, StateType>(mapStateToProps, {
    addPost: actions.addPost, changeTextareaPost: actions.changeTextareaPost, setEdit: actions.setEdit,
    getUserThunk, getStatusThunk, updateStatusThunk, setPhotoThunk, setProfileSettingsThunk
  }),
  withRouter,
)(ProfileContainer);