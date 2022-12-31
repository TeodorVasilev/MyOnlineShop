import NetworkClient from "../api/NetworkClient";
import Constants from "../constants/Constants";

export function setProductsRequest(){
    return {type: 'FetchProducts', payload: true}
}

export function setProductsSuccess(value){
    return {type: 'FetchProductsSuccess', payload: value}
}

export const setProducts = (data) => async (dispatch) => {
        const url = Constants.BASE_URL + 
        'Products' + `?CurrentPage=${data.page}&CategoryId=${data.categoryId}
        &PriceFrom=0&PriceTo=0&Order=0`;

        dispatch(setProductsRequest(true));
        await fetch(url,{
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(response => {
            console.log(response);
            dispatch(setProductsSuccess(response));
        });
}
