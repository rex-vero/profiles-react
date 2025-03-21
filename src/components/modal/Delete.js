import axios from "axios";
import { useContext } from "react";
import DataContext from "../../contexts/DataContext";

const Delete = ({ item, setOpenModal }) => {
    const { card, setCard, setFilterData } = useContext(DataContext);
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const { status } = await axios.delete(`http://localhost:8000/profiles/${item.id}`);
            if (status === 200) {
                const newList = card.filter(prof => prof.id !== item.id);
                setCard(newList);
                setFilterData(newList);
                setOpenModal(false);
            }
        } catch ({ message }) {
            console.log(message);
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