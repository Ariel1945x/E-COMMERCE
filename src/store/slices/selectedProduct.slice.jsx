import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setLoader } from './loader.slice';

export const selectedSlice = createSlice({
    name: 'selectedProduct',
    initialState: [],
    reducers: {
        setSelectedProduct: (state, action) => {
            return action.payload
        }
    }
})

export const getProductsSelected = () => (dispatch) => {
    axios
        .get("https://e-commerce-api-v2.academlo.tech/api/v1/cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(resp => dispatch( setSelectedProduct(resp.data) ))
        .catch(error => console.log(error))
}

export const addProductSelected = data => (dispatch) => {
    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/cart", data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
}

export const putProductsSelected = (id, quantity) => (dispatch) => {

    const data = {
        quantity: quantity
    }

    dispatch(setLoader(true))

    axios
        .put(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const deleteProductsSelected = id => (dispatch) => {

    dispatch(setLoader(true))

    axios
        .delete(`https://e-commerce-api-v2.academlo.tech/api/v1/cart/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const purchasesProductThunk = () => (dispatch) => {
    axios
        .post("https://e-commerce-api-v2.academlo.tech/api/v1/purchases", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
}

export const { setSelectedProduct } = selectedSlice.actions;

export default selectedSlice.reducer;
