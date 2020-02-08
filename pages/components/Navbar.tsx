import styles from './Navbar.styl';

const Nabvar = (): JSX.Element => {
    return <nav className={styles.navbar}>
        <ul>
            <li>Organizations</li>
            <li>Users</li>
            <li>Events</li>
        </ul>
    </nav>
};

export default Nabvar;
