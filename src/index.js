import ReactDOM from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App";
import CartProvider from "./components/Context/CartProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <CartProvider >
    <App />
    </CartProvider>
  </BrowserRouter>
);
