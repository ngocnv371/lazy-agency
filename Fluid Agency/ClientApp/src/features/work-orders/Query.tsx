import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchAsync, selectQuery } from "./WorkOrdersSlice"

export function Query() {
    const dispatch = useAppDispatch();
    const filters = useAppSelector(selectQuery)

    // initial load
    useEffect(() => {
        dispatch(fetchAsync(filters))
    }, [])
    
    return <div></div>
}