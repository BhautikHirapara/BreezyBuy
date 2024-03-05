import { Counter } from "./features/counter/Counter";
import './App.css';
import Home from './pages/Home';
import LoginPage from "./pages/LoginPage";
import Signup from "./features/auth/components/Signup";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link
} from "react-router-dom";
import Protected from "./features/auth/components/Protected";
import SignupPage from "./pages/SignupPage";
import Cart from "./features/cart/Cart";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailPage from "./pages/ProductDetailPage";
import { useEffect } from "react";
import { fetchItemsByUserIdAsync } from "./features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import PageNotFound from "./pages/404";
import Order from "./features/order/Order"
import OrderSuccessPage from "./pages/OrderSuccessPage"
import { fetchOrdersByUserId } from "./features/order/orderAPI";
import UserOrdersPage from "./pages/UserOrdersPage";
import { fetchLoggedInUserAsync, selectUserInfo } from "./features/user/userSlice";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home> </Protected>,
  },
  {
    path: "/login",
    element: <LoginPage></LoginPage>,
  },
  {
    path: "/signup",
    element: <SignupPage></SignupPage>,
  },
  {
    path: "/cart",
    element: <Protected> <CartPage></CartPage></Protected> 
  },
  {
    path: "/checkout",
    element: <Protected> <Checkout></Checkout></Protected> 
  },
  {
    path: "/product-detail/:id",
    element: <Protected> <ProductDetailPage></ProductDetailPage></Protected> 
  },
  {
    path: "/order",
    element: <Protected> <UserOrdersPage></UserOrdersPage> </Protected>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage> 
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
]);
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectUserInfo)
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  },[dispatch, user]);

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;