import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import { TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, InputAdornment } from '@material-ui/core';
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

class EditDialog extends React.Component {
    schema = yup.object().shape({
        name: yup.string().required('Name is required').min(3),
        email: yup.string().email().required('Email is required'),
    });

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            error: {
                name: '',
                email: '',
            },
            hasErrors: false,
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
        this.schema
            .validateAt(field, this.state)
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
        const { error } = this.state;
        let iserror = Object.values(error);
        iserror = iserror.filter((errorMessage) => errorMessage !== '');
        return !!iserror.length;
    };

    render() {
        const { Editopen, handleEditClose, handleEdit, data, classes } = this.props;
        const { name, email, error } = this.state;
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
                                    type="text"
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
                                    onClick={() => handleEdit(name, email)}
                                    onClick={() => {
                                        handleEdit(name, email);
                                        openSnackBar('This is a successfully updated message !', 'success');
                                    }}
                                    className={(name === data.name && email === data.email) || this.hasErrors() ? classes.button_error : classes.button_color}
                                    color="primary"
                                    variant="contained"
                                    disabled={!!((name === data.name && email === data.email) || this.hasErrors())}
                                >
                                    Submit
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


// import React, { Component } from 'react';
// import {
//     TextField, Button, Dialog, DialogTitle,
//     DialogActions, DialogContentText, DialogContent,
// } from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
// import EmailIcon from '@material-ui/icons/Email';
// import { withStyles } from '@material-ui/core/styles';
// import PropTypes from 'prop-types';
// import * as yup from 'yup';
// import { MyContext } from '../../../../contexts';

// const schema = yup.object().shape({
//     name: yup.string().required('Name is required field'),
//     email: yup.string().required('Email Address is required field').matches(/^[A-Za-z.0-9]{3,}@[A-Za-z]{5,10}[.]{1,1}[A-Za-z]{3,4}$/, 'Email Address must be valid field'),
// });

// const useStyles = () => ({
//     root: {
//         flexGrow: 1,
//     },
//     input: {
//         paddingRight: 5,
//     },
// });

// class EditDialog extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             name: '',
//             email: '',
//             error: {
//                 name: '',
//                 email: '',
//             },
//             hasError: false,
//             touched: {
//                 name: false,
//                 email: false,
//             },
//         };
//     }

//     handleBlur = (field) => {
//         const { touched } = this.state;
//         touched[field] = true;
//         this.setState({ touched }, () => this.handleValidate());
//     }

//     handleChange = (prop) => (event) => {
//         this.setState({ [prop]: event.target.value });
//     };

//     hasErrors = () => {
//         const { hasError } = this.state;
//         schema.isValid(this.state)
//             .then((valid) => {
//                 if (!valid !== hasError) {
//                     this.setState({ hasError: !valid });
//                 }
//             });
//     }

//     isTouched = (field) => {
//         const { touched } = this.state;
//         this.setState({
//             touched: {
//                 ...touched,
//                 [field]: true,
//             },
//         });
//     }

//     getError = (field) => {
//         const { error, touched } = this.state;
//         if (touched[field]) {
//             schema.validateAt(field, this.state).then(() => {
//                 if (error[field] !== '') {
//                     this.setState({
//                         error: {
//                             ...error,
//                             [field]: '',
//                         },
//                     });
//                 }
//             }).catch((err) => {
//                 if (err.message !== error[field]) {
//                     this.setState({
//                         error: {
//                             ...error,
//                             [field]: err.message,
//                         },
//                     });
//                 }
//             });
//         }
//         return error[field];
//     }

//     render() {
//         const {
//             classes, open, onClose, onSubmit, data,
//         } = this.props;
//         const { hasError, error } = this.state;
//         this.hasErrors();
//         return (
//             <Dialog
//                 open={open}
//                 onClose={onClose}
//                 fullWidth
//                 maxWidth="md"
//             >
//                 <DialogTitle id="simple-dialog-title">Edit Trainee</DialogTitle>
//                 <DialogContent className={classes.root}>
//                     <DialogContentText className={classes.Details}>
//                         Enter your trainee details
//           </DialogContentText>
//                     <TextField
//                         label="Name *"
//                         type="text"
//                         autoComplete="off"
//                         fullWidth
//                         defaultValue={data.name}
//                         error={error.name}
//                         helperText={this.getError('name')}
//                         onBlur={() => this.isTouched('name')}
//                         onChange={this.handleChange('name')}
//                         placeholder=""
//                         margin="normal"
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         InputProps={{
//                             startAdornment: (
//                                 <PersonIcon className={classes.input} />
//                             ),
//                         }}
//                         variant="outlined"
//                     />
//                     <TextField
//                         label="Email Address"
//                         type="text"
//                         autoComplete="off"
//                         fullWidth
//                         defaultValue={data.email}
//                         error={error.name}
//                         helperText={this.getError('email')}
//                         onBlur={() => this.isTouched('email')}
//                         onChange={this.handleChange('email')}
//                         placeholder=""
//                         margin="normal"
//                         InputLabelProps={{
//                             shrink: true,
//                         }}
//                         InputProps={{
//                             startAdornment: (
//                                 <EmailIcon className={classes.input} />
//                             ),
//                         }}
//                         variant="outlined"
//                     />
//                 </DialogContent>
//                 <DialogActions>
//                     <Button onClick={onClose} color="primary">
//                         Cancel
//                     </Button>
//                     <MyContext.Consumer>
//                         {({ openSnackBar }) => (
//                             <Button
//                                 onClick={() => {
//                                     onSubmit({ data });
//                                     openSnackBar('Trainee Details Updated successfully! ', 'success');
//                                 }}
//                                 disabled={hasError}
//                                 color="primary"
//                                 variant="contained"
//                             >
//                                 Submit
//                             </Button>
//                         )}
//                     </MyContext.Consumer>
//                 </DialogActions>
//             </Dialog>
//         );
//     }
// }
// EditDialog.propTypes = {
//     classes: PropTypes.objectOf(PropTypes.string).isRequired,
//     open: PropTypes.bool.isRequired,
//     onClose: PropTypes.func.isRequired,
//     onSubmit: PropTypes.func.isRequired,
//     data: PropTypes.objectOf(PropTypes.string).isRequired,
// };
// export default withStyles(useStyles)(EditDialog);