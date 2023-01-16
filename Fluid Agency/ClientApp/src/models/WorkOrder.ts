export enum WorkOrderStatus {
  New = 0,
  InProgress = 1,
  Done = 2,
  Cancelled = 3,
}

export interface WorkOrder {
  id: number;
  service: string;
  status: WorkOrderStatus;
  address: string;
  description: string;
  scheduled_ms: number;
  modified_ms: number;
}
