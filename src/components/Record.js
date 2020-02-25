import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Grid, Typography, Card, CardContent } from '@material-ui/core'

const styles = {
    card: {
        minWidth: 300,
        marginTop: 25
    }
}

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
                <Card style={styles.card}>
                    <CardContent>
                        <Typography variant="h5" component="h2">{this.props.timestamp}</Typography>
                        <Typography variant="body2" component="p">{this.props.description}</Typography>
                        <Typography style={{ color: this.props.value < 0 ? 'red' : 'gray' }} variant="body2" component="p">{this.props.value}</Typography>
                    </CardContent>
                </Card>
                <Typography ></Typography>
            </Grid>
        )
    }
}

export default Record
