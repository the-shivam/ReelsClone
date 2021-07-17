import React, { useContext } from 'react'
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../context/AuthProvider';

function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useContext(AuthContext);
    return (
        <div>
            <Route {...rest} render={props => {
                return currentUser ? <Component {...props} /> : <Redirect to='/login' />;
            }} />
        </div>
    )
}

export default PrivateRoute
