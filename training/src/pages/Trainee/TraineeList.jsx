import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components/AddDialog';
import { EditDialog } from './components/EditDialog';
import { DeleteDialog } from './components/DeleteDialog'
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import trainees from './data/trainee';
import { TableComponent } from '../../components/Table';
import { getDateFormatted } from '../../lib/utils/getDateFormatted';

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
        };
    }

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        const { open } = this.state;
        this.setState({ open: false });
        return open;
    };

    handleSubmit = (data) => {
        this.setState({
            open: false,
        }, () => {
            console.log(data);
        });
    }

    handleSort = (field) => () => {
        const { order } = this.state;
        this.setState({
            orderBy: field,
            order: order === 'asc' ? 'desc' : 'asc',
        });
    };

    handleSelect = (data) => {
        // console.log(data);

    }

    handleChangePage = (event, newPage) => {
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


    render() {
        const { open, order, orderBy, page, rowsPerPage, EditOpen, RemoveOpen, editData, deleteData } = this.state;
        const { classes } = this.props;
        return (
            <>
                <div className={classes.root}>
                    <div className={classes.dialog}>
                        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
                            ADD TRAINEELIST
                        </Button>
                    </div>
                    <AddDialog open={open} onClose={this.handleClose} onSubmit={this.handleSubmit} />
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
                        data={trainees}
                        column={
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
                        count={100}
                        page={page}
                        onChangePage={this.handleChangePage}
                        rowsPerPage={rowsPerPage}
                    />
                </div>
            </>
        );
    }
}
TraineeList.propTypes = {
    match: PropTypes.object.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(TraineeList);