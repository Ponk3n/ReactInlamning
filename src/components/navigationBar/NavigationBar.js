import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import RoutingPath from '../../routes/RoutingPath'
import { UserContext } from '../../shared/provider/UserProvider'
import { Profile } from '../profile/Profile'
import './NavigationBar.css'

export const NavigationBar = () => {
    const history = useHistory()
    const [authenticatedUser,] = useContext(UserContext)

    const displayUserIfAuthenticated = () => {
        return authenticatedUser
            ? <Profile />
            : <span className="signIn" onClick={() => history.push(RoutingPath.SignInView)}>
                Sign in
            </span>
    }

    return (
        <div className="navigationBarWrapper">
            <a href="javascript:;" onClick={() => history.push(RoutingPath.HomeView)}>
                <h1>Skynet</h1>
                {displayUserIfAuthenticated()}
            </a>
        </div>
    )
}
