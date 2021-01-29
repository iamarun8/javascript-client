// import React from 'react';
// import PropTypes from 'prop-types';
// import {
//     Table, TableCell, TableContainer, TableHead, TableRow, withStyles, TableBody,
//     TableSortLabel, TablePagination, IconButton,
// } from '@material-ui/core';
// // import { hoc } from '../HOC/index';

// const useStyles = (theme) => ({
//     table: {
//         minWidth: 650,
//     },
//     header: {
//         color: 'grey',
//     },
//     root: {
//         '&:nth-of-type(odd)': {
//             backgroundColor: theme.palette.action.hover,
//         },
//         '&:hover': {
//             backgroundColor: 'rgb(200,200,200)',
//             cursor: 'pointer',
//         },
//     },

// });

// function TableComponent(props) {
//     const {classes, data, column, order, orderBy, onSort, onSelect, count, page, actions,rowsPerPage, onChangePage, onChangeRowsPerPage} = props;
//     return (
//         <TableContainer>
//             <Table className={classes.table}>
//                 <TableHead>
//                     <TableRow key={data.id}>
//                         {column.map((Data, index) => (
//                             <TableCell
//                                 key={`tableRow1${index}`}
//                                 className={classes.header}
//                                 align={Data.align}
//                                 sortDirection={orderBy === Data.label ? order : false}
//                             >
//                                 <TableSortLabel
//                                     key={`tableRow2${index}`}
//                                     active={orderBy === Data.label}
//                                     direction={orderBy === Data.label ? order : 'asc'}
//                                     onClick={onSort(Data.label)}
//                                 >{Data.label}
//                                 </TableSortLabel>
//                             </TableCell>
//                         ))}
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {data.map((element) => (
//                         <TableRow
//                             key={element.id}
//                             className={classes.root}
//                         >
//                             {column.map(({ field, align, format }, index) => (
//                                 <TableCell onClick={() => onSelect(element)} key={`tableRow3_${index}`} align={align}>{format !== undefined ? format(element[field]) : element[field]}</TableCell>
//                             ))}
//                             {actions.map(({ icon, handler }, index) => (
//                                 <IconButton key={`tableRow4_${index}`} onClick={handler(element)} className={classes.action}>{icon}</IconButton>
//                             ))}
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//             {
//                 (count === 0) ? '' : <TablePagination
//                     component="div"
//                     rowsPerPageOptions={[0]}
//                     count={count}
//                     rowsPerPage={rowsPerPage}
//                     page={page}
//                     onChangePage={onChangePage}
//                     onChangeRowsPerPage={onChangeRowsPerPage}
//                 />
//             }
            
//         </TableContainer>
//     );
// }
// TableComponent.propTypes = {
//     classes: PropTypes.objectOf(PropTypes.string).isRequired,
//     column: PropTypes.arrayOf(PropTypes.object).isRequired,
//     order: PropTypes.string,
//     orderBy: PropTypes.string,
//     onSort: PropTypes.func,
//     actions: PropTypes.arrayOf(PropTypes.object).isRequired,
//     count: PropTypes.number.isRequired,
//     onChangePage: PropTypes.func.isRequired,
//     page: PropTypes.number.isRequired,
//     rowsPerPage: PropTypes.number.isRequired,
//     onSelect: PropTypes.func.isRequired,
//     onChangeRowsPerPage: PropTypes.func.isRequired,
// };
// TableComponent.defaultProps = {
//     order: 'asc',
//     orderBy: '',
//     onSort: () => { },
// };
// export default withStyles(useStyles)(TableComponent);



import React from 'react';
import PropTypes from 'prop-types';
import {
    Table, TableCell, TableContainer, TableHead, TableRow, Paper, withStyles, TableBody,
} from '@material-ui/core';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Button from '@material-ui/core/Button';
import TablePagination from '@material-ui/core/TablePagination';
// import { hoc } from '../HOC/index';

const useStyles = (theme) => ({
    tableContainer: {
        marginLeft: 20,
        width: '97%',
    },
    table: {
        minWidth: 650,
    },
    tableHeader: {
        color: 'grey',
    },
    tableRow: {
        cursor: 'pointer',
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.grey[100],
        },
        '&:hover': {
            backgroundColor: theme.palette.grey[300],
        },
    },
});

function TableComponent(props) {
    const {
        id, columns, classes, order, orderBy, onSort, onSelect,
        actions, data, count, rowsPerPage, page, onChangePage, onChangeRowsPerPage,
    } = props;
    // console.log('--data--inside--TABLECOMPONENT--',data);

    return (
        <TableContainer component={Paper} className={classes.tableContainer}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        {columns.map((Data, index) => (
                            <TableCell
                                key={`tableRow1${index}`}
                                className={classes.header}
                                align={Data.align}
                                sortDirection={orderBy === Data.label ? order : false}
                            >
                                <TableSortLabel
                                    key={`tableRow2${index}`}
                                    active={orderBy === Data.label}
                                    direction={orderBy === Data.label ? order : 'asc'}
                                    onClick={onSort(Data.label)}
                                >{Data.label}
                                </TableSortLabel>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data[0].map((item) => (
                        <TableRow className={classes.tableRow} key={item[id]}>
                            {
                                columns && columns.length && columns.map(({ align, field, format }) => (
                                    <TableCell onClick={(event) => onSelect(event, item.name)} align={align} component="th" scope="row" order={order} ordery={orderBy}>
                                        {format ? format(item[field]) : item[field]}
                                    </TableCell>
                                ))
                            }
                            <TableCell>
                                {actions && actions.length && actions.map(({ icon, handler }) => (
                                    <TableRow>
                                        <TableRow>
                                            <Button onClick={() => handler(item)}>
                                                {icon}
                                            </Button>
                                        </TableRow>
                                    </TableRow>
                                ))}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                {
                    (count === 0) ? '' : (
                        <TablePagination
                            rowsPerPageOptions={[0]}
                            count={count}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onChangePage={onChangePage}
                            onChangeRowsPerPage={onChangeRowsPerPage}
                        />
                    )
                }
            </Table>
        </TableContainer>
    );
}

TableComponent.propTypes = {
    id: PropTypes.string.isRequired,
    data: PropTypes.arrayOf(PropTypes.object),
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    actions: PropTypes.arrayOf(PropTypes.object).isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    order: PropTypes.string,
    orderBy: PropTypes.string,
    onSelect: PropTypes.func.isRequired,
    onSort: PropTypes.func.isRequired,
    count: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onChangeRowsPerPage: PropTypes.func.isRequired,
};
TableComponent.defaultProps = {
    order: 'asc',
    orderBy: '',
    data:[]
};
export default withStyles(useStyles)((TableComponent));