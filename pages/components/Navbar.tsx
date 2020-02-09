import Link from 'next/link';
import './styles.styl';

export enum Page {
    Organizations,
    Users,
    Events
}

interface Props {
    active: Page
}

const linkClassName = (props: Props, page: Page): string =>
    props.active === page ? 'active' : '';


export const Navbar = (props: Props): JSX.Element => {
    return <nav className="navbar">
        <ul>
            <li className={linkClassName(props, Page.Organizations)}>
                <Link href="/">
                    <a>Organizations</a>
                </Link>
            </li>
            <li className={linkClassName(props, Page.Users)}>
                <Link href="/">
                    <a>Users</a>
                </Link>
            </li>
            <li className={linkClassName(props, Page.Events)}>
                <Link href="/">
                    <a>Events</a>
                </Link>
            </li>
        </ul>
    </nav>
};
