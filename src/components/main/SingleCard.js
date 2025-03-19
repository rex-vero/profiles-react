import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import DataContext from '../../contexts/DataContext';
import styles from '../../assets/css/Card.module.css';
import profStyle from '../../assets/css/Profile.module.css';
import Modal from '../modal/Modal';
import Delete from '../modal/Delete';
import Edit from '../modal/Edit';

const SingleCard = ({ item, now }) => {
    const { openModal, setOpenModal } = useContext(DataContext);
    const [edit, setEdit] = useState(false);
    const [firstModal, setFirstModal] = useState(false);
    const [formData, setFormData] = useState({
        title: item.title,
        text: item.text,
        img: item.img
    });
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
    return (
        <>
            <Modal isOpen={openModal} children={firstModal ? (<Edit item={item} formData={formData} styles={styles} />) : (<Delete item={item} />)} isClose={() => setOpenModal(false)} />
            <form onSubmit={(e) => { e.preventDefault(); }} className={`card ${styles.bg}`}>
                {edit ? (
                    <div className='my-3 d-flex justify-content-center flex-column'>
                        <label htmlFor="img" className={`form-label bi bi-upload fs-1 align-self-center ${profStyle.btn}`} />
                        <input type="file" onChange={handleImg} className="form-control d-none" name="img" id="img" />
                        {formData.img && (
                            <div className="m-1">
                                <img className={profStyle.size} src={formData.img} alt={formData.title} />
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
                        <button type={edit ? "button" : "submit"} onClick={edit ? () => { setEdit(false); setFirstModal(true); setOpenModal(true); } : () => setEdit(true)} className={`w-25 border-1 btn-outline-success btn rounded-5 px-2 bi ${edit ? 'bi-check2' : 'bi-pen'}`} />
                        <Link to={now === 'home' ? `/profiles/${item.id}` : `/`} className={`w-25 border-1 btn-outline-info ${edit && profStyle.disable} btn rounded-5 px-2 bi ${now === 'home' ? `bi-eye` : `bi-arrow-90deg-left`}`} />
                        <button onClick={edit ? () => setEdit(false) : () => { setOpenModal(true); setFirstModal(false); }} className={`w-25 border-1 btn-outline-danger btn rounded-5 px-2 bi ${edit ? 'bi-x-lg' : 'bi-trash'}`} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default SingleCard;