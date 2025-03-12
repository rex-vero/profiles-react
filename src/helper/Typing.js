import { useEffect, useState } from 'react';

const Typing = ({ item, timer }) => {
    const [text, setText] = useState('');
    useEffect(() => {
        let index = -1;
        const interval = setInterval(() => {
            index++;
            setText(prev => prev + item.charAt(index));
            if (index === item.length) clearInterval(interval);
        }, timer);
        return () => clearInterval(interval);
    }, [item, timer]);
    return <>{text}</>;
};

export default Typing;