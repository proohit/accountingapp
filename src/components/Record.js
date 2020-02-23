import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography } from '@material-ui/core'

export class Record extends Component {
    static propTypes = {
        description: PropTypes.string.isRequired,
        value: PropTypes.number.isRequired,
        id: PropTypes.number.isRequired,
        timestamp: PropTypes.object.isRequired
    }

    render() {
        return (
            <Grid key={this.props.id} item>
                <Typography >{this.props.description}</Typography>
            </Grid>
        )
    }
}

export default Record
