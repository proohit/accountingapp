import React from 'react'
import { render, screen, fireEvent, prettyDOM, getByTitle, cleanup} from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import RecordView from '../components/RecordView'
import { debug } from 'console'
import App from '../../App'

describe("renders table", () => {
    test('with navigation from initial load', () => {

        const menuButton = getByTestId('menubutton');
        fireEvent.click(menuButton, {button: 1});
        fireEvent.click(getByText('Records'));

        expect(getByText('Value')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Timestamp')).toBeInTheDocument();
        expect(getByText('Wallet')).toBeInTheDocument();
        cleanup();
    })
    test('component only', () => {
        const functions = {
            changeHeader: () => { },
            openAlert: () => { },
            toggleLoading: () => { }
        }
        const { getByText, container } = render(<RecordView functionSet={functions} />)
        expect(getByText('Value')).toBeInTheDocument();
        expect(getByText('Description')).toBeInTheDocument();
        expect(getByText('Timestamp')).toBeInTheDocument();
        expect(getByText('Wallet')).toBeInTheDocument();
        cleanup();
    })
})