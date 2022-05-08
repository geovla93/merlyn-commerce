import { createSlice } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

const initialState = {
	hidden: true,
	cartItems: [],
	quantity: 0,
	totalAmount: 0,
};

const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		toggleCartHidden(state) {
			state.hidden = !state.hidden;
		},
		addItem(state, action) {
			const itemToAdd = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item._id === itemToAdd._id
			);

			state.quantity++;
			state.totalAmount += itemToAdd.price;

			if (!existingItem) {
				state.cartItems = [...state.cartItems, { ...itemToAdd, quantity: 1 }];
			} else {
				existingItem.quantity++;
				existingItem.totalPrice += itemToAdd.price;
			}
		},
		removeItem(state, action) {
			const itemToRemove = action.payload;
			const existingItem = state.cartItems.find(
				(item) => item._id === itemToRemove._id
			);

			state.quantity--;
			state.totalAmount -= itemToRemove.price;

			if (existingItem.quantity === 1) {
				state.cartItems = state.cartItems.filter(
					(item) => item._id !== itemToRemove._id
				);
			} else {
				existingItem.quantity--;
				existingItem.totalPrice -= existingItem.price;
			}
		},
		clearItemFromCart(state, action) {
			state.cartItems = state.cartItems.filter((cartItem) => {
				if (cartItem._id === action.payload._id) {
					state.quantity -= cartItem.quantity;
					state.totalAmount -= cartItem.quantity * cartItem.price;
				}

				return cartItem._id !== action.payload._id;
			});
		},
		clearCart(state) {
			state.cartItems = [];
			state.quantity = 0;
			state.totalAmount = 0;
		},
	},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			console.log("HYDRATE", state, action.payload);
			return {
				...state,
				...action.payload.cart,
			};
		},
	},
});

export const {
	toggleCartHidden,
	addItem,
	removeItem,
	clearItemFromCart,
	clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
