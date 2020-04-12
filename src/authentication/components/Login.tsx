import { Button, Grid, TextField } from '@material-ui/core'
import React from 'react'
import { withRouter } from 'react-router'
import { RouteComponentProps } from 'react-router-dom'
import { Severity } from '../../shared/alert/AlertModel'
import { DataComponentProps } from '../../shared/BaseProps'
import AuthenticationContext, { AuthenticationContextValue } from '../../shared/context/AuthenticationContext'
import { login } from '../service/AuthenticationService'

interface ILoginState {
    usernameValue: string;
    passwordValue: string;
}
class Login extends React.Component<DataComponentProps & RouteComponentProps, ILoginState> {

    state: ILoginState = {
        usernameValue: "",
        passwordValue: ""
    }
    static contextType = AuthenticationContext
    contextValue: AuthenticationContextValue = this.context;

    login = async () => {
        try {
            const res = await login(this.state.usernameValue, this.state.passwordValue)
            this.contextValue.setToken(res);
            console.log(res);
            this.props.history.push('/records')
        } catch (error) {
            this.props.functionSet.openAlert({ message: error.message, severity: Severity.error })
        }
    }
    render() {
        return (
            <Grid container contextMenu="test" direction="column" justify="center" alignItems="center">
                <TextField label="Username" onChange={(e) => this.setState({ usernameValue: e.target.value })} />
                <TextField label="Password" type="password" onChange={(e) => this.setState({ passwordValue: e.target.value })} />
                <Button variant="contained" onClick={this.login}>Login</Button>

            </Grid>
        )
    }
}

export default withRouter(Login);