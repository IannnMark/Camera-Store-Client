import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/Profile";
import Dashboard from "./components/admin/Dashboard";
import CreateProduct from "./components/admin/CreateProduct";
import Search from "./pages/Search";
import Product from "./pages/Product";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProductsList from "./components/admin/ProductsList";
import UsersList from "./components/admin/UsersList";
import Shop from "./components/admin/Shop";
import Cart from "./pages/cart/Cart";
import ConfirmOrder from "./pages/cart/ConfirmOrder";
import Payment from "./pages/cart/Payment";
import OrderSuccess from "./pages/cart/OrderSuccess";
import OrdersList from "./components/admin/OrdersList";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/search" element={<Search />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route element={<PrivateRoute isAdmin={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/create-product" element={<CreateProduct />} />
          <Route
            path="/update-product/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/admin/products" element={<ProductsList />} />
          <Route path="/admin/users" element={<UsersList />} />
          <Route path="/admin/orders" element={<OrdersList />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
