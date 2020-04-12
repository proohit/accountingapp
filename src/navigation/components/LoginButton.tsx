import { IconButton, Typography } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'

export default class LoginButton extends React.Component<{}, {}> {

    render() {
        return (
            <Link to="/login">
                <IconButton>
                    <Typography variant="h6">Login</Typography>
                </IconButton>
            </Link>
        )
    }
}

