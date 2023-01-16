import { WorkOrder, WorkOrderStatus } from "../../models/WorkOrder";
import { WorkOrdersQuery } from "../../models/WorkOrdersQuery";

const fakeWorkOrders: WorkOrder[] = [
  {
    id: 1,
    address: "12 Fake St, AL 2343",
    service: "Build a house",
    description: "Do something here",
    status: WorkOrderStatus.New,
    scheduled_ms: 0,
    modified_ms: 0,
  },
  {
    id: 2,
    address: "4 E23 St, AL 2343",
    service: "Dig a hole",
    description: "Do something here",
    status: WorkOrderStatus.InProgress,
    scheduled_ms: 0,
    modified_ms: 0,
  },
  {
    id: 3,
    address: "2 Asx St, AL 2343",
    service: "Repair sewer",
    description: "Big thing",
    status: WorkOrderStatus.Done,
    scheduled_ms: 0,
    modified_ms: 0,
  },
  {
    id: 4,
    address: "23 As4x St, AL 2343",
    service: "Cook a book",
    description:
      "Sometimes it could be very long and windy and other stuff. But actually we don't need it that much. Regardless, we still have to display it",
    status: WorkOrderStatus.Cancelled,
    scheduled_ms: 0,
    modified_ms: 0,
  },
];

export function fetchModifiedWorkOrders(since_ms: number): Promise<WorkOrder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(fakeWorkOrders);
    }, 400);
  });
}

export function updateWorkOrder(order: WorkOrder): Promise<WorkOrder> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = fakeWorkOrders.findIndex((o) => o.id === order.id);
      if (index < 0) {
        return reject("work order not found");
      }
      fakeWorkOrders[index] = Object.assign(fakeWorkOrders[index], order);
      resolve(fakeWorkOrders[index]);
    }, 400);
  });
}
