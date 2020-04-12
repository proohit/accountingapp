import AuthenticationContext from './AuthenticationContext'
import React from 'react'

export default class AuthenticationProvider extends React.Component {
    state = {
        token: localStorage.getItem('token')
    }

    render() {
        return (
            <AuthenticationContext.Provider value={{
                token: this.state.token ? this.state.token : '',
                setToken: (token: string) => {
                    this.setState({ token: token })
                    localStorage.setItem('token', token)
                }
            }}>
                {this.props.children}
            </AuthenticationContext.Provider>
        )
    }

}