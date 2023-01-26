import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useEffect } from "react";
import { useAppDispatch } from "../../app/hooks";
import { Logs } from "./Logs";
import { syncWorkOrdersAsync } from "./SyncSlice";

export function Sync() {
  const dispatch = useAppDispatch();
  // init
  useEffect(() => {
    dispatch(syncWorkOrdersAsync());
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Sync</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Sync</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Logs />
      </IonContent>
    </IonPage>
  );
}
