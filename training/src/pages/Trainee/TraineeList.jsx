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
import callApi from '../../lib/utils/api';
import { withLoaderAndMessage } from '../../components/HOC/index';

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
            rowsPerPage: 10,
            count: 0,
            limit: 20,
            skip: 0,
            dataObj: [[]],
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

    handleSelect = ( data) => {
        console.log(data);
    };

    handleChangePage = (event, newPage) => {
        this.componentDidMount(newPage);
        this.setState({
            page: newPage,
        });
    };

    handleRemoveDialogOpen = (element) => () => {
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
        const { deleteData } = this.state;
        this.setState({
            RemoveOpen: false,
        });
        console.log('Deleted Item ', deleteData);
    };

    handleEditDialogOpen = (element) => () => {
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
        console.log('Edited Item ', { name, email });
    };

    handleChangesRowsPerPage = (event) => {
        this.setState({
            rowsPerPage: event.target.value,
            page: 0,
        });
    };

    componentDidMount = () => {
        const { limit, skip } = this.state;
        const { setloader, setdataLength } = this.props;
        callApi(`trainee?skip=${skip}&limit=${limit}`, 'get', {}).then((response) => {
            if (!response.data) {
                this.setState({
                    message: 'An error occured while displaying Trainee',
                });
                setloader(false);
            } else {
                this.setState({ dataObj: response.data, count: response.count  });
                console.log('--set---',response.count);
                setloader(false);
                setdataLength(response.count);
                return response.data
            }
            console.log('--> dataObj Response : ', response.data);
        });
    }


    render() {
        const { open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, editData, deleteData, loading, dataObj, count } = this.state;
        console.log('dtOBJ', dataObj);
        const { classes } = this.props;
        const { loader, dataLength } = this.props;
        
        return (
            <>
            {
                (!loader) && (
                        <div className={classes.root}>
                            <div className={classes.dialog}>
                                <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                                    ADD TRAINEELIST
                        </Button>
                            </div>
                            <AddDialog open={open} onClose={this.handleClose} />
                            <EditDialog
                                Editopen={EditOpen}
                                handleEditClose={this.handleEditClose}
                                handleEdit={this.handleEdit}
                                data={editData}
                            />
                            <DeleteDialog
                                open={RemoveOpen}
                                onClose={this.handleRemoveClose}
                                onSubmit={this.handleRemove}
                                data={deleteData}
                            />
                            <TableComponent
                                id="id"
                                data={dataObj || [[]] }
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
                                count={dataLength}
                                page={page}
                                onChangePage={this.handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onChangeRowsPerPage={this.handleChangesRowsPerPage}
                            />
                        </div>
                )
            }
            </>
        );
    }
}
TraineeList.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
    currentstate: PropTypes.func.isRequired,
    setLoading: PropTypes.bool.isRequired
};
export default withStyles(useStyles)(withLoaderAndMessage(TraineeList));