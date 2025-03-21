import { useLayoutEffect } from "react";
import styles from "../../assets/scss/Profile.module.scss"
import SingleCard from "../main/SingleCard";

const ShowProf = ({ item }) => {
    useLayoutEffect(() => {
        document.title = `Profiles - ${item.title}`;
    }, [item.title])
    return (
        <div className={`d-flex justify-content-center align-items-center ${styles.vh90}`}>
            <div className="m-2">
                <SingleCard now={'prof'} item={item} />
            </div>
        </div>
    );
}

export default ShowProf;