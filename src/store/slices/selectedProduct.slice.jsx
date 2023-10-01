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
        .get("https://api-ecommerce-1.onrender.com/cart", {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(resp => dispatch( setSelectedProduct(resp.data) ))
        .catch(error => console.log(error))
}

export const addProductSelected = data => (dispatch) => {
    axios
        .post("https://api-ecommerce-1.onrender.com/cart", data, {
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
        .put(`https://api-ecommerce-1.onrender.com/cart/${id}`, data, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const deleteProductsSelected = id => (dispatch) => {

    dispatch(setLoader(true))

    axios
        .delete(`https://api-ecommerce-1.onrender.com/cart/${id}`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
        .finally(() => dispatch(setLoader(false)))
}

export const purchasesProductThunk = () => (dispatch) => {
    axios
        .post("https://api-ecommerce-1.onrender.com/purchases", {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(() => dispatch( getProductsSelected() ))
        .catch(error => console.log(error))
}

export const { setSelectedProduct } = selectedSlice.actions;

export default selectedSlice.reducer;
