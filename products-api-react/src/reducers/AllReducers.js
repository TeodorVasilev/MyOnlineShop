import { combineReducers } from "redux";
import LayoutReducer from "./LayoutReducer";

const AllReducers = combineReducers({
    layout: LayoutReducer,
});

export default AllReducers;