const INITIAL_STATE = {
        id: 0,
        name: 'All Products'
}

const CategoryReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case 'Category':
            return { ...state, id: action.payload.id, name: action.payload.name }
        default:
            return state;
    }
}

export default CategoryReducer;