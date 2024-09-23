import ReactDom from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store, persistore } from "./redux/store.js";
import { PersistGate } from "redux-persist/integration/react";

ReactDom.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate loading={null} persistore={persistore}>
      <App />
    </PersistGate>
  </Provider>
);
