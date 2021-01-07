import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { AddDialog } from './components/AddDialog';
import trainees from './data/trainee';
import { TableComponent } from '../../components/Table';

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
        console.log('---field is---', field);
        const { order } = this.state;
        this.setState({
            orderBy: field,
            order: order === 'asc' ? 'desc' : 'asc',
        });
    };

    handleSelect = (data) => {
        console.log('<== Select data is ==>',data);
    }

    render() {
        const { open, order, orderBy } = this.state;
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
                    &nbsp;
                    &nbsp;
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
                                    format: this.getDateForm,
                                },
                            ]
                        }
                        orderBy={orderBy}
                        order={order}
                        onSort={this.handleSort}
                        onSelect={this.handleSelect}
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