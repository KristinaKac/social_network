import React, { useEffect, useState } from 'react';
import {
  getUserThunk,
  getStatusThunk
} from '../state/profileReducer';
import Profile from '../components/Profile/Profile';
import { useNavigate, useParams } from "react-router-dom";
import { AppDispatch, StateType, useTypedSelector } from '../state/redux';
import { withRouter, PropsWithRouter } from '../hoc/withRouter';
import { useDispatch } from 'react-redux';

const ProfilePage: React.FC<PropsWithRouter> = ({router}) => {

  const authorizedUserId = useTypedSelector((state) => state.auth.id);
  const dispatch: AppDispatch = useDispatch();

  const navigate = useNavigate();
  const [isOwner, setOwner] = useState(false);

  let { userId } = useParams();
  
  useEffect(() => {
    if (Number(userId)) {
      dispatch(getUserThunk(Number(userId)));
      dispatch(getStatusThunk(Number(userId)));
      setOwner(false);
    }
    if (!userId) {
      if (!authorizedUserId) {
        return navigate('/login');
      } else {
        dispatch(getUserThunk(authorizedUserId));
        dispatch(getStatusThunk(authorizedUserId));
        setOwner(true);
      }
    }
  }, [authorizedUserId, router.params.userId]);

  return (
    <Profile isOwner={isOwner} />
  )
}

export default withRouter(ProfilePage);