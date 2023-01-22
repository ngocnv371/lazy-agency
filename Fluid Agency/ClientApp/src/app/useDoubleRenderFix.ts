import { useEffect, useState } from "react";

export const useDoubleRenderFix = () => {
    const [ready, setReady] = useState(false);
    useEffect(() => {
        const handle = setTimeout(() => {
            console.log('marked as ready')
            setReady(true);
        }, 1000)
        return () => clearTimeout(handle)
    }, [])
    return ready;
}
