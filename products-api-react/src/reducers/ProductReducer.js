const INITIAL_STATE = {
        searchQuery: '',
        products: [],
        pages: [],
        fetching: false
}

const ProductReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'SetProducts':
            return {...state, products: action.payload}
        case 'FetchProducts':
            return {...state, fetching: action.payload}
        case 'FetchProductsSuccess':
            return {...state, searchQuery: action.payload.searchQuery, products: action.payload.products, 
                pages: Array.from({ length: action.payload.totalPages }, (_, i) => i + 1), fetching: false}
        default:
            return state;
    }
}

export default ProductReducer;