import { useLayoutEffect } from "react";

const Add = () => {
    useLayoutEffect(() => {
        document.title = 'Sample App - Add';
    }, []);
    return (
        <h2>add</h2>
    );
}

export default Add;