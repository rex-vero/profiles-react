import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import DataContext from '../../contexts/DataContext';
import styles from '../../assets/scss/Card.module.scss';
import profStyle from '../../assets/scss/Profile.module.scss';
import btns from '../../assets/scss/Buttons.module.scss';
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
        file && file.type.startsWith('image/') ? data.readAsDataURL(file) : console.log('img faild');
    }
    return (
        <>
            <Modal isOpen={openModal} children={firstModal ? (<Edit item={item} formData={formData} styles={styles} />) : (<Delete item={item} />)} isClose={() => setOpenModal(false)} />
            <form onSubmit={(e) => e.preventDefault()} className={`card ${styles.bg}`}>
                {edit ? (
                    <div className='my-3 d-flex align-items-center card-body flex-column'>
                        <label htmlFor="img" className={`d-flex my-3 col-2 justify-content-center align-items-center ${btns.btn}`} >
                            <i className="bi bi-upload" />
                        </label>
                        <input type="file" accept='image/*' onChange={handleImg} required className="d-none" name="img" id="img" />
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
                            <input type="text" value={formData.title} required autoFocus onChange={handleChange} className="form-control my-2" id="title" name="title" placeholder='Name...' />
                            <input type="text" value={formData.text} required onChange={handleChange} className="form-control my-2" name="text" id="text" placeholder='Description...' />
                        </>
                    ) : (
                        <>
                            <h5 className="card-title text-center">{item.title}</h5>
                            <p className="card-text text-center">{item.text}</p>
                        </>
                    )}
                    <div className='d-flex justify-content-around'>
                        <button type={edit ? "button" : "submit"} onClick={edit ? () => { setEdit(false); setFirstModal(true); setOpenModal(true); } : () => setEdit(true)} className={`w-25 ${btns.success} rounded-5 px-2 py-1 bi ${edit ? 'bi-check2' : 'bi-pen'}`} />
                        <Link to={now === 'home' ? `/profiles/${item.id}` : `/`} className={`w-25 ${btns.info} ${edit && profStyle.disable} rounded-5 d-flex align-items-center justify-content-center px-2 py-1`} >
                            <i className={`bi ${now === 'home' ? 'bi-eye' : 'bi-arrow-90deg-left'}`} />
                        </Link>
                        <button onClick={edit ? () => setEdit(false) : () => { setOpenModal(true); setFirstModal(false); }} className={`w-25 ${btns.danger} rounded-5 px-2 py-1 bi ${edit ? 'bi-x-lg' : 'bi-trash'}`} />
                    </div>
                </div>
            </form>
        </>
    );
}

export default SingleCard;