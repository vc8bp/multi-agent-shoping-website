import { createSlice } from "@reduxjs/toolkit"

const localStoreageCart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
const localStoreageCartLength = localStorage.getItem("cartlength") ? JSON.parse(localStorage.getItem("cartlength")) : 0;

const initiaState = {
    products: localStoreageCart,
    length: localStoreageCartLength,
}

const saveToLocalStorage = (state) => {
    localStorage.setItem("cart", JSON.stringify(state.products))
    localStorage.setItem("cartlength", JSON.stringify(state.length))
}

const withSaveToLocalStorage = (reducer) => {
    return (state, action) => {
        const newState = reducer(state, action);
        saveToLocalStorage(newState);
        return newState;
    }
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState: initiaState,
    reducers : {
        addToCart : (state, action) => {
            //if product already exist to cart then increase quantity
            const ExistingProduct = state.products.find(i => i._id ===  action.payload._id)
            
            if(ExistingProduct){
                ExistingProduct.quantity = Number(ExistingProduct.quantity) + Number(action.payload.quantity);
                
            } else {
                state.products = [...state.products, action.payload]
                state.length += 1;
            }

        },
        removeToCart : (state, action) => {
            state.products = state.products.filter(i => i._id !== action.payload)
            state.length -= 1;
        },
        clearCart: (state) => {
            state.products = [];
            state.length = 0
        }
    }
})

export const {addToCart, removeToCart, clearCart} = cartSlice.actions;    
export default withSaveToLocalStorage(cartSlice.reducer);;