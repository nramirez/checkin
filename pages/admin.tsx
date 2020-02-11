
import { NextPage } from 'next';
import fetch from 'isomorphic-unfetch';
import { Navbar, Page} from './components/navbar';

interface Props {
    starts: number;
    userAgent?: string;
}

const AdminPage: NextPage<Props> = ({ userAgent, starts }) =>
    <div>
        <Navbar />
        <section >
            <h1> Hermoso Demo! It updates when I save :hearts: </h1>
            Your user agent: {userAgent}  <br />
            Next stars: {starts}
        </section>
        <footer>
            Something is not working as you expect https://github.com/nramirez/checkin
        </footer>

    </div>;

AdminPage.getInitialProps = async ({ req }) => {
    const userAgent = req ? req.headers['user-agent'] : navigator.userAgent;
    const res = await fetch('https://api.github.com/repos/zeit/next.js');

    const json = await res.json();
    return {
        starts: json.stargazers_count,
        userAgent: userAgent
    };
}


export default AdminPage;