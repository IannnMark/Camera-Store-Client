import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orders: [],
    error: null,
    loading: false,
    orderSuccess: false,
};

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {

        orderCreateRequest: (state) => {
            state.loading = true;
        },
        orderCreateSuccess: (state, action) => {
            state.loading = false;
            state.orders.push(action.payload);
            state.orderSuccess = true;
        },
        orderCreateFail: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        clearErrors: (state) => {
            state.error = null;
        },
        resetOrderStatus: (state) => {
            state.orderSuccess = false;
        },
    },
});

export const {
    orderCreateRequest,
    orderCreateSuccess,
    orderCreateFail,
    clearErrors,
    resetOrderStatus,
} = orderSlice.actions;

export default orderSlice.reducer;
