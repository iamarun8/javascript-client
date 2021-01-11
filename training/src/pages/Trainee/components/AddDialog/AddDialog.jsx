import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, InputAdornment } from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';

const schema = yup.object().shape({
  name: yup.string().trim().required('Name is a required field').min(3),
  email: yup.string()
    .trim().email().required('Email is a required field'),
  password: yup.string()
    .required('Password is required')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/, 'Must contain 8 characters, at least one uppercase letter, one lowercase letter and one number'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password'), null], 'Must match password'),
});

const passwordStyle = () => ({
  passfield: {
    display: 'flex',
    flexdirection: 'row',
  },
  pass: {
    flex: 1,
  },
});

const config = [{
  key: 'name',
  label: 'Name',
  icon: Person,
},
{
  key: 'email',
  label: 'Email',
  icon: Email,
},
{
  key: 'password',
  label: 'Password',
  icon: VisibilityOff,
},
{
  key: 'confirmPassword',
  label: 'Confirm Password',
  icon: VisibilityOff,
},
];

class AddDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      Email: '',
      Password: '',
      ConfirmPassword: '',
      touched: {
        name: false,
        email: false,
        password: false,
        confirmPassword: false,
      },
    };
    this.baseState = this.state;
  }

  handleChange = (key) => ({ target: { value } }) => {
    this.setState({ [key]: value });
  }

  hasErrors = () => {
    try {
      schema.validateSync(this.state);
    } catch (err) {
      return true;
    }
    return false;
  }

  handleCancel = () => {
    const { onClose } = this.props;
    onClose();
    this.setState(this.baseState);
  }

  getError = (field) => {
    const { touched } = this.state;
    if (touched[field] && this.hasErrors()) {
      try {
        schema.validateSyncAt(field, this.state);
        return '';
      } catch (err) {
        return err.message;
      }
    }
  };

  isTouched = (field) => {
    const { touched } = this.state;
    this.setState({
      touched: {
        ...touched,
        [field]: true,
      },
    });
  }

  passwordType = (key) => {
    if (key === 'password' || key === 'confirmPassword') {
      return 'password';
    }
    return '';
  }

  render() {
    const {
      open, onClose, onSubmit, classes,
    } = this.props;
    const { name, email, password } = this.state;
    const ans = [];
    config.forEach((value) => {
      ans.push(
        <TextField
          label={value.label}
          onChange={this.handleChange(value.key)}
          required
          onBlur={()=> this.isTouched(value.key)}
          helperText={this.getError(value.key)}
          error={!!this.getError(value.key)}
          id="outlined-required"
          variant="outlined"
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <value.icon />
              </InputAdornment>
            ),
          }}
          type={this.passwordType(value.key)}
        />

      );
    });

    return (
      <>
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Add Trainee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter your trainee details
            </DialogContentText>
            <div>
              {ans[0]}
            </div>
            &nbsp;
            <div>
              {ans[1]}
            </div>
            &nbsp;
            <div className={classes.passfield}>
              <div className={classes.pass}>
                {ans[2]}
              </div>
              &nbsp;
              &nbsp;
              <div className={classes.pass}>
                {ans[3]}
              </div>
            </div>
        &nbsp;
            <div align="right">
              <Button onClick={this.handleCancel} color="primary">CANCEL</Button>
              <Button variant="contained" color="primary" disabled={this.hasErrors()} onClick={() => onSubmit({ name, email, password })}>SUBMIT</Button>
            </div>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}
export default withStyles(passwordStyle)(AddDialog);
AddDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

TextField.propTypes = {
  error: PropTypes.bool,
  helperText: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  label: PropTypes.string,
  type: PropTypes.string,
  icons: PropTypes.instanceOf(Object),
};
TextField.defaultProps = {
  error: false,
  helperText: '',
  label: '',
  type: false,
  icons: {},
  onBlur: ()=>{},
};