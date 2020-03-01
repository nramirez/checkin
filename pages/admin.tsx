
import { NextPage } from 'next';
import { Navbar, Page } from './components/navbar';
import { Fragment, useState, Suspense } from 'react';
import { TabPanel } from './components/TabPanel';
import withApollo from '../lib/withAppollo';
import { Events } from './components/events';
import { Users } from './components/users';

const AdminPage: NextPage<{}> = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return <Fragment>
        <Navbar value={value} handleTabChange={handleTabChange} />
        <TabPanel value={value} index={Page.Members}>
            <Users />
        </TabPanel>
        <TabPanel value={value} index={Page.Events}>
            <Events />
        </TabPanel>
    </Fragment>;
}

AdminPage.getInitialProps = async ({ req }) => {
    return {};
}

export default withApollo(AdminPage);