import css from './Navbar.styl';
import Link from 'next/link';

const Nabvar = (): JSX.Element => {
    return <nav className={css.navbar}>
        <ul>
            <li>
                <Link href="/">
                    <a>Organizations</a>
                </Link>

            </li>
            <li>
                <Link href="/">
                    <a>Users</a>
                </Link>
            </li>
            <li>
                <Link href="/">
                    <a>Events                       </a>
                </Link>
            </li>
        </ul>
    </nav>
};

export default Nabvar;
