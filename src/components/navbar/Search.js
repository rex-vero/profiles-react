import { useState } from 'react';
import styles from '../../assets/css/Search.module.css';

const Search = () => {
    const [searchBar, setSearchBar] = useState('');
    const handleChange = (e) => {
        setSearchBar(e.target.value)
        if (e.target.value.trim() !== '') {
            console.log(searchBar);
        }
    };
    return (
        <div className='position-relative'>
            <div className={`d-flex mt-2 mt-lg-0 ${styles.searchBar}`}>
                <button className={styles.btnSearch}>
                    <i className="bi bi-search"></i>
                </button>
                <input onChange={handleChange} className={styles.input} type="text" value={searchBar} placeholder='Write Something...' />
            </div>
            <div className={`position-absolute ${styles.search}`}>
                lorem   ewkjhfbwef
            </div>
        </div>
    );
}

export default Search;