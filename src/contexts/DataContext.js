import { createContext, useState } from "react";

const DataContext = createContext(null);
export const DataProvider = ({ children }) => {
    const [load, setLoad] = useState(true);
    const [spinner, setSpinner] = useState(true);
    const [card, setCard] = useState([
        { id: 1, title: 11 },
        { id: 2, title: 12 },
        { id: 3, title: 13 },
        { id: 4, title: 14 },
        { id: 5, title: 15 },
        { id: 6, title: 16 },
    ]);
    return <DataContext.Provider value={{ load, setLoad, spinner, setSpinner, card, setCard }}>{children}</DataContext.Provider>
}

export default DataContext;