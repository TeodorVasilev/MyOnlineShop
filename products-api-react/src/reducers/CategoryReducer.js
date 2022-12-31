const INITIAL_STATE = {
    id: 0,
    name: 'All Products',
}

const CategoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'Category':
            return { ...state, id: action.payload.categoryId, name: action.payload.categoryName }
        default:
            return state;
    }
}

export default CategoryReducer;