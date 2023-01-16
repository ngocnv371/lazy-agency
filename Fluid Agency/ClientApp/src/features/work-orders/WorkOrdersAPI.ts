import { WorkOrder, WorkOrderStatus } from "../../models/WorkOrder";
import { WorkOrdersQuery } from "../../models/WorkOrdersQuery";

const list: WorkOrder[] = [
  {
    id: 1,
    address: "12 Fake St, AL 2343",
    service: "Build a house",
    description: "Do something here",
    status: WorkOrderStatus.New,
  },
  {
    id: 2,
    address: "4 E23 St, AL 2343",
    service: "Dig a hole",
    description: "Do something here",
    status: WorkOrderStatus.InProgress,
  },
  {
    id: 3,
    address: "2 Asx St, AL 2343",
    service: "Repair sewer",
    description: "Big thing",
    status: WorkOrderStatus.Done,
  },
  {
    id: 4,
    address: "23 As4x St, AL 2343",
    service: "Cook a book",
    description:
      "Sometimes it could be very long and windy and other stuff. But actually we don't need it that much. Regardless, we still have to display it",
    status: WorkOrderStatus.Cancelled,
  },
];

export function fetchWorkOrders(query: WorkOrdersQuery): Promise<WorkOrder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(list);
    }, 400);
  });
}

export function updateWorkOrder(order: WorkOrder): Promise<WorkOrder> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const index = list.findIndex((o) => o.id === order.id);
      if (index < 0) {
        return reject("work order not found");
      }
      list[index] = Object.assign(list[index], order);
      resolve(list[index]);
    }, 400);
  });
}
