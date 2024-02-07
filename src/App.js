import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MessengerContainer from './components/Messenger/MessengerContainer';
import ProfileContainer from './components/Profile/ProfileContainer';
import UsersContainer from './components/Users/UsersContainer';
import HeaderContainer from './components/Header/HeaderContainer';
import LoginContainer from './components/Login/LoginContainer';
import { initializedThunk } from './state/appReducer';
import { connect } from 'react-redux';
import Preloader from './components/common/Preloader';
import { compose } from 'redux';


class App extends React.Component {
  componentDidMount() {
    this.props.initializedThunk();
  }

  render() {
    if (!this.props.isInitialized) { return <Preloader /> }
    return (
      <BrowserRouter>
        <div className="app_wrapper">
          <HeaderContainer store={this.props.store} />
          <NavBar />
          <div className='app_wrapper_content'>
            <Routes>
              <Route path='/login' element={<LoginContainer store={this.props.store} />}></Route>
              <Route path='/messenger/*' element={<MessengerContainer store={this.props.store} />} />
              <Route path='/profile/:userId?' element={<ProfileContainer store={this.props.store} />} />
              <Route path='/users/*' element={<UsersContainer store={this.props.store} />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isInitialized: state.app.initialized,
  }
}

export default compose(
  connect(mapStateToProps, { initializedThunk }),
)(App)

