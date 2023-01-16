import {
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonText,
} from "@ionic/react";
import { WorkOrder, WorkOrderStatus } from "../../models/WorkOrder";

function getStatusColor(status: WorkOrderStatus): string {
  switch (status) {
    case WorkOrderStatus.New:
      return "primary";
    case WorkOrderStatus.InProgress:
      return "primary";
    case WorkOrderStatus.Done:
      return "success";
    case WorkOrderStatus.Cancelled:
      return "warning";
  }
}

function getStatusText(status: WorkOrderStatus): string {
  switch (status) {
    case WorkOrderStatus.New:
      return "New";
    case WorkOrderStatus.InProgress:
      return "In Progress";
    case WorkOrderStatus.Done:
      return "Done";
    case WorkOrderStatus.Cancelled:
      return "Cancelled";
  }
}

const WorkOrderCard = (wo: WorkOrder): JSX.Element => {
  return (
    <IonCard key={wo.id}>
      <IonCardHeader>
        <IonCardTitle>
          #{wo.id} {wo.service}
        </IonCardTitle>
        <IonCardSubtitle>{wo.address}</IonCardSubtitle>
      </IonCardHeader>
      <IonCardContent>{wo.description}</IonCardContent>
      <IonButton fill="clear" color={getStatusColor(wo.status)}>
        {getStatusText(wo.status)}
      </IonButton>
      {wo.status === WorkOrderStatus.New && (
        <IonButton fill="clear">3:00 PM</IonButton>
      )}
    </IonCard>
  );
};

export default WorkOrderCard;
