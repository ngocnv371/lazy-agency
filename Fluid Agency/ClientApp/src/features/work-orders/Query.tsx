import { IonProgressBar, IonSearchbar, IonToolbar } from "@ionic/react";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useDoubleRenderFix } from "../../app/useDoubleRenderFix";
import {
  fetchAsync,
  selectQuery,
  selectStatus,
  setQuery,
} from "./WorkOrdersSlice";

export function Query() {
  const dispatch = useAppDispatch();
  const query = useAppSelector(selectQuery);
  const status = useAppSelector(selectStatus);
  const ready = useDoubleRenderFix();

  // initial load
  useEffect(() => {
    if (!ready) {
      console.log(`Not ready to fetch yet`);
      return;
    }
    dispatch(fetchAsync(query));
  }, [query, ready]);

  const handleChange = (ev: Event) => {
    const target = ev.target as HTMLIonSearchbarElement;
    let value = "";
    if (target) {
      value = target.value!.toLowerCase();
    }
    console.log(`query changed: ${value}`);
    dispatch(setQuery({ ...query, query: value }));
  };

  return (
    <IonToolbar>
      <IonSearchbar debounce={500} onIonChange={handleChange} />
      {status === "loading" && <IonProgressBar />}
    </IonToolbar>
  );
}
