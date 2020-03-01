import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardContent, Typography, CardActions, IconButton, Collapse, List, ListItem, ListItemText, Divider } from '@material-ui/core'
import { Edit, ExpandMore } from '@material-ui/icons'

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
                    <IconButton>
                        <Edit />
                    </IconButton>
                    <IconButton
                        style={expandedStyle}
                        onClick={this.handleExpand}
                    >
                        <ExpandMore />
                    </IconButton>
                </CardActions>
                <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
                    <Divider />
                    <CardContent>

                        <List>
                            {this.props.records.map(record => <ListItem dense divider key={record.id}><ListItemText>{record.description}</ListItemText></ListItem>)}
                        </List>
                    </CardContent>
                </Collapse>
            </Card>
        )
    }
}

export default WalletCard
