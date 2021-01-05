import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody} from '@material-ui/core';

const useStyles = () => ({
    table: {
        minWidth: 650,
    },
    header: {
        color: 'gray',
    },

});

function TableComponent(props) {
    const { classes, data, column } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            column.map(({ align, label }) => (
                                <TableCell key={label} className={classes.header} align={align}>{label}</TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map(({ name, email }, index ) => (
                        <TableRow key={`tableRow${index}` }>
                            <TableCell key={`tableCell1_${index}` } align={column[0].align}>
                                {name}
                            </TableCell>
                            <TableCell key={`tableCell2_${index}` } >{email}</TableCell>
                        </TableRow >
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
TableComponent.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    column: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default withStyles(useStyles)(TableComponent);