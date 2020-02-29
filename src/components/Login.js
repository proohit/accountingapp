import { Button, Container, Grid, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, Lock } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import React, { Component } from "react";
import config from '../config.js';
import Dashboard from './Dashboard';

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            alert: null,
            toDashboard: false,
        }
        this.usernameFieldValue = ''
        this.passwordFieldValue = ''
    }

    componentDidMount() {
        this.props.functionSet.changeHeader('Login');
    }
    componentDidUpdate() {
        if (this.state.toDashboard) {
            this.props.functionSet.changeHeader('Dashboard')
            this.props.functionSet.setContent(<Dashboard></Dashboard>)
        }
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
            fetch(config.api + '/login', params).then(res => res.json())
                .then(res => {
                    if (!res.success) {
                        this.props.functionSet.openAlert(<Alert severity="error">{res.message}</Alert>);
                    } else {
                        this.props.functionSet.openAlert(<Alert severity="success">{res.message}</Alert>);
                        this.props.changeToken(res.token)
                        this.setState({ toDashboard: true })
                    }
                }).catch(err => console.log(err.message))
            return;
        }
    }
    render() {
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
                        type="password"
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
            </Container>
        );
    }
}