import axios from "axios";
import { useContext } from "react";
import DataContext from "../../contexts/DataContext";

const Delete = ({ item, setOpenModal, setToast, setError }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axios.delete(`http://localhost:8000/profiles/${item.id}`);
            if (status === 200) {
                setError({ status: false });
                const newList = card.filter(prof => prof.id !== item.id);
                setCard(newList);
                setFilterData(newList);
                setToast(true);
                setOpenModal(false);
            }
        } catch ({ message }) {
            setToast(true);
            setError({ status: true, message });
        }
    }
    return (
        <div className="d-flex flex-column align-items-center px-2">
            <span className="my-2">Do You Want To Delete {item.title}?!</span>
            <div className="d-flex my-2 gap-4">
                <button onClick={handleDelete} className="btn btn-outline-success">Yes</button>
                <button onClick={() => setOpenModal(false)} className="btn btn-outline-danger">No</button>
            </div>
        </div>
    );
}

export default Delete;