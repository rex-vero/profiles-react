import Portal from "../portal/Portal";
import styles from '../../assets/scss/Toast.module.scss';
import { useEffect, useState } from "react";

const Toast = ({ text, onClose, timer, type }) => {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        setVisible(true);
        const timeout = setTimeout(() => {
            setVisible(false);
            setTimeout(onClose, 500);
        }, timer);
        return () => clearTimeout(timeout);
    }, [timer, onClose])
    let toastType;
    let icon;
    switch (type) {
        case 'success':
            {
                icon = 'bi-check2-all';
                toastType = styles.success;
                break;
            }
        case 'error':
            {
                icon = 'bi-x-lg';
                toastType = styles.error;
                break;
            }
        default:
            {
                icon = 'bi-bell';
                toastType = styles.default;
                break;
            }
    }
    return (
        <Portal>
            <div className={`${toastType} ${styles.toast} ${visible && styles.show}`}>
                <div className="d-flex align-items-center gap-2 mx-4 my-1">
                    <i className={`bi ${styles.icon} px-1 me-2 fs-5 ${icon}`} />
                    <span className="fs-6">{text}</span>
                </div>
            </div>
        </Portal>
    );
}

export default Toast;