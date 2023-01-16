import { WorkOrder } from "../models/WorkOrder";

export function fetchWorkOrders(): Promise<WorkOrder[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([]);
    }, 400);
  });
}
