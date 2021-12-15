import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

class Results extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.error) {
            return  (<div>{this.props.error}</div>)
        }
        if (!this.props.data.length) {
            return (<></>)
        } else {
            return (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 400 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Short Description</TableCell>
                                <TableCell align="right">Price (USD)</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.data.map((row, index) => (
                                <TableRow
                                    key={row.index}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row" align="left">{row.short_description}</TableCell>
                                    <TableCell align="right">${row.price}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
        }

    }
}

export default Results;