import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : { cartItems: [] };

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const existingItem = state.cartItems.find(
                (x) => x._id === item._id
            );

            if (existingItem) {
                state.cartItems = state.cartItems.map((x) =>
                    x._id === existingItem._id ? item : x
                );
            } else {
                state.cartItems = [...state.cartItems, item];
            }

            state.itemsPrice = state.cartItems.reduce(
                (acc, item) => acc + item.price * item.quantity,
                0
            );

            state.shippingPrice = state.itemsPrice > 100 ? 0 : 10;

            state.taxPrice = state.itemsPrice * 0.15;

            state.totalPrice = (
                state.itemsPrice +
                state.shippingPrice +
                state.taxPrice
            ).toFixed(2);

            localStorage.setItem("cart", JSON.stringify(state));
        },
    },
});

export const { addToCart } = cartSlice.actions;

export default cartSlice.reducers;
