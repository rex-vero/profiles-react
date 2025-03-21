import { useContext, useState } from 'react';
import styles from '../../assets/css/Search.module.css';
import DataContext from '../../contexts/DataContext';

const Search = () => {
    const [searchBar, setSearchBar] = useState('');
    const [show, setShow] = useState(false);
    const { card, setFilterData } = useContext(DataContext);
    let timer;
    const handleChange = e => {
        setSearchBar(e.target.value);
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (e.target.value.trim() !== '') {
                const fArray = card.filter(item => item.title.toLowerCase().includes(e.target.value.toLowerCase()));
                setFilterData(fArray);
                fArray.length === 0 ? setShow(true) : setShow(false);
            } else {
                setFilterData([]);
                setShow(false);
            }
        }, 1000);
    };
    return (
        <div className='position-relative'>
            <div className={`d-flex mt-2 mt-lg-0 ${styles.searchBar}`}>
                <button className={styles.btnSearch}>
                    <i className="bi bi-search"></i>
                </button>
                <input onChange={handleChange} className={styles.input} type="text" value={searchBar} placeholder='Write Something...' />
            </div>
            <div className={`${show ? 'd-block' : 'd-none'} position-absolute ${styles.search}`}>
                <span className='row justify-content-center text-danger'>Not Found</span>
            </div>
        </div>
    );
}

export default Search;