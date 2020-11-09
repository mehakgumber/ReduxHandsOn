import product from '../constants/products'

const initialstate = {
    products: product
}

export default function productReducer(state = initialstate, action) {
    switch (action.type) {
        case 'ADD_PRODUCT':
            return Object.assign({}, state, {
                products: [...state.products, action.payload]
            });
        case 'REMOVE_PRODUCT':
            return { products: state.products.filter(products =>
                products.id !== action.payload.productId
             )}
        default:
            return state;
    }
};