import Portal from "../portal/Portal";
import styles from '../../assets/scss/Modal.module.scss';

const Modal = ({ children, isOpen, isClose }) => {
    if (!isOpen) return null;
    return (
        <Portal>
            <div onClick={isClose} className={styles.overlay}>
                <div className={`d-flex flex-column ${styles.modal}`}>
                    <div className="my-3">
                        <button className={`bi bi-x-lg text-danger border-0 fs-4 ${styles.btn} bg-body`} onClick={isClose} />
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    );
}

export default Modal;