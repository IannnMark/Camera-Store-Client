import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import SignIn from "./pages/user/SignIn";
import SignUp from "./pages/user/SignUp";
import PrivateRoute from "./components/PrivateRoute";
import Profile from "./pages/user/Profile";
import Dashboard from "./components/admin/Dashboard";
import CreateProduct from "./components/admin/CreateProduct";
import Search from "./pages/Search";
import Product from "./pages/Product";
import UpdateProduct from "./components/admin/UpdateProduct";
import ProductsList from "./components/admin/ProductsList";
import UsersList from "./components/admin/UsersList";
import Shop from "./pages/Shop";
import Cart from "./pages/cart/Cart";
import ConfirmOrder from "./pages/cart/ConfirmOrder";
import Payment from "./pages/cart/Payment";
import OrderSuccess from "./pages/cart/OrderSuccess";
import OrdersList from "./components/admin/OrdersList";
import UpdateOrder from "./components/admin/UpdateOrder";
import Deals from "./pages/Deals";
import ListOrders from "./pages/order/ListOrders";
import OrderDetails from "./pages/order/OrderDetails";
import Brands from "./pages/Brands";
import BrandProducts from "./pages/BrandProduct";

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
        <Route path="/deals" element={<Deals />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/confirm" element={<ConfirmOrder />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/brands" element={<Brands />} />
        <Route path="/product/brand/:brandId" element={<BrandProducts />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/orders/me" element={<ListOrders />} />
          <Route path="/order/:orderId" element={<OrderDetails />} />
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
          <Route path="/update-order/:orderId" element={<UpdateOrder />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
