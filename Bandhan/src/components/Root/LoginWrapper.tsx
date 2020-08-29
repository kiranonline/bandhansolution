import React,{ ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


function LoginWrapper({ children,Auth, ...rest }:any) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                !Auth.isLoggedIn ? 
                (
                    children
                ) 
                : 
                (
                    <Redirect
                        to={{
                            pathname: "/home"
                        }}
                    />
                )
            }
        />
    );
}

const mapStateToProps = (state:any) => ({
    Auth : state.Auth
});

export default connect(mapStateToProps,{})(LoginWrapper);