import { configureStore, ThunkAction, Action, ThunkDispatch } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import workOrdersReducer from '../features/work-orders/WorkOrdersSlice';
import syncReducer from '../features/sync/SyncSlice';

export const store = configureStore({
  reducer: {
    sync: syncReducer,
    workOrders: workOrdersReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
