import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import DataContext from '../../contexts/DataContext';
import styles from '../../assets/css/Card.module.css';
import profStyle from '../../assets/css/Profile.module.css';
import axios from 'axios';

const SingleCard = ({ item, now }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);
    const [edit, setEdit] = useState(false);
    const [formData, setFormData] = useState({
        title: item.title,
        text: item.text,
        img: item.img
    });
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
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prv => ({ ...prv, [name]: value }));
    }
    const handleImg = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onload = () => setFormData(prv => ({ ...prv, img: data.result }));
        if (file) {
            data.readAsDataURL(file);
        }
    }
    const handleEdit = async (e) => {
        e.preventDefault();
        const updatedData = {
            title: formData.title,
            text: formData.text,
            img: formData.img
        }
        try {
            const { data, status } = await axios.patch(`http://localhost:8000/profiles/${item.id}`, JSON.stringify(updatedData), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (status === 200) {
                const updatedList = card.map(prof => prof.id === item.id ? { ...prof, ...data } : prof);
                setCard(updatedList);
                setFilterData(updatedList);
            }
        } catch ({ message }) {
            console.error('Error updating data:', message);
        }
    }
    return (
        <form onSubmit={handleEdit} className={`card ${styles.bg}`}>
            {edit ? (
                <div className='my-3 d-flex justify-content-center flex-column'>
                    <label htmlFor="img" className={`form-label bi bi-upload fs-1 align-self-center ${profStyle.btn}`} />
                    <input type="file" onChange={handleImg} className="form-control d-none" name="img" id="img" />
                    {formData.img && (
                        <div className="m-1">
                            <img className={profStyle.size} src={formData.img} alt={formData.img} />
                        </div>
                    )}
                </div>
            ) : (<img src={item.img} className={`card-img-top p-1 rounded-3 ${styles.cardImg}`} alt={item.title} />)}
            <div className="card-body">
                {edit ? (
                    <>
                        <input type="text" value={formData.title} onChange={handleChange} className="form-control my-2" id="title" name="title" placeholder='Name...' />
                        <input type="text" value={formData.text} onChange={handleChange} className="form-control my-2" name="text" id="text" placeholder='Description...' />
                    </>
                ) : (
                    <>
                        <h5 className="card-title text-center">{item.title}</h5>
                        <p className="card-text text-center">{item.text}</p>
                    </>
                )}
                <div className='d-flex justify-content-around'>
                    <button type={edit ? "button" : "submit"} onClick={edit ? () => setEdit(false) : () => setEdit(true)} className={`w-25 border-1 btn-outline-success btn rounded-5 px-2 bi ${edit ? 'bi-check2' : 'bi-pen'}`} />
                    <Link to={now === 'home' ? `/profiles/${item.id}` : `/`} className={`w-25 border-1 btn-outline-info ${edit && profStyle.disable} btn rounded-5 px-2 bi ${now === 'home' ? `bi-eye` : `bi-arrow-90deg-left`}`} />
                    <button onClick={edit ? () => setEdit(false) : handleDelete} className={`w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi ${edit ? 'bi-x-lg' : 'bi-trash'}`} />
                </div>
            </div>
        </form>
    );
}

export default SingleCard;