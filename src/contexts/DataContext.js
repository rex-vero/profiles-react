import { createContext, useState } from "react";

const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
    const [load, setLoad] = useState(true);
    const [spinner, setSpinner] = useState(true);
    const [filterData, setFilterData] = useState([]);
    const [card, setCard] = useState([]);
    return <DataContext.Provider value={{ load, setLoad, spinner, setSpinner, card, setCard, filterData, setFilterData }}>{children}</DataContext.Provider>
}

export default DataContext;