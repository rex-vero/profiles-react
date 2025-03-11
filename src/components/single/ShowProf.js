import { useLayoutEffect } from "react";
import styles from "../../assets/css/Profile.module.css"
import { Link } from "react-router-dom";

const ShowProf = ({ item }) => {
    useLayoutEffect(() => {
        document.title = `Profiles - ${item.title}`;
    }, [item.title])
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
            <div className="col-3 mt-2">
                <div className="card">
                    <img src={'/'} className="card-img-top p-1 rounded-3" alt={item.title} />
                    <div className="card-body">
                        <h5 className="card-title text-center">{item.title}</h5>
                        <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <div className='d-flex justify-content-around'>
                            <button className='w-25 border-1 btn-outline-success btn rounded-5 px-2 bi bi-pen'></button>
                            <Link to={'/'} className='w-25 border-1 btn-outline-info btn rounded-5 px-2 bi bi-arrow-90deg-left' />
                            <button className='w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi bi-trash'></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ShowProf;