// action.ts
import { createAction } from "@reduxjs/toolkit";
import { ADD_PRODUCT, CLEAR_PRODUCT } from "./constants";

export interface Product {
    id: number | undefined;
    image: string | undefined;
    title: string | undefined;
    price: number | undefined;
    qty: number;  
}

export interface Logout {
  id: number | undefined;
}

export type ProductData = Product[];

// Membuat action dengan createAction
export const addProduct = createAction<Product>(ADD_PRODUCT);
export const clearProduct = createAction<Logout>(CLEAR_PRODUCT);