import { Card, CardActions, CardContent, CardHeader, Collapse, Divider, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Tooltip } from '@material-ui/core'
import { Edit, ExpandMore } from '@material-ui/icons'
import PropTypes from 'prop-types'
import React, { Component } from 'react'

const styles = {

    card: {
        width: '100%',
        marginTop: 10
    },
    expand: {
        marginLeft: 'auto'
    },
    expandOpen: {
        marginLeft: 'auto',
        transform: 'rotate(180deg)'
    }
}
export class WalletCard extends Component {
    state = {
        expanded: false
    }
    static propTypes = {
        name: PropTypes.string.isRequired,
        balance: PropTypes.number.isRequired,
        records: PropTypes.array.isRequired,
    }
    handleExpand = () => {
        this.setState({ expanded: !this.state.expanded })
    }
    render() {
        const expandedStyle = this.state.expanded ? styles.expandOpen : styles.expand
        return (
            <Card style={styles.card}>
                <CardHeader
                    title={this.props.name}
                    subheader={`Number of Records: ${this.props.records.length}`}
                />
                <CardContent>
                    <Typography variant="body2" component="p">
                        The balance of this wallet is {this.props.balance}.
                    </Typography>
                </CardContent>
                <CardActions>
                    <Tooltip title="edit wallet">
                        <IconButton>
                            <Edit />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="show records of wallet">
                        <IconButton
                            style={expandedStyle}
                            onClick={this.handleExpand}
                        >
                            <ExpandMore />
                        </IconButton>
                    </Tooltip>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Divider />
                    <CardContent>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Description</TableCell>
                                    <TableCell>Value</TableCell>
                                    <TableCell>Timestamp</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.props.records.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell>{row.description}</TableCell>
                                        <TableCell>{row.value}</TableCell>
                                        <TableCell>{row.timestamp}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default WalletCard
