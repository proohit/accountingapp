import { Fab, Grid } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React from 'react'
import BaseProps from '../BaseProps'


interface IAddButtonProps extends BaseProps {
    onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
    type: "add"
    style?: React.CSSProperties,
    className?: string
    horizontalAlignment: "center" | "flex-end" | "flex-start"
    verticalAlignment: "center" | "flex-end" | "flex-start"
}

export default class AddButton extends React.Component<IAddButtonProps, {}>{
    render() {
        return (
            <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                <Fab className={this.props.className} data-testid={this['props']['data-testid']} onClick={this.props.onClick} style={this.props.style}>
                    {this.props.type === "add" ? <Add /> : null}
                </Fab>
            </Grid >
        )
    }
}