import { createStore, combineReducers } from "redux";
import contentReducer from "./content-reducer";

//объедидение reducer`ов
let rootReducer = combineReducers({
  contentStore: contentReducer,
});

const store = createStore(rootReducer);
//создаем store из reducera

export default store;

window.store = store;
