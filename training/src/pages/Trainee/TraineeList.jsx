import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components/AddDialog';
import { EditDialog } from './components/EditDialog';
import { DeleteDialog } from './components/DeleteDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import { TableComponent } from '../../components/Table';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';
// import callApi from '../../lib/utils/api';
import { withLoaderAndMessage } from '../../components/HOC/index';
import { graphql } from '@apollo/react-hoc';
import Compose from 'lodash.flowright';
import { GET_TRAINEE } from './query';
import { MyContext } from '../../contexts/index';

const useStyles = (theme) => ({
    root: {
        margin: theme.spacing(2),
    },
    dialog: {
        textAlign: 'right',
    },
});

class TraineeList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selected: '',
            order: 'asc',
            orderBy: '',
            EditOpen: false,
            RemoveOpen: false,
            editData: {},
            deleteData: {},
            page: 0,
            rowsPerPage: 6,
            count: 0,
            limit: 50,
            skip: 0,
            dataObj: [[]],
            refetchData: { }
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSort = (field) => () => {
        const { order } = this.state;
        this.setState({
            orderBy: field,
            order: order === 'asc' ? 'desc' : 'asc',
        });
    };

    handleSelect = (data) => {
        console.log(data);
    };

    handleChangePage = (refetch) => async (event, newPage) => {
        const { rowsPerPage } = this.state;
        const refetchData = await refetch({skip: newPage * (rowsPerPage), limit: rowsPerPage })
        const{  
                data : {getAllTrainees: { data = [], count } = {} },
        } = this.props;
        this.setState({
            page: newPage,
            refetchData: { data, count}
        });
    };

    handleRemoveDialogOpen = (element) => {
        this.setState({
            RemoveOpen: true,
            deleteData: element,
        });
    };

    handleRemoveClose = () => {
        this.setState({
            RemoveOpen: false,
        });
    };

    handleRemove = () => {
        this.setState({
            RemoveOpen: false,
        });
    };

    handleEditDialogOpen = (element) => {
        this.setState({
            EditOpen: true,
            editData: element,
        });
    };

    handleEditClose = () => {
        this.setState({
            EditOpen: false,
        });
    };

    handleEdit = (name, email) => {
        this.setState({
            EditOpen: false,
        });
    };

    render() {
        const { open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, editData, deleteData, refetchData } = this.state;
        const { classes } = this.props;
        const { loader, dataLength, setdataLength, setloader } = this.props;
        const{  
                data : {getAllTrainees: { data = [], count, totalCount } = {},
                refetch},
        } = this.props;
        const updatedCount = refetchData.count ? refetchData.count : count;
        const updatedData = refetchData.data ? refetchData.data : data;
        const updatedTotalCount = refetchData.totalCount || totalCount
        if(updatedCount){
            setloader(false);
            setdataLength(updatedCount);            
        }
        if(!dataLength) return null; 
        return (
            <>
            {
                (!loader) && (
                        <div className={classes.root}>
                            <div className={classes.dialog}>
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen} >
                                    ADD TRAINEELIST
                        </Button>
                            </div>
                            <AddDialog open={open} onClose={this.handleClose} refetchQueries={refetch}/>
                            <br />
                            <EditDialog
                                Editopen={EditOpen}
                                handleEditClose={this.handleEditClose}
                                handleEdit={this.handleEdit}
                                data={editData}
                                refetchQueries={refetch}
                            />
                            <DeleteDialog
                                open={RemoveOpen}
                                onClose={this.handleRemoveClose}
                                onSubmit={this.handleRemove}
                                data={deleteData}
                                refetchQueries={refetch}
                            />
                            <TableComponent
                                id="id"
                                data={updatedData}
                                columns={
                                    [
                                        {
                                            field: 'name',
                                            label: 'Name',
                                        },
                                        {
                                            field: 'email',
                                            label: 'Email Address',
                                            format: value => value && value.toUpperCase(),
                                        },
                                        {
                                            field: 'createdAt',
                                            label: 'Date',
                                            align: 'right',
                                            format: getDateFormatted,
                                        },
                                    ]
                                }
                                actions={[
                                    {
                                        icon: <EditIcon />,
                                        handler: this.handleEditDialogOpen,
                                    },
                                    {
                                        icon: <DeleteIcon />,
                                        handler: this.handleRemoveDialogOpen,
                                    }
                                ]}
                                orderBy={orderBy}
                                order={order}
                                onSort={this.handleSort}
                                onSelect={this.handleSelect}
                                count={updatedTotalCount}
                                page={page}
                                onChangePage={this.handleChangePage(refetch)}
                                rowsPerPage={rowsPerPage}
                            />
                        </div>
                )
            }
            </>
        );
    }
}
TraineeList.contextType = MyContext;
TraineeList.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Compose(withStyles(useStyles),
graphql(GET_TRAINEE,{
    options: { variables: {skip:0, limit:6, sort:'name'}, fetchPolicy: "network-only"}
}))(withLoaderAndMessage(TraineeList));