import React, { Component } from 'react'
import { IconButton, Tooltip } from '@material-ui/core'
import { ReplayOutlined } from '@material-ui/icons'

export class CustomToolbar extends Component {

    render() {
        return (
            <Tooltip title="Refresh">
                <IconButton onClick={this.props.refresh}>
                    <ReplayOutlined />
                </IconButton>
            </Tooltip>
        )
    }
}

export default CustomToolbar
