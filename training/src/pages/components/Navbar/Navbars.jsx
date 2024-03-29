import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        marginBlockEnd: 10,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

export default function Navbar() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Trainee Portal
                </Typography>
                    <Button color="inherit">Trainee</Button>
                    <Button color="inherit">TextfieldDemo</Button>
                    <Button color="inherit">InputDemo</Button>
                    <Button color="inherit">ChildrenDemo</Button>
                    <Button color="inherit">LogOut</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
}
