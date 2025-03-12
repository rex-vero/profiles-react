import { useParams } from "react-router-dom";
import NoProf from "../components/single/NoProf";
import ShowProf from "../components/single/ShowProf";
import { useContext } from "react";
import DataContext from "../contexts/DataContext";

const Profile = () => {
    const { id } = useParams();
    const { card } = useContext(DataContext);
    const item = card.find(prof => +prof.id === +id);
    return item ? <ShowProf item={item} /> : <NoProf />;
}

export default Profile;