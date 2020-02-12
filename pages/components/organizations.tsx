import { Fragment } from 'react';
import gql from 'graphql-tag';

import { useQuery } from '@apollo/react-hooks';

interface Organization {
    id: number;
    name: string;
    enabled: boolean;
}

interface OrganizationData {
    organizations: Organization[]
}

const Get_Organizations = gql`
  {
    organizations {
        id
        name
        enabled
    }
  }
`;

export const OrganizationPage = (): JSX.Element => {
    let { loading, data } = useQuery<OrganizationData>(Get_Organizations);

    return <Fragment>
        <section className="add-new">
            <input type="text" placeholder="Organization Name" />
            <button>
                Add New
            </button>
        </section>
        <section>
            <table className="table">
                <thead>
                    <tr>
                        <th>Organization</th>
                        <th>Active</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ?
                        <tr>
                            <td colSpan={2}>Loading...</td>
                        </tr>
                        : data.organizations.map(o =>
                            <tr key={o.id}>
                                <td>{o.name}</td>
                                <td><input type="checkbox" defaultChecked={o.enabled} /></td>
                            </tr>)}
                </tbody>
            </table>
        </section>
    </Fragment>
}