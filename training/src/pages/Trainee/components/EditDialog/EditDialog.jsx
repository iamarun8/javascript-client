import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, InputAdornment, CircularProgress } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import { MyContext } from '../../../../contexts';

const useStyles = () => ({
    button_color: {
        backgroundColor: 'blue',
        color: 'white',
    },
    button_error: {
        backgroundColor: '#bbb9b9',
    },
});

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3),
    email: yup.string().email().required('Email is required'),
});

class EditDialog extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            loading: false,
            error: {
                name: '',
                email: '',
            },
            hasError: false,
            touched: {
                name: false,
                email: false,
            },
        };
    }

    handleSet = () => {
        const { data } = this.props;
        this.setState({
            name: data.name,
            email: data.email,
        });
    };

    handleOnChange = (prop) => (event) => {
        this.setState({
            [prop]: event.target.value,
        });
    };

    getError = (field) => {
        const { error } = this.state;
        schema.validateAt(field, this.state)
            .then(() => {
                if (error[field] !== '') {
                    this.setState({
                        error: {
                            ...error,
                            [field]: '',
                        },
                    });
                }
            })
            .catch((err) => {
                if (err.message !== error[field]) {
                    this.setState({
                        error: {
                            ...error,
                            [field]: err.message,
                        },
                    });
                }
            });
        return error[field];
    };

    hasErrors = () => {
        try {
            schema.validateSync(this.state);
        } catch (err) {
            return true;
        }
        return false;
    }

    render() {
        const { Editopen, handleEditClose, data, onSubmit } = this.props;
        const { name, email, error } = this.state;
        const { originalId: id } = data;
        const { loading } = this.state;
        return (
            <div>
                <Dialog
                    open={Editopen}
                    onClose={handleEditClose}
                    onMouseEnter={this.handleSet}
                    variant="outlined"
                    color="primary"
                >
                    <DialogTitle id="form-dialog-title">Edit Trainee</DialogTitle>
                    <DialogContent>
                        <DialogContentText>Edit your trainee details</DialogContentText>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    autoFocus
                                    error={!!error.name}
                                    id="name"
                                    type="name"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    margin="dense"
                                    defaultValue={data.name}
                                    helperText={this.getError('name')}
                                    onChange={this.handleOnChange('name')}
                                    fullWidth
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <PersonIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    error={!!error.email}
                                    id="email"
                                    type="email"
                                    variant="outlined"
                                    style={{ width: '100%' }}
                                    margin="dense"
                                    defaultValue={data.email}
                                    helperText={this.getError('email')}
                                    onChange={this.handleOnChange('email')}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <EmailIcon />
                                            </InputAdornment>
                                        ),
                                    }}
                                    fullWidth
                                />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleEditClose} color="primary">Cancel</Button>
                        <MyContext.Consumer>
                            {({ openSnackBar }) => (
                                <Button
                                    onClick={() => {
                                        onSubmit({id, name, email });
                                    }}
                                    color="primary"
                                    variant="contained"
                                    disabled={ this.hasErrors() || loading}
                                >
                                    {loading && (
                                        <CircularProgress size={15} />
                                    )}
                                    {!loading && <span>Submit</span>}
                                </Button>

                            )}
                        </MyContext.Consumer>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}
EditDialog.propTypes = {
    Editopen: PropTypes.bool.isRequired,
    handleEditClose: PropTypes.func.isRequired,
    handleEdit: PropTypes.func.isRequired,
    classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
export default withStyles(useStyles)(EditDialog);
