import React from 'react';
import PropTypes from 'prop-types';
import {
  Button, Dialog, DialogTitle, DialogContent, DialogContentText,
} from '@material-ui/core';
import { Email, VisibilityOff, Person } from '@material-ui/icons';
import { withStyles } from '@material-ui/core/styles';
import schema from './DialogSchema';
import Handler from './CommonTextField';

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

  // eslint-disable-next-line consistent-return
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
      ans.push(<Handler
        label={value.label}
        onChange={this.handleChange(value.key)}
        onBlur={() => this.isTouched(value.key)}
        helperText={this.getError(value.key)}
        error={!!this.getError(value.key)}
        icons={value.icon}
        type={this.passwordType(value.key)}
      />);
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
              <Button onClick={onClose} color="primary">CANCEL</Button>
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
