import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError,
} from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { init, queryWorkOrders } from "../../data/schema";
import { WorkOrder } from "../../models/WorkOrder";
import { WorkOrdersQuery } from "../../models/WorkOrdersQuery";

export interface WorkOrdersState {
  items: WorkOrder[];
  status: "idle" | "loading" | "failed";
  error: SerializedError | null;
  query: WorkOrdersQuery;
}

const initialState: WorkOrdersState = {
  items: [],
  status: "idle",
  error: null,
  query: {
    scheduled_ms: 0,
    query: "",
  },
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fetchAsync = createAsyncThunk(
  "workOrders/fetchAsync",
  async (query: WorkOrdersQuery) => {
    console.log(`workOrders/fetchAsync`);
    await init();
    const items = await queryWorkOrders(query);
    // The value we return becomes the `fulfilled` action payload
    return items;
  }
);

export const workOrdersSlice = createSlice({
  name: "workOrders",
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setQuery(state, { payload }: PayloadAction<WorkOrdersQuery>) {
      state.query = payload
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.items = action.payload;
      })
      .addCase(fetchAsync.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error;
      });
  },
});

export const { setQuery } = workOrdersSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.workOrders.value)`
export const selectItems = (state: RootState) => state.workOrders.items;
export const selectError = (state: RootState) => state.workOrders.error;
export const selectQuery = (state: RootState) => state.workOrders.query;
export const selectStatus = (state: RootState) => state.workOrders.status;

export default workOrdersSlice.reducer;
