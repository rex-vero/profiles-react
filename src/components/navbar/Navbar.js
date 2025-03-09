import styles from '../../assets/css/Navbar.module.css';
import Search from './Search';

const Navbar = () => {
    return (
        <nav className={`navbar shadow-lg ${styles.navBg}`}>
            <div className="container-fluid d-flex justify-content-around flex-lg-row flex-column align-align-items-center">
                <span className={`my-2 my-lg-0 ${styles.text}`}>Sample App</span>
                <Search />
            </div>
        </nav>

    );
}

export default Navbar;