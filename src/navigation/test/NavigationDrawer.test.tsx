import React from 'react'
import { render } from '@testing-library/react'
import NavigationDrawer from '../components/NavigationDrawer'
import { BrowserRouter as Router } from 'react-router-dom'

test('Check if Navigation Drawer', () => {

    const { getByText } = render(
        <Router>
            <NavigationDrawer open={true} toggleDrawer={() => { }} />
        </Router>
    )

    expect(getByText('AccountingApp')).toBeInTheDocument();
})

test('Records Link renders', () => {
    const { getByText } = render(
        <Router>
            <NavigationDrawer open={true} toggleDrawer={() => { }} />
        </Router>
    )

    expect(getByText('Records')).toBeInTheDocument();
})

test('Wallets Link renders', () => {
    const { getByText } = render(
        <Router>
            <NavigationDrawer open={true} toggleDrawer={() => { }} />
        </Router>
    )

    expect(getByText('Wallets')).toBeInTheDocument();
})