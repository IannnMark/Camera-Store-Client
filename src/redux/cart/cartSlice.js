import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems: [],
    error: null,
    loading: false,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (cartItem) => cartItem._id === item._id
            );

            if (existingItem) {
                // If the item already exists, increase its quantity
                existingItem.quantity += 1;
            } else {
                // Add the item to cart with an initial quantity of 1
                state.cartItems.push({ ...item, quantity: 1 });
            }
        },
        removeItemFromCart: (state, action) => {
            // Remove the item from the cart based on its _id
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem._id !== action.payload
            );
        },
        increaseQty: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item) {
                item.quantity += 1;
            }
        },
        decreaseQty: (state, action) => {
            const item = state.cartItems.find((cartItem) => cartItem._id === action.payload);
            if (item && item.quantity > 1) {
                item.quantity -= 1;
            }
        },
    },
});

export const { addItemToCart, removeItemFromCart, increaseQty, decreaseQty } = cartSlice.actions;

export default cartSlice.reducer;
