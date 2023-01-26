import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
} from "@ionic/react";
import { useAppSelector } from "../../app/hooks";
import { selectError } from "./WorkOrdersSlice";

export function Error() {
  const error = useAppSelector(selectError);
  return (
    error && (
      <IonCard color="danger">
        <IonCardHeader>
          <IonCardTitle>Error {error.code}</IonCardTitle>
        </IonCardHeader>
        <IonCardContent>{error.message}</IonCardContent>
      </IonCard>
    )
  );
}
