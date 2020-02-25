import React from 'react'
import { Container, Typography, Grid, Fab, Grow, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core'
import { Alert } from '@material-ui/lab'
import Record from './Record'
import config from '../config.js'
import { AddCircleOutlined, AddCircle } from '@material-ui/icons'

export default class RecordView extends React.Component {
    constructor(props) {
        super();
        this.state = {
            records: []
        }
    }


    componentDidMount() {
        this.props.functionSet.changeHeader('Records');
        this.props.functionSet.toggleLoading();
        const params = {
            headers: { "Authorization": this.props.token, "Content-Type": 'application/json' },
            method: 'GET'
        }

        fetch(config.api + '/records', params)
            .then(res => res.json())
            .then(records => {
                if (records.success) {
                    this.setState({ records: records.message })
                } else {
                    this.props.functionSet.openAlert(<Alert severity='error'>{records.message}</Alert>)
                }
                this.props.functionSet.toggleLoading();
            }).catch(err => {
                console.log(err);
                this.props.functionSet.openAlert(<Alert severity='error'>oops, something went wrong retrieveing your records</Alert>)
                this.props.functionSet.toggleLoading();
            })
    }
    render() {
        const records = this.state.records.map(record =>
            <Record description={record.description} value={record.value} id={record.id} />
        )
        return (
            <Container>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">description</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.state.records.map(row => (
                                <TableRow>
                                    <TableCell align="left">{row.description}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Grid container direction='row' justify='flex-end' alignItems='flex-end'>
                    <Fab style={{ position: 'fixed', right: 25, bottom: 25 }} color="primary" aria-label="add">
                        <AddCircle />
                    </Fab>
                </Grid>
            </Container>
        )
    }
}