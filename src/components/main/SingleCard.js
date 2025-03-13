import { Link } from 'react-router-dom';
import { useContext } from 'react';
import DataContext from '../../contexts/DataContext';
import styles from '../../assets/css/Card.module.css';
import axios from 'axios';

const SingleCard = ({ item, now }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);
    const handleDelete = () => {
        const deleteData = async () => {
            try {
                const res = await axios.delete(`http://localhost:8000/profiles/${item.id}`);
                if (res.status === 200) {
                    const newList = card.filter(prof => prof.id !== item.id);
                    setCard(newList);
                    setFilterData(newList);
                }
            } catch ({ message }) {
                console.log(message);
            }
        }
        deleteData();
    }
    return (
        <div className={`card ${styles.bg}`}>
            <img src={item.img} className={`card-img-top p-1 rounded-3 ${styles.cardImg}`} alt={item.title} />
            <div className="card-body">
                <h5 className="card-title text-center">{item.title}</h5>
                <p className="card-text text-center">{item.text}</p>
                <div className='d-flex justify-content-around'>
                    <button className='w-25 border-1 btn-outline-success btn rounded-5 px-2 bi bi-pen' />
                    <Link to={now === 'home' ? `/profiles/${item.id}` : `/`} className={`w-25 border-1 btn-outline-info btn rounded-5 px-2 bi ${now === 'home' ? `bi-eye` : `bi-arrow-90deg-left`}`} />
                    <button onClick={handleDelete} className='w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi bi-trash' />
                </div>
            </div>
        </div>
    );
}

export default SingleCard;