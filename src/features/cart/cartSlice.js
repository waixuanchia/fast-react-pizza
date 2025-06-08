import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      state.cart.push(action.payload);
    },
    deleteItem(state, action) {
      state.cart = state.cart.filter(
        (pizza) => pizza.pizzaId !== action.payload
      );
    },
    increaseItemQuantity(state, action) {
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);
      if (pizza != null) {
        pizza.quantity = pizza.quantity + 1;
        pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      }
    },
    decreaseItemQuantity(state, action) {
      const pizza = state.cart.find((item) => item.pizzaId === action.payload);
      if (pizza != null) {
        pizza.quantity = pizza.quantity - 1;
        pizza.totalPrice = pizza.quantity * pizza.unitPrice;
      }

      if (pizza.quantity <= 0) {
        cartSlice.caseReducers.deleteItem(state, action);
      }
    },
    clearCart(state) {
      state.cart = [];
    },
  },
});

export const {
  addItem,
  deleteItem,
  increaseItemQuantity,
  decreaseItemQuantity,
  clearCart,
} = cartSlice.actions;

export const getCart = (state) => state.cart.cart;

export const getTotalCartQuantity = (state) =>
  state.cart.cart.reduce((current, previous) => current + previous.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.cart.reduce(
    (current, previous) => current + previous.quantity * previous.unitPrice,
    0
  );

export const getCurrentQuantityById = (id) => (state) => {
  return state.cart.cart.reduce((current, previous) => {
    if (previous.pizzaId === id) {
      current += previous.quantity;
    }
    return current;
  }, 0);
};

export default cartSlice.reducer;
