import { useContext, useEffect, useLayoutEffect } from "react";
import Card from "./Card";
import NotFound from "./NotFound";
import DataContext from "../../contexts/DataContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from '../../assets/scss/MainContent.module.scss';

const MainContent = () => {
    const { spinner, card, setNet, setCard, setSpinner, filterData } = useContext(DataContext);
    useLayoutEffect(() => {
        document.title = 'Profiles';
    }, []);
    useEffect(() => {
        const fetchData = async () => {
            setSpinner(true);
            try {
                const { data } = await axios.get('http://localhost:8000/profiles');
                setCard(data);
                setSpinner(false);

            } catch ({ message }) {
                setNet(message);
                setSpinner(false);
            }
        }
        fetchData();
    }, [setCard, setSpinner, setNet])
    return (
        <main className="d-flex flex-column mt-4">
            <Link to={'/add'} className={`align-self-center ${styles.plus} bi bi-plus fs-4`} />
            {spinner ? <Spinner /> :
                (<div className="container-fluid mt-4">
                    <div className="row">
                        {(card.length > 0 && (filterData.length > 0 ? filterData : card).map((item, key) => <Card key={key} item={item} />)) || <NotFound />}
                    </div>
                </div>)}
        </main>
    );
}

export default MainContent;