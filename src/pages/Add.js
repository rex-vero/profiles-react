import { useContext, useLayoutEffect, useState } from "react";
import styles from '../assets/scss/Profile.module.scss';
import axios from "axios";
import DataContext from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import btns from '../assets/scss/Buttons.module.scss';

const Add = () => {
    const { setCard } = useContext(DataContext);
    const [profile, setProfile] = useState({
        title: '',
        text: '',
        img: ''
    })
    const navigate = useNavigate();
    const handleInput = (e) => {
        const { name, value } = e.target;
        setProfile(prv => ({ ...prv, [name]: value }))
    }
    const handleImg = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onload = () => setProfile(prv => ({ ...prv, img: data.result }));
        file && file.type.startsWith('image/') ? data.readAsDataURL(file) : console.log('img faild');
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const newProfile = {
            id: crypto.randomUUID(),
            title: profile.title,
            text: profile.text,
            img: profile.img
        }
        try {
            const { status } = await axios.post('http://localhost:8000/profiles/', JSON.stringify(newProfile), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (status === 201) {
                setCard(prev => [...prev, newProfile]);
                navigate('/');
            }
        } catch ({ message }) {
            console.log(message);
        }
    }
    useLayoutEffect(() => {
        document.title = 'Profiles - Add';
    }, []);
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
            <div className="container-fluid col-11 col-lg-9 card p-3">
                <form className="d-flex flex-column p-3" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <input type="text" value={profile.title} onChange={handleInput} required autoFocus className="form-control" id="title" name="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Description</label>
                        <input type="text" value={profile.text} onChange={handleInput} required className="form-control" name="text" id="text" />
                    </div>
                    <div className="mb-3 align-self-center">
                        <label htmlFor="img" className={`d-flex justify-content-center align-items-center ${btns.btn}`} >
                            <i className="bi bi-upload" />
                        </label>
                        <input type="file" onChange={handleImg} accept="image/*" required className="d-none" name="img" id="img" />
                    </div>
                    {profile.img && (
                        <div className="mb-3">
                            <img className={styles.size} src={profile.img} alt={profile.title} />
                        </div>
                    )}
                    <button type="submit" className={`bi bi-send-arrow-down fs-5 ${btns.submit}`} />
                </form>
            </div>
        </div>
    );
}

export default Add;