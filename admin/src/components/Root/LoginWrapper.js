import React,{ ReactNode } from 'react';
import { Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';


function LoginWrapper({ children,Auth, ...rest }) {
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
                            pathname: "/admin/dashboard"
                        }}
                    />
                )
            }
        />
    );
}

const mapStateToProps = (state) => ({
    Auth : state.Auth
});

export default connect(mapStateToProps,{})(LoginWrapper);