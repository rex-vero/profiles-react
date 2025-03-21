import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";
import styles from "../../assets/scss/Profile.module.scss"

const NoProf = () => {
    useLayoutEffect(() => {
        document.title = 'Profile Not Found';
    }, []);
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
            <Link to={'/'} className="fs-1 text-white">No Profile here, Click To Back</Link>
        </div>
    );
}

export default NoProf;