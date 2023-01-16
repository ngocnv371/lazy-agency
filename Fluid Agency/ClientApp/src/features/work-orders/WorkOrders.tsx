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
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import WorkOrderCard from "./WorkOrderCard";
import { Error } from "./Error";
import { Query } from "./Query";
import {
  fetchAsync,
  selectError,
  selectItems,
  selectStatus,
} from "./WorkOrdersSlice";

export function WorkOrders() {
  const workOrders = useAppSelector(selectItems);
  const status = useAppSelector(selectStatus);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Work Orders</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Work Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Error />
        <Query />
        {status === "loading" && (
          <div className="container">
            <IonSpinner></IonSpinner>
          </div>
        )}
        {workOrders.map((wo) => (
          <WorkOrderCard key={wo.id} {...wo} />
        ))}
      </IonContent>
    </IonPage>
  );
}
