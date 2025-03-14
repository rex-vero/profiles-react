import { useContext, useLayoutEffect, useState } from "react";
import styles from '../assets/css/Profile.module.css';
import { v4 as uuidv4 } from 'uuid';
import axios from "axios";
import DataContext from "../contexts/DataContext";

const Add = () => {
    const { setCard } = useContext(DataContext);
    const [photo, setPhoto] = useState('');
    const handleImg = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onload = () => setPhoto(data.result);
        if (file) {
            data.readAsDataURL(file);
        }
    }
    const handleAdd = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        const newProfile = {
            id: uuidv4(),
            title: data.get('title'),
            text: data.get('text'),
            img: photo
        }
        try {
            await axios.post('http://localhost:8000/profiles/', JSON.stringify(newProfile), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            setCard(prev => [...prev, newProfile]);
        } catch (err) {
            console.log(err);
        }
    }
    useLayoutEffect(() => {
        document.title = 'Profiles - Add';
    }, []);
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
            <div className="container-fluid card p-3 col-6">
                <form className="row align-items-center p-3" onSubmit={handleAdd}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Name</label>
                        <input type="text" className="form-control" id="title" name="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="text" className="form-label">Description</label>
                        <input type="text" className="form-control" name="text" id="text" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="img" className="form-label">Image</label>
                        <input type="file" onChange={handleImg} className="form-control" name="img" id="img" />
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