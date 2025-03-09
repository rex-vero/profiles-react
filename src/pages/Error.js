import { useLayoutEffect } from "react";
import { Link } from "react-router-dom";

const Error = () => {
    useLayoutEffect(() => {
        document.title = 'Page Not Found';
    }, []);
    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <Link to={'/'} className="fs-1 text-white">404 Not Found Click Here To Return</Link>
        </div>
    );
}

export default Error;