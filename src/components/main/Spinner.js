import styles from '../../assets/scss/Spinner.module.scss';

const Spinner = () => {
    return (
        <div className='d-flex justify-content-center align-items-center mt-5'>
            <div className={styles.loader} />
        </div>
    );
}

export default Spinner;