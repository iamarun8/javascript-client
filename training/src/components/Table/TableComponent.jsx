import React from 'react';
import PropTypes from 'prop-types';
import { Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody, TableSortLabel } from '@material-ui/core';

const useStyles = (theme) => ({
    table: {
        minWidth: 650,
    },
    header: {
        color: 'grey',
    },
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        '&:hover': {
            backgroundColor: 'rgb(200,200,200)',
            cursor: 'pointer',
        },
    },

});

function TableComponent(props) {
    const { classes, data, column, orderBy, order, onSort, onSelect } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {
                            column.map(({align, field, label}, index) => (
                                <TableCell
                                    key={`tableCell1_${index}`} 
                                    className={classes.header}
                                    align={align}
                                >
                                    <TableSortLabel
                                        active={orderBy === field}
                                        direction={orderBy === field ? order : 'asc'}
                                        onClick={onSort(field)}
                                    >
                                        {label}
                                    </TableSortLabel>
                                </TableCell>
                            ))
                        }
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.trainees.map((element) => (
                        console.log('>>ELEMENT<<',element),
                        <TableRow
                            key={element.id}
                            className={classes.root}
                            onMouseEnter={onSelect(element)}
                        >
                            {column.map(({ field, align, format }, index) => (
                                <TableCell key={`tableCell1_${index}`} align={align}>
                                    {format !== undefined ? format(element[field]) : element[field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
TableComponent.propTypes = {
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    column: PropTypes.arrayOf(PropTypes.object).isRequired,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onSort: PropTypes.func,
};
TableComponent.defaultProps = {
    order: 'asc',
    orderBy: '',
    onSort: () => { },
};

export default withStyles(useStyles)(TableComponent);