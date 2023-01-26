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
  IonSearchbar,
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
  selectItems,
} from "./WorkOrdersSlice";

export function WorkOrders() {
  const workOrders = useAppSelector(selectItems);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <IonTitle>Work Orders</IonTitle>
        </IonToolbar>
        <Query />
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Work Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Error />
        {workOrders.map((wo) => (
          <WorkOrderCard key={wo.id} {...wo} />
        ))}
      </IonContent>
    </IonPage>
  );
}
