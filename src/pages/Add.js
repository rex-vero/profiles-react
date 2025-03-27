import { useContext, useEffect, useLayoutEffect, useState } from "react";
import styles from '../assets/scss/Profile.module.scss';
import axios from "axios";
import DataContext from "../contexts/DataContext";
import { useNavigate } from "react-router-dom";
import btns from '../assets/scss/Buttons.module.scss';
import { useForm } from "react-hook-form";
import Toast from "../components/toast/Toast";

const Add = () => {
    const { setCard } = useContext(DataContext);
    const { register, formState: { errors, isSubmitting }, handleSubmit, getValues, setError, setValue } = useForm();
    const [photo, setPhoto] = useState(null);
    const [toast, setToast] = useState(false);
    const [changePage, setChangePage] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const navigate = useNavigate();
    const handleImg = (e) => {
        const file = e.target.files[0];
        const data = new FileReader();
        data.onloadend = () => {
            setPhoto(data.result);
            setValue('base64', data.result);
        }
        (file && file.type.startsWith('image/')) ? data.readAsDataURL(file) : setError('img', { message: 'Image Is Invalid' });
    }
    const handleAdd = async (data) => {
        const newProfile = {
            id: crypto.randomUUID(),
            title: data.title,
            text: data.text,
            img: data.base64
        }
        try {
            const { status } = await axios.post('https://testapi-profiles-react-server.glitch.me/profiles/', JSON.stringify(newProfile), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                onUploadProgress: progressEvent => {
                    const total = progressEvent.total;
                    const loaded = progressEvent.loaded;
                    const percentCompleted = Math.round((loaded * 100) / total);
                    setUploadProgress(percentCompleted);
                }
            });
            if (status === 201) {
                setCard(prev => [...prev, newProfile]);
                setChangePage(true);
                setToast(true);
            }
        } catch ({ message }) {
            setError('root', { message });
            setChangePage(false);
            setToast(true);
        }
    }
    useEffect(() => {
        changePage && setTimeout(() => {
            navigate('/');
        }, 3500);
    }, [changePage, navigate])
    useLayoutEffect(() => {
        document.title = 'Profiles - Add';
    }, []);
    return (
        <>
            {toast && <Toast text={!changePage ? errors.root?.message : `Profile ${getValues('title')} Added`} timer={3000} onClose={() => setToast(false)} type={!changePage ? 'error' : 'success'} />}
            <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
                <div className="container-fluid col-11 col-lg-9 card p-3">
                    <form className="d-flex flex-column p-3" onSubmit={handleSubmit(handleAdd)}>
                        <div className="mb-3">
                            <label htmlFor="title" className={`form-label ${errors.title && 'text-danger text-decoration-underline'}`}>{errors.title ? errors.title.message : 'Title'}</label>
                            <input type="text" {...register('title', { required: 'Title Is Required', pattern: { value: /^[^\d!@#$%^&*()_+={}\]:;"'<>,.?\\|`~]+$/, message: 'Title Only Accept String' } })} autoFocus className={`form-control ${errors.title && styles.input}`} id="title" name="title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="text" className={`form-label ${errors.text && 'text-danger text-decoration-underline'}`}>{errors.text ? errors.text.message : 'Description'}</label>
                            <input type="text" {...register('text', { required: 'Description Is Required' })} className={`form-control ${errors.text && styles.input}`} name="text" id="text" />
                        </div>
                        <div className="mb-3 align-self-center">
                            <label htmlFor="img" className={`d-flex justify-content-center align-items-center bi bi-upload ${btns.btn} ${errors.img && `${styles.pointer} ${btns.img}`}`} />
                            <input type="file" {...register('img', { required: true, onChange: handleImg })} accept="image/*" className="d-none" name="img" id="img" />
                        </div>
                        {photo && (
                            <>
                                <div className="mb-3">
                                    <img className={styles.size} src={photo} alt={getValues('title')} />
                                </div>
                                {isSubmitting && (
                                    <div className="mb-3 d-flex align-items-center flex-column">
                                        <div className={styles.bar} style={{ width: `${uploadProgress}%` }} />
                                        <span>{`${uploadProgress}%`}</span>
                                    </div>
                                )}
                            </>
                        )}
                        <button type="submit" disabled={changePage || isSubmitting} className={`bi ${(errors.root && 'btn btn-outline-danger') || (isSubmitting ? 'bi-arrow-clockwise' : (changePage ? 'bi-check-circle btn btn-success' : 'bi-send-arrow-down'))} fs-5 ${!errors.root && btns.submit}`} >{errors.root && errors.root.message}</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Add;