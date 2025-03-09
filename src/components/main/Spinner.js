import { useContext, useEffect } from "react";
import DataContext from "../../contexts/DataContext";

const Spinner = () => {
    const { setSpinner } = useContext(DataContext);
    useEffect(() => {
        setSpinner(false);
    }, [])
    return (
        <div className="d-flex justify-content-center align-items-center mt-5">
            <div className="spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    );
}

export default Spinner;