
import { NextPage } from 'next';
import { Navbar, Page } from './components/navbar';
import { Fragment, useState } from 'react';
import { TabPanel } from './components/TabPanel';
import withApollo from '../lib/withAppollo';
import { OrganizationPage } from './components/organizations';
import { Members } from './components/members';
import { Events } from './components/events';

const AdminPage: NextPage<{}> = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return <Fragment>
        <Navbar value={value} handleTabChange={handleTabChange} />
        <TabPanel value={value} index={Page.Organizations}>
            <OrganizationPage />
        </TabPanel>
        <TabPanel value={value} index={Page.Members}>
            <Members />
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