import { IonProgressBar, IonSearchbar, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { fetchAsync, selectQuery, selectStatus, setQuery } from "./WorkOrdersSlice"

export function Query() {
    const dispatch = useAppDispatch();
    const query = useAppSelector(selectQuery)
    const status = useAppSelector(selectStatus);

    // initial load
    useEffect(() => {
        dispatch(fetchAsync(query))
    }, [query])

    const handleChange = (ev: Event) => {
        const target = ev.target as HTMLIonSearchbarElement;
        let value = "";
        if (target) {
            value = target.value!.toLowerCase();
        }
        dispatch(setQuery({ ...query, query: value }))
    }

    return <IonToolbar>
        <IonSearchbar debounce={1000} onIonChange={handleChange} />
        {status === "loading" && <IonProgressBar />}
    </IonToolbar>
}