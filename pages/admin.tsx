
import { NextPage } from 'next';
import { Navbar, Page } from './components/navbar';
import { Fragment, useState } from 'react';
import { TabPanel } from './components/tabPanel';
import withApollo from '../lib/withAppollo';
import { OrgEvents } from './components/orgEvents';
import { Members } from './components/members';

const AdminPage: NextPage<{}> = () => {
    const [value, setValue] = useState(0);

    const handleTabChange = (_: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };

    return <Fragment>
        <Navbar value={value} handleTabChange={handleTabChange} />
        <TabPanel value={value} index={Page.Members}>
            <Members />
        </TabPanel>
        <TabPanel value={value} index={Page.Events}>
            <OrgEvents />
        </TabPanel>
    </Fragment>;
}

AdminPage.getInitialProps = async ({ req }) => {
    return {};
}

export default withApollo(AdminPage);