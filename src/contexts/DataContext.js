import { createContext, useState } from "react";

const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
    const [load, setLoad] = useState(true);
    const [spinner, setSpinner] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const [card, setCard] = useState([
        { id: 1, title: 'a' },
        { id: 2, title: 'b' },
        { id: 3, title: 'c' },
        { id: 4, title: 'd' },
        { id: 5, title: 'f' },
        { id: 6, title: 'e' },
    ]);
    return <DataContext.Provider value={{ load, setLoad, spinner, setSpinner, card, setCard, filterData, setFilterData }}>{children}</DataContext.Provider>
}

export default DataContext;