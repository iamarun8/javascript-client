import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import PropTypes from 'prop-types';
import { MyContext } from '../../../../contexts/index';
import callApi from '../../../../lib/utils/api';

class DeleteDialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    handleChange = (prop) => (event) => {
        this.setState({ [prop]: event.target.value }, () => console.log(this.state));
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    onDeleteHandler = async (data, openSnackBar) => {
        const { fetcheddata } = this.props;
        this.setState({
            loading: true,
        })
        const { originalId } = data.data;
        const response = await callApi(`trainee/${originalId}`, 'delete', {});
        this.setState({ loading: false});
        if (response !== undefined) {
            this.setState({
                message: 'Trainee Deleted Successfully ',
            }, () => {
                const { message } = this.state;
                openSnackBar(message, 'success');
                fetcheddata();
            });
        } else {
            this.setState({
                message: 'Error While Deleting Trainee',
            }, () => {
                const { message } = this.state;
                openSnackBar(message, 'error');
            });
        }
    }

    render() {
        const { open, onClose, onSubmit, data } = this.props;
        const { loading } = this.state;
        return (
            <Dialog
                open={open}
                onClose={()=>this.handleClose()}
                fullWidth
            >
                <DialogTitle id="form-dialog-title">Remove Trainee</DialogTitle>
                <DialogContentText style={{ marginLeft: 25 }}>
                    Do you really want to remove the trainee?
                    <DialogActions>
                        <Button onClick={onClose} color="primary">Cancel</Button>
                        <MyContext.Consumer>
                            {({ openSnackBar }) => (
                                <Button
                                    color="primary"
                                    variant="contained"
                                    onClick={() => {
                                        this.onDeleteHandler({ data }, openSnackBar);
                                        onSubmit({ data });
                                    }}
                                > 
                                    {loading && (
                                        <CircularProgress size={15} />
                                    )}
                                    {!loading && <span>Delete</span>}
                                </Button>
                            )}
                        </MyContext.Consumer>
                    </DialogActions>
                </DialogContentText>
            </Dialog>
        );
    }
}

DeleteDialog.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,
    data: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default DeleteDialog;