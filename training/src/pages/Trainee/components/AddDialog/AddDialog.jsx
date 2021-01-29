import React from 'react';
import PropTypes from 'prop-types';
import { Button, Dialog, DialogTitle, DialogContent, DialogContentText, TextField, InputAdornment, DialogActions, CircularProgress } from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import * as yup from 'yup';
import localStorage from 'local-storage';
import { MyContext } from '../../../../contexts'
import callApi from '../../../../lib/utils/api';

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
      loading: false,
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

  onClickHandler = async (data, openSnackBar) => {
    console.log('----data inside add dialog---',data);
    const { onClose } = this.props
      this.setState({
        loading: true,
        hasError: true,
      });
      const {name, email, password, confirmPassword} = data;
      const response = await callApi('trainee', 'post', {name,email, password, confirmPassword, role: 'trainee'});
      this.setState({ loading: false });
      if (!response.err) {
        this.setState({
          hasError: false,
          message: 'This is a successfully added trainee message',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'success');
        });
      } else {
        this.setState({
          hasError: false,
          message: 'error in submitting',
        }, () => {
          const { message } = this.state;
          openSnackBar(message, 'error');
        });
      }
      onClose();
    }

  formReset = () => {
    this.setState({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      touched: {},
    });
  }


  render() {
    const {
      open, onClose, classes, 
    } = this.props;
    const { name, email, password, confirmPassword, loading } = this.state;
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
          </DialogContent>
          <DialogActions>
            <div align='right'>
              <Button onClick={onClose} color="primary">CANCEL</Button>
              <MyContext.Consumer>
                {({ openSnackBar }) => (
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => {
                      this.onClickHandler({
                        name, email, password, confirmPassword
                      }, openSnackBar);
                      this.formReset();
                    }}
                    disabled={this.hasErrors() || loading}
                  >
                    {loading && (
                      <CircularProgress size={15} />
                    )}
                    {!loading && <span>Submit</span>}
                  </Button>
                )}
              </MyContext.Consumer>
            </div>
          </DialogActions>
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