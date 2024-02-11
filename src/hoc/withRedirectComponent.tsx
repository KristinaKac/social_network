import { connect } from "react-redux";
import React from "react"
import { Navigate } from "react-router-dom"
import { StateType } from "../state/redux";

const mapStateToPropsForRedirect = (state: StateType): MapPropsType => ({
    isAuth: state.auth.isAuth,
} as MapPropsType)

type MapPropsType = {
    isAuth: boolean
}

export const WithRedirectComponentToLogin = <WCP,>(Component: any) => {
    const RedirectComponent = (props: MapPropsType) => {
        const { isAuth, ...restProps } = props;
        if (!isAuth) return <Navigate to="/login" />;
        return <Component {...(restProps as WCP)} />;
    };

    const ConnectedRedirectComponent = connect<MapPropsType, {}, WCP, StateType>
        (mapStateToPropsForRedirect, {})(RedirectComponent);
    return ConnectedRedirectComponent;
}
export const WithRedirectComponentToProfile = <WCP,>(Component: any) => {
    const RedirectComponent = (props: MapPropsType) => {
        const { isAuth, ...restProps } = props;
        if (isAuth) return <Navigate to="/profile" />;
        return <Component {...(restProps as WCP)} />;
    };

    const ConnectedRedirectComponent = connect<MapPropsType, {}, WCP, StateType>
        (mapStateToPropsForRedirect, {})(RedirectComponent);
    return ConnectedRedirectComponent;
}