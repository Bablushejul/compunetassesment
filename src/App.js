import CartContext from "./components/Context/CartContext";
import {  useContext } from "react";
import StorePage from "./pages/Store";
import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import CartContainer from "./components/Cart/CartConatiner";
import ProductDetails from "./pages/ProductDetails";
import SignUpModal from "./components/AuthForm/SignUpModal";
import ProfilePage from "./pages/ProfilePage";


function App() {
const ctx=useContext(CartContext)
  return (
    <>
      <SignUpModal></SignUpModal>
      <Header></Header>
      <Routes>
      <Route path="/" element={<StorePage />} />
       <Route path="/store" element={<StorePage />} />
        <Route path="/user/:userID" element={<ProfilePage />} />
        <Route
          path="/products/:productID/:idToken"
          element={<ProductDetails />}
        />
      </Routes>
      {ctx.cartVisibility && <CartContainer></CartContainer>}
   
    </>
  );
}

export default App;
