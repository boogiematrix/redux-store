import { createReducer } from '@reduxjs/toolkit';
import {
  UPDATE_PRODUCTS,
  ADD_TO_CART,
  UPDATE_CART_QUANTITY,
  REMOVE_FROM_CART,
  ADD_MULTIPLE_TO_CART,
  UPDATE_CATEGORIES,
  UPDATE_CURRENT_CATEGORY,
  CLEAR_CART,
  TOGGLE_CART,
} from './actions';

const initialState = {
  products: [],
  cart: [],
  cartOpen: false,
  categories: [],
  currentCategory: '',
}

export const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(UPDATE_PRODUCTS, (state, action) => {
      state.products = action.products
    })
    .addCase(ADD_TO_CART, (state, action) => {
      state.cartOpen = true;
      state.cart.push(action.product)
    })
    .addCase(ADD_MULTIPLE_TO_CART, (state, action) => {
      state.cart = [...state.cart, ...action.products]
    })
    .addCase(UPDATE_CART_QUANTITY, (state, action) => {
      state.cartOpen = true;
      state.cart = state.cart.map((product) => {
        if (action._id === product._id) {
          product.purchaseQuantity = action.purchaseQuantity;
        }
        return product
      })
    })
    .addCase(REMOVE_FROM_CART, (state, action) => {
      let newState = state.cart.filter((product) => {
        return product._id !== action._id;
      });
      state.cartOpen = newState.length > 0 ? true : false;
      state.cart = newState;
      
    })
    .addCase(CLEAR_CART, (state, action) => {
      state.cartOpen = false;
      state.cart = [];
      
    })
    .addCase(TOGGLE_CART, (state, action) => {

        state.cartOpen = !state.cartOpen
      
    })
    .addCase(UPDATE_CATEGORIES, (state, action) => {

        state.categories = [...action.categories]
      
    })
    .addCase(UPDATE_CURRENT_CATEGORY, (state, action) => {
    
      state.currentCategory = action.currentCategory;
      
    })
    .addDefaultCase((state, action) => {
      return state
    })
})