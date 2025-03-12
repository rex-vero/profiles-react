import SingleCard from "./SingleCard";

const Card = ({ item }) => {
    return (
        <div className="col-12 col-sm-4 col-lg-3 mt-2">
            <SingleCard now={'home'} item={item} />
        </div>
    );
}

export default Card;