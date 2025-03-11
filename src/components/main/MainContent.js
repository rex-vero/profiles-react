import { useContext, useLayoutEffect } from "react";
import Card from "./Card";
import NotFound from "./NotFound";
import DataContext from "../../contexts/DataContext";
import Spinner from "./Spinner";
import { Link } from "react-router-dom";

const MainContent = () => {
    const { spinner, card } = useContext(DataContext);
    useLayoutEffect(() => {
        document.title = 'Profiles';
    }, []);
    return (
        <main className="d-flex flex-column mt-4">
            <Link to={'/add'} className="align-self-center btn btn-outline-dark px-4 bi bi-plus fs-4"></Link>
            {spinner ? <Spinner /> :
                <div className="container-fluid mt-4">
                    <div className="row">
                        {card.length > 0 ? card.map((item) => <Card key={item.id} item={item} />) : <NotFound />}
                    </div>
                </div>}
        </main>
    );
}

export default MainContent;