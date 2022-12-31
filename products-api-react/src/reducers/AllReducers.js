import { combineReducers } from "redux";
import CategoryReducer from "./CategoryReducer";
import LayoutReducer from "./LayoutReducer";
import ProductReducer from "./ProductReducer";

const AllReducers = combineReducers({
    layout: LayoutReducer,
    products: ProductReducer,
    category: CategoryReducer
});

export default AllReducers;