import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';
import { Paper, Tabs, Tab } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';

export enum Page {
    Organizations,
    Users,
    Events
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
    }
});

export const Navbar = (): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="top navbar actions" >

                <Tab icon={<BusinessIcon />} label="Organizations" />
                <Tab icon={<PersonPinIcon />} label="Users" />
                <Tab icon={<EventIcon />} label="Events" />
            </Tabs>
        </Paper>
    );
};
