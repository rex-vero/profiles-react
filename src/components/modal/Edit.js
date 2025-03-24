import axios from "axios";
import { useContext } from "react";
import DataContext from "../../contexts/DataContext";

const Edit = ({ item, setOpenModal, formData, styles, setToast, setError }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);

    const handleEdit = async () => {
        const updatedData = {
            title: formData.title,
            text: formData.text,
            img: formData.img
        }
        try {
            const { data, status } = await axios.patch(`https://testapi-profiles-react-server.glitch.me/profiles/${item.id}`, JSON.stringify(updatedData), {
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            if (status === 200) {
                const updatedList = card.map(prof => prof.id === item.id ? { ...prof, ...data } : prof);
                setCard(updatedList);
                setFilterData(updatedList);
                setToast(true);
            }
        } catch ({ message }) {
            setToast(true);
            setError({ status: true, message });
        }
    }
    return (
        <div className="d-flex flex-column align-items-center px-2">
            <span className="my-2">Do You Want To Edit??</span>
            <div className="d-flex flex-column">
                {formData.title && (<span>
                    <span className="fs-5">Title: </span>
                    {formData.title}
                </span>)}
                {formData.text && (<span>
                    <span className="fs-5">Text: </span>
                    {formData.text}
                </span>)}
                {formData.img && (<img src={formData.img} className={`card-img-top p-1 rounded-3 ${styles.cardImg}`} alt={formData.title} />)}
            </div>
            <div className="d-flex my-2 gap-4">
                <button onClick={handleEdit} className="btn btn-outline-success">Yes</button>
                <button onClick={() => setOpenModal(false)} className="btn btn-outline-danger">No</button>
            </div>
        </div>
    );
}

export default Edit;