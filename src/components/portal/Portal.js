import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(true);
        document.body.style.overflow = 'hidden';
        return () => { setMounted(false); document.body.style.overflow = 'unset'; }
    }, [])
    return mounted ? createPortal(children, document.getElementById('portal')) : null;
}

export default Portal;