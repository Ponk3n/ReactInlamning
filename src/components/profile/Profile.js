import React, { useContext } from 'react'
import { UserContext } from '../../shared/provider/UserProvider'
import RoutingPath from '../../routes/RoutingPath'
import '../profile/Profile.css'
import { useHistory } from 'react-router-dom'
import BrowserCache from '../../shared/utils/BrowserCache'

export const Profile = () => {
    const history = useHistory()
    const [authenticatedUser, setAuthenticatedUser] = useContext(UserContext)

    const logout = () => {
        setAuthenticatedUser()
        localStorage.removeItem(BrowserCache.username)
        history.push(RoutingPath.HomeView)
    }

    return (
        <div className="signIn">

            <img className="profileImg" src={'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Arnold_Schwarzenegger_1974.jpg/220px-Arnold_Schwarzenegger_1974.jpg'}
                alt={'Error...'} />

            <div className="profileMenu">
                <span>{authenticatedUser}</span>
                <div className="profileMenu-content">
                    <span onClick={() => history.push(RoutingPath.SkynetView)}>SkynetRobot</span>
                    <span onClick={() => logout()}>Logout</span>
                </div>
            </div>

        </div>
    )
}
