import { NextPage } from 'next';
import { Navbar, Page } from './components/navbar';
import './organizations.styl';

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