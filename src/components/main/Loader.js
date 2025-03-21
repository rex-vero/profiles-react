import { useContext, useEffect, useState } from "react";
import DataContext from "../../contexts/DataContext";
import styles from '../../assets/scss/Loader.module.scss';

const Loader = () => {
    const [num, setNum] = useState(0);
    const { setLoad } = useContext(DataContext);
    useEffect(() => {
        let counter = 0;
        const time = setInterval(() => {
            counter++;
            counter <= 100 ? setNum(counter) : clearInterval(time);
        }, 50)
        setLoad(false);
    }, [setLoad]);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <span className={styles.load}>{num}%</span>
        </div>
    );
}

export default Loader;