import React, { FC, useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MessengerContainer from './components/Messenger/MessengerContainer';
import ProfileContainer from './components/Profile/ProfileContainer';

import { initializedThunk } from './state/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/preloader/Preloader';
import { compose } from 'redux';
import { StateType } from './state/redux';
import LoginContainer from './components/Login/LoginContainer';
import UsersPage from './components/Users/UsersPage';
import HeaderPage from './components/Header/HeaderPage';

type MapStatePropsType = {
  isInitialized: boolean, 
}
type MapDispatchPropsType = {
  initializedThunk: () => void,  
}

type PropsType = MapStatePropsType & MapDispatchPropsType;

const App: FC<PropsType> = ({ isInitialized, initializedThunk }) => {
  useEffect(() => {
    initializedThunk();
  }, [isInitialized]);

  if (!isInitialized) { return <Preloader /> }

  return (
    <BrowserRouter>
        <div className="app_wrapper">
          <HeaderPage />
          <NavBar />
          <div className='app_wrapper_content'>
            <Routes>
              <Route path='/login' element={<LoginContainer />}></Route>
              <Route path='/messenger/*' element={<MessengerContainer />}></Route>
              <Route path='/profile/:userId?' element={<ProfileContainer />}></Route>
              <Route path='/users/*' element={<UsersPage />}></Route>
            </Routes>
          </div>
        </div>
    </BrowserRouter>
  )
}

const mapStateToProps = (state: StateType): MapStatePropsType => {
  return {
    isInitialized: state.app.initialized,
  }
}

export default compose<React.Component>(
  connect<MapStatePropsType, MapDispatchPropsType, {}, StateType>(mapStateToProps, { initializedThunk }),
)(App)

