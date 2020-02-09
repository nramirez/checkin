import { NextPage } from 'next';
import './organizations.styl';
import { Navbar, Page } from './components/navbar';

interface Organization {
    id: number;
    name: string;
    enabled: boolean;
}

const organizations: Organization[] = [
    {
        id: 1,
        name: "First Organization",
        enabled: true
    },
    {
        id: 2,
        name: "Seconds Organization",
        enabled: false
    }
];

let Organization: NextPage<{}> = () => {
    return <div>
        <Navbar active={Page.Organizations} />
        <section className="add-new">
            <input type="text" placeholder="Organization Name"/>
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
                    {organizations.map(o =>
                        <tr key={o.id}>
                            <td>
                                {o.name}
                            </td>
                            <td>
                                <input type="checkbox"
                                    defaultChecked={o.enabled} />
                            </td>
                        </tr>
                    )}

                </tbody>
            </table>
        </section>
    </div>
}


export default Organization;