import { combineReducers } from "redux";
import LayoutReducer from "./LayoutReducer";
import CategoryReducer from "./CategoryReducer";

const AllReducers = combineReducers({
    layout: LayoutReducer,
    category: CategoryReducer
});

export default AllReducers;