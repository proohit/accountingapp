import React from 'react'
import { render } from '@testing-library/react'
import NavBar from '../components/NavBar'
import { BrowserRouter } from 'react-router-dom'

const functions = {
    changeHeader: () => { },
    openAlert: () => { },
    toggleLoading: () => { }
}

test('Login button renders', () => {

    const { getByText } = render(
        <BrowserRouter>
            <NavBar title="Dashboard" functionSet={functions} />
        </BrowserRouter>)

    expect(getByText('Login')).toBeInTheDocument()
})

test('Logout button renders', () => {

    const { getByTestId } = render(
        <BrowserRouter>
            <NavBar title="Dashboard" functionSet={functions} />
        </BrowserRouter>)

    expect(getByTestId('logoutbutton')).toBeInTheDocument()
})