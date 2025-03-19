import { Link, useLocation } from 'react-router-dom';
import styles from '../../assets/css/Navbar.module.css';
import Search from './Search';
import Typing from '../../helper/Typing';
import Clock from '../../helper/Clock';


const Navbar = () => {
    const location = useLocation();
    return (
        <nav className={`navbar shadow-lg ${styles.navBg}`}>
            <div className="container-fluid d-flex justify-content-around flex-lg-row flex-column align-align-items-center">
                <Link to={'/'} className={`my-2 my-lg-0 text-decoration-none ${styles.text}`}>
                    <Typing item={'Profiles'} timer={100} />
                </Link>
                <Clock />
                {location.pathname === '/' && <Search />}
            </div>
        </nav>
    );
}

export default Navbar;