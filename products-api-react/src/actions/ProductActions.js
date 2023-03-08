import NetworkClient from "../api/NetworkClient";
import Constants from "../constants/Constants";

export function setProductsRequest() {
    return { type: 'FetchProducts', payload: true }
}

export function setProductsSuccess(value) {
    return { type: 'FetchProductsSuccess', payload: value }
}

export const setProducts = (data) => async (dispatch) => {
    console.log(data);
    let url;
    if (data.query && data.query.length > 0) {
      url = Constants.BASE_URL + `ProductSearch?query=${data.query}&page=${data.page}&perPage=${data.perPage}`;
    } else {
      url = Constants.BASE_URL +
          'Products' + `?CurrentPage=${data.page}&CategoryId=${data.categoryId}
          &PriceFrom=0&PriceTo=0&Order=${data.orderBy}&PerPage=${data.perPage}`;
    }
    
    dispatch(setProductsRequest(true));
    await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(response => {
      dispatch(setProductsSuccess({...response, searchQuery: data.query}));
    });
}