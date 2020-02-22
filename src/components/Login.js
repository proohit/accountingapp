import React, { Component } from "react";
import { Container, InputAdornment, TextField, Button, Grid, Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import { AccountCircle, Lock } from '@material-ui/icons'
import { Redirect } from 'react-router-dom'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            alert: null,
            toDashboard: false,
            open: false
        }
        this.usernameFieldValue = ''
        this.passwordFieldValue = ''
    }
    confirm = (e) => {
        if ((e.key && e.key === 'Enter') || e.currentTarget.tagName === 'BUTTON') {
            const loginData = { username: this.usernameFieldValue, password: this.passwordFieldValue }
            console.log(JSON.stringify(loginData));
            const params = {
                method: 'POST',
                body: JSON.stringify(loginData),
                headers: { "Content-Type": 'application/json' }
            }
            fetch('http://localhost:3000/login', params).then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (!res.success) {
                        this.setState({
                            alert:
                                <Alert severity="error">{res.message}</Alert>,
                            open: true
                        })
                    } else {
                        this.setState({ alert: <Alert severity="success">{res.message}</Alert>, toDashboard: true })
                        this.props.changeToken(res.token)
                    }
                }).catch(err => console.log(err.message))
            return;
        }
    }
    render() {
        if (this.state.toDashboard) {
            return <Redirect to='/' />
        }
        return (
            <Container>
                <Grid
                    container
                    direction="column"
                    justify="space-evenly"
                    alignItems="center">
                    <TextField
                        onChange={e => this.usernameFieldValue = e.target.value}
                        id="username"
                        label="Username"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <AccountCircle />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <TextField
                        onChange={e => this.passwordFieldValue = e.target.value}
                        id="password"
                        label="Password"
                        variant="standard"
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <Lock />
                                </InputAdornment>
                            ),
                        }}
                        onKeyPress={this.confirm}
                    />
                    <Button onClick={this.confirm}>Login</Button>
                </Grid>
                <Snackbar
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    autoHideDuration={4000}
                    open={this.state.open}
                    onClose={(e, reason) => this.setState({ open: false })}>
                    {this.state.alert}
                </Snackbar>
            </Container>
        );
    }
}