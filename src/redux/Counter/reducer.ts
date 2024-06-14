// reducer.ts
import { createReducer } from "@reduxjs/toolkit";
import { ProductData, addProduct, clearProduct } from "./actions";

type ProductState = {
  productData: ProductData;
};

const initialState: ProductState = {
  productData: localStorage.getItem("product")
    ? JSON.parse(localStorage.getItem("product")!)
    : [],
};

const productReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addProduct, (state, action) => {
      const idExist = state.productData?.find(
        (item) => item.id === action.payload.id
      );
      if (idExist && action.payload.qty > 0) {
          const updatedProductData = state.productData.map(item=>
              item.id === action.payload.id ? {...item, qty: (Number(item.qty)) + (Number(action.payload.qty))} : item
          )
      const updatedState = {productData: updatedProductData};
      localStorage.setItem('product', JSON.stringify(updatedState.productData));
      return updatedState
      } else if (!idExist && action.payload.qty > 0) {
          const updatedState = {productData: [...state.productData, action.payload]};
          localStorage.setItem('product', JSON.stringify(updatedState.productData));
          return updatedState
          
      }
    })
    .addCase(clearProduct, (state, action) => {
      const updatedProductData = state.productData.filter(item => item.id != action.payload.id);
      localStorage.setItem('product', JSON.stringify(updatedProductData));
      state.productData = updatedProductData;
    });
});

export default productReducer;
