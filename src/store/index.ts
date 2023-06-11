import { combineReducers, applyMiddleware, createStore, compose } from "redux";
import { accountReducer } from "./account/reducers";
import thunkMiddleware from "redux-thunk";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
import { usersReducer } from "./users/reducers";
import { productTypesReducer } from "./productTypes/reducers";
import { productsReducer } from "./products/reducers";
import { billsReducer } from "./bills/reducers";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account"],
};

//
const rootReducer = combineReducers({
  account: accountReducer,
  users: usersReducer,
  productTypes: productTypesReducer,
  products: productsReducer,
  bills: billsReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// Ho tro config de xem redux o browser
declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export type AppState = ReturnType<typeof rootReducer>;

const configureStore = () => {
  const middlewares = [thunkMiddleware];
  const middlewareEnhancer = applyMiddleware(...middlewares);

  return createStore(persistedReducer, composeEnhancers(middlewareEnhancer));
};

const store = configureStore();
const persistedStore = persistStore(store);

export { store, persistedStore };
