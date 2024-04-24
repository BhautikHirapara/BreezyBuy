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
import UserProfilePage from "./pages/UserProfilePage";
import { selectLoggedInUser } from "./features/auth/authSlice";
import ForgotPassoword from "./features/auth/components/ForgotPassoword";
import Logout from "./features/auth/components/Logout";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected> <Home></Home> </Protected>,
  },  
  {
    path: '/admin',
    element: (
      <ProtectedAdmin>
        <AdminHome></AdminHome>
      </ProtectedAdmin>
    ),
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
    path: '/admin/product-detail/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductDetailPage></AdminProductDetailPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/product-form/edit/:id',
    element: (
      <ProtectedAdmin>
        <AdminProductFormPage></AdminProductFormPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: '/admin/orders',
    element: (
      <ProtectedAdmin>
        <AdminOrdersPage></AdminOrdersPage>
      </ProtectedAdmin>
    ),
  },
  {
    path: "/order",
    element: <Protected> <UserOrdersPage></UserOrdersPage> </Protected>
  },
  {
    path: "/profile",
    element: <Protected> <UserProfilePage></UserProfilePage> </Protected>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage> 
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage> 
  },
  {
    path: "/logout",
    element: <Logout></Logout> 
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  },
]);
function App() {
  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)
  useEffect(()=>{
    if(user){
      dispatch(fetchItemsByUserIdAsync(user.id));
      dispatch(fetchLoggedInUserAsync(user.id));
    }
  },[dispatch, user]);

  return (
    <>
      <div className="App">
        <RouterProvider router={router} />
        {/* Link must be inside the Provider */}
      </div>
    </>
  );
}

export default App;