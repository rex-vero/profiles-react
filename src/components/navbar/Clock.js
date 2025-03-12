import { useEffect, useState } from "react";

const Clock = () => {
    const [time, setTime] = useState(new Date());
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);
        return () => clearInterval(timer)
    }, [])
    return <span className="fs-3">{time.toLocaleTimeString()}</span>
}

export default Clock;