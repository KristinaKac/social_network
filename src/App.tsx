import React, { useEffect } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { initializedThunk } from './state/appReducer';
import Preloader from './components/common/preloader/Preloader';
import { AppDispatch, StateType, useTypedSelector } from './state/redux';
import UsersPage from './pages/UsersPage';
import HeaderPage from './components/Header/HeaderPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { useDispatch } from 'react-redux';
import ChatPage from './pages/ChatPage';

const App = () => {
  const dispatch: AppDispatch = useDispatch();
  const isInitialized = useTypedSelector((state) => state.app.initialized);

  useEffect(() => {
    dispatch(initializedThunk());
  }, [isInitialized]);

  if (!isInitialized) { return <Preloader /> }

  return (
    <BrowserRouter>
        <div className="app_wrapper">
          <HeaderPage />
          <NavBar />
          <div className='app_wrapper_content'>
            <Routes>
              <Route path='/login' element={<LoginPage />}></Route>
              <Route path='/chat' element={<ChatPage />}></Route>
              <Route path='/profile/:userId?' element={<ProfilePage />}></Route>
              <Route path='/users/*' element={<UsersPage />}></Route>
            </Routes>
          </div>
        </div>
    </BrowserRouter>
  )
}
export default App;
