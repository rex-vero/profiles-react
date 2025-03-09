import styles from '../../assets/css/MainContext.module.css';

const NotFound = () => {
    return (
        <div className="d-flex flex-column justify-content-center align-items-center">
            <i className={`bi bi-x ${styles.font} ${styles.cross}`}></i>
            <span className={styles.font}>Not Found</span>
        </div>
    );
}

export default NotFound;