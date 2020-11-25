import React, { useContext, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { HomeView } from '../views/HomeView'
import { SignInView } from '../views/SignInView'
import { PageNotFoundView } from '../views/PageNotFoundView'
import { SkynetView } from '../views/SkynetView'
import { UserContext } from '../shared/provider/UserProvider'
import RoutingPath from './RoutingPath'
import BrowserCache from '../shared/utils/BrowserCache'

export const Routes = (props) => {
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const blockRouteIfNotAuthenticated = (navigateToView) => {
        return authenticatedUser
            ? navigateToView
            : SignInView
    }

    const checkIfUserIsAuthenticatedInBrowser = () => {
        setAuthenticatedUser(localStorage.getItem(BrowserCache.username))
    }

    useEffect(() => {
        checkIfUserIsAuthenticatedInBrowser()
    })

    return (
        <Router>
            {props.children}
            <Switch>
                <Route exact path={RoutingPath.SignInView} component={SignInView} />
                <Route exact path={RoutingPath.PageNotFoundView} component={PageNotFoundView} />
                <Route exact path={RoutingPath.SkynetView} component={blockRouteIfNotAuthenticated(SkynetView)} />
                <Route component={HomeView} />
            </Switch>
        </Router>
    )

}