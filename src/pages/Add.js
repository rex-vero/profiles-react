import { useContext, useLayoutEffect, useState } from "react";
import styles from '../assets/css/Profile.module.css';
import axios from "axios";
import DataContext from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";

const Add = () => {
    const { setCard } = useContext(DataContext);
    const [photo, setPhoto] = useState('');
    const navigate = useNavigate();
    const handleImg = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onload = () => setPhoto(data.result);
        if (file) {
            data.readAsDataURL(file);
        }
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const newProfile = {
            id: crypto.randomUUID(),
            title: data.get('title'),
            text: data.get('text'),
            img: photo
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
            <div className="container-fluid card p-3 col-6">
                <form className="d-flex flex-column p-3" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <input type="text" required autoFocus className="form-control" id="title" name="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Description</label>
                        <input type="text" required className="form-control" name="text" id="text" />
                    </div>
                    <div className="mb-3 align-self-center">
                        <label htmlFor="img" className={`form-label bi bi-upload fs-1 align-self-center ${styles.btn}`} />
                        <input type="file" onChange={handleImg} required className="form-control d-none" name="img" id="img" />
                    </div>
                    {photo && (
                        <div className="mb-3">
                            <img className={styles.size} src={photo} alt={photo} />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Add;