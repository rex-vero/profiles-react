import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import DataContext from '../../contexts/DataContext';
import styles from '../../assets/css/Card.module.css';
import axios from 'axios';

const SingleCard = ({ item, now }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);
    const [edit, setEdit] = useState(false);
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axios.delete(`http://localhost:8000/profiles/${item.id}`);
            if (status === 200) {
                const newList = card.filter(prof => prof.id !== item.id);
                setCard(newList);
                setFilterData(newList);
            }
        } catch ({ message }) {
            console.log(message);
        }
    }
    const changeEdit = (e) => {
        e.preventDefault();
        setEdit(false);
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const updatedData = {
            title: data.get('title'),
            text: data.get('text'),
        }
        console.log(updatedData);

        try {
            const { data, status } = await axios.put(`http://localhost:8000/profiles/${item.id}`, JSON.stringify(updatedData), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (status === 200) {
                const updatedList = card.map(prof => prof.id === item.id ? { ...prof, ...data } : prof);
                setCard(updatedList);
                setFilterData(updatedList);
                console.log('Data updated successfully:', updatedList);
            }
        } catch ({ message }) {
            console.error('Error updating data:', message);
        }
    }
    return (
        <form onSubmit={handleEdit} className={`card ${styles.bg}`}>
            <img src={item.img} className={`card-img-top p-1 rounded-3 ${styles.cardImg}`} alt={item.title} />
            <div className="card-body">
                {edit ? <input type="text" className="form-control my-2" id="title" name="title" placeholder='Name...' /> : <h5 className="card-title text-center">{item.title}</h5>}
                {edit ? <input type="text" className="form-control my-2" name="text" id="text" placeholder='Description...' /> : <p className="card-text text-center">{item.text}</p>}
                <div className='d-flex justify-content-around'>
                    <button type={edit ? "submit" : "button"} onClick={edit ? changeEdit : () => setEdit(true)} className={`w-25 border-1 btn-outline-success btn rounded-5 px-2 bi ${edit ? 'bi-check2' : 'bi-pen'}`} />
                    <Link to={now === 'home' ? `/profiles/${item.id}` : `/`} className={`w-25 border-1 btn-outline-info btn rounded-5 px-2 bi ${now === 'home' ? `bi-eye` : `bi-arrow-90deg-left`}`} />
                    <button onClick={edit ? changeEdit : handleDelete} className={`w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi ${edit ? 'bi-x-lg' : 'bi-trash'}`} />
                </div>
            </div>
        </form>
    );
}

export default SingleCard;