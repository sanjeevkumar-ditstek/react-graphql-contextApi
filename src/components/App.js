import React, { useState, useMemo } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect,
} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import GlobalStyles from '../globalStyles';
import AccessLevels from '../util/AccessLevels';
// PublicLayout Layout
import PublicLayout from './layouts/PublicLayout';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
// Admin Layout
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './dashboard/Dashboard';
import { UserContext } from '../context/UserContext';
import { AppContext } from '../context/AppContext';
import {
    useDesktopMedia,
} from '../util/MediaQuery';

export default function App() {

    const [app, setApp] = useState(null);
    const [user, setUser] = useState(null);
    const userValue = useMemo(() => ({ user, setUser }), [user, setUser]);
    const appValue = useMemo(() => ({ app, setApp }), [app, setApp]);

    const isDesktop = useDesktopMedia();

    const HideToolTip = createGlobalStyle`
     .__react_component_tooltip{
      display: none;
    }
  `;

    return (
        <Router basename="/admin">
            <GlobalStyles />
            {!isDesktop && <HideToolTip />}
            <Switch>
                {/* Non-Authed routes */}
                <Route exact path="/">
                    <Redirect to="/login" />
                </Route>
                <PublicLayout path="/login" component={Login} />
                <PublicLayout path="/register" component={Register} />
                <PublicLayout path="/forgotPassword" component={ForgotPassword} />
                <PublicLayout path="/resetPassword" component={ResetPassword} />
                {/* Auth required routes */}
                <AppContext.Provider value={appValue}>
                    <UserContext.Provider value={userValue}>
                        <AdminLayout
                            path="/dashboard"
                            component={Dashboard}
                            rolesAllowed={[AccessLevels.SuperAdmin, AccessLevels.Admin]}
                        />
                    </UserContext.Provider>
                </AppContext.Provider>
                {/* 404 */}
                <Redirect to="/" />
            </Switch>
        </Router>
    );
}
