import { useEffect } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

const mapStateToPropsForRedirect = (state) => {
    return {
        isAuth: state.auth.isAuth,
    }
}

export const WithRedirectComponentToLogin = (Component) => {
    const RedirectComponent = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            if (!props.isAuth) return navigate('/login');
        });
        return <Component {...props}/>
    }
    const AuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return AuthRedirect
}

export const WithRedirectComponentToProfile = (Component) => {
    const RedirectComponent = (props) => {
        const navigate = useNavigate();
        useEffect(() => {
            if (props.isAuth) return navigate('/profile');
        });
        return <Component {...props}/>
    }
    const AuthRedirect = connect(mapStateToPropsForRedirect)(RedirectComponent)

    return AuthRedirect
}