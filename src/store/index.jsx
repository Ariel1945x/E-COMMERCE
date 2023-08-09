import { configureStore } from '@reduxjs/toolkit'
import products from './slices/products.slice'
import loading from './slices/loader.slice'
import selectedProduct from './slices/selectedProduct.slice'

export default configureStore({
    reducer: {
        products,
        loading,
        selectedProduct
    }
})