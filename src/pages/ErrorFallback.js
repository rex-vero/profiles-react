import styles from '../assets/scss/Buttons.module.scss';

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <div role="alert" className="d-flex justify-content-center align-items-center vh-100">
            <div className="bg-white rounded-3 d-flex align-items-center flex-column p-3">
                <pre className='fs-3'>{error.message}</pre>
                <button className={`p-2 rounded-3 ${styles.danger}`} onClick={resetErrorBoundary}>Reset Page</button>
            </div>
        </div>
    );
}

export default ErrorFallback;