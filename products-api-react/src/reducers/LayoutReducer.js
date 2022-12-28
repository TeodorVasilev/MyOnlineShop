const INITIAL_STATE = {
    isLogged: false,
    user: {
        id: null,
        firstName: null,
        lastName: null,
        email: null,
        favoriteIds: [],
        cart: {
            productIds: [],
            quantity: null,
            totalPrice: null
        }
    },
}

const LayoutReducer = (state = INITIAL_STATE, action) => {
    switch(action.type){
        case 'AuthState' :
            return {...state, isLogged: action.payload}
        case 'User':
            return {...state, user: action.payload}
        default: 
            return state;
    }
}

export default LayoutReducer;