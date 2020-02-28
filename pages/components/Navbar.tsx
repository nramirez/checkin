import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tabs, Tab } from '@material-ui/core';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';

export enum Page {
    Orgs,
    Members,
    Events
}

export interface NavbarProps {
    value: Page;
    handleTabChange: (event: React.ChangeEvent<{}>, newValue: number) => void;
}

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        maxWidth: 500,
        margin: 'auto'
    }
});

export const Navbar = ({ value, handleTabChange }: NavbarProps): JSX.Element => {
    const classes = useStyles();
    return (
        <Paper square className={classes.root}>
            <Tabs
                value={value}
                onChange={handleTabChange}
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="secondary"
                aria-label="top navbar actions" >

                <Tab icon={<BusinessIcon />} label="Orgs" />
                <Tab icon={<PersonPinIcon />} label="Members" />
                <Tab icon={<EventIcon />} label="Events" />
            </Tabs>
        </Paper>
    );
};
