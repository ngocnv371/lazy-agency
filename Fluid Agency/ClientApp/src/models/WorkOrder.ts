export enum WorkOrderStatus {
  New = 0,
  InProgress = 1,
  Done = 2,
  Cancelled = 3,
}

export interface WorkOrder {
  id: string | number;
  address: string;
  service: string;
  description: string;
  status: WorkOrderStatus;
}
