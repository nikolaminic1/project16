import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";
import { pReducer } from "./reducers/index";

const middleware = composeWithDevTools(applyMiddleware(thunk, logger));
const store = createStore(pReducer, middleware);

const persistor = persistStore(store);

export { persistor, store };
