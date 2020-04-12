import { IconButton } from '@material-ui/core'
import { ExitToApp } from '@material-ui/icons'
import React from 'react'
import { Link } from 'react-router-dom'
import { DataComponentProps } from '../../shared/BaseProps'
import AuthenticationContext, { AuthenticationContextValue } from '../../shared/context/AuthenticationContext'

interface ILogoutButtonProps extends DataComponentProps {
}

export default class LogoutButton extends React.Component<ILogoutButtonProps, {}> {
    context:AuthenticationContextValue = this.context;
    render() {
        return (
            <Link to="/login">
                <IconButton data-testid="logoutbutton" style={{color: 'white'}} onClick={() => this.context.setToken(null)}>
                    <ExitToApp />
                </IconButton>
            </Link>
        )
    }
}

LogoutButton.contextType = AuthenticationContext;