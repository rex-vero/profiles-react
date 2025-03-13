import { useContext } from 'react';
import styles from '../../assets/css/MainContext.module.css';
import DataContext from '../../contexts/DataContext';

const NotFound = () => {
    const { net } = useContext(DataContext);
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <i className={`bi bi-x ${styles.font} ${styles.cross}`}></i>
            <span className={`text-center ${styles.font}`}>{net ? net : 'No Profile Here Yet'}</span>
        </div>
    );
}

export default NotFound;