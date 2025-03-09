import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.jpg';
const Card = ({ item }) => {
    return (
        <div className="col-12 col-sm-4 col-lg-3 mt-2">
            <div className="card">
                <Link to={`/profiles/${item.id}`}>
                    <img src={logo} className="card-img-top p-1 rounded-3" alt={item.title} />
                </Link>
                <div className="card-body">
                    <h5 className="card-title text-center">{item.title}</h5>
                    <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <p className="card-text text-center">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <div className='d-flex justify-content-around'>
                        <button className='w-25 border-1 btn-outline-success btn rounded-5 px-2 bi bi-pen'></button>
                        <button className='w-25 border-1 btn-outline-info btn rounded-5 px-2 bi bi-eye'></button>
                        <button className='w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi bi-trash'></button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;