import { createContext, useState } from "react";

const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
    const [load, setLoad] = useState(true);
    const [spinner, setSpinner] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [filterData, setFilterData] = useState([]);
    const [card, setCard] = useState([]);
    const [net, setNet] = useState('');
    return <DataContext.Provider value={{ load, setLoad, openModal, setOpenModal, spinner, net, setNet, setSpinner, card, setCard, filterData, setFilterData }}>{children}</DataContext.Provider>
}

export default DataContext;