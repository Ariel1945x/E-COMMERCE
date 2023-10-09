import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const productsSlice = createSlice({
    name: 'products',
    initialState: [],
    reducers: {
        setProducts: (state, action) => {
            return action.payload
        }
    }
})

export const getAllProductsThunk = () => (dispatch) => {
    dispatch(setLoader(true))

    axios
        .get("https://api-ecommerce-1.onrender.com/products")
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const getFilterCategoryProductsThunk = id => (dispatch) => {
    dispatch(setLoader(true))

    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?categoryId=${id}`)
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const getFilterTitleProductsThunk = title => (dispatch) => {
    dispatch(setLoader(true))

    axios
        .get(`https://e-commerce-api-v2.academlo.tech/api/v1/products?title=${title}`)
        .then(resp => dispatch(setProducts(resp.data)))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;
