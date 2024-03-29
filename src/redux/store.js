import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./reducers";
import thunkMiddleware from "redux-thunk";

const storeFactory = () => {
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  return createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunkMiddleware))
  );
};

export default storeFactory;
