import React, { Component } from "react";
import { Container, InputAdornment, TextField } from '@material-ui/core'
import { AccountCircle, Lock } from '@material-ui/icons'

export default class Login extends Component {

    render() {
        return (
            <Container>
                <form noValidate autoComplete="off">

                    <TextField
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
                    />
                </form>
            </Container>
        );
    }
}