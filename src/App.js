import './App.css';
import store from "./app/features/store"

import { Provider } from 'react-redux';
import LoginPage from './app/pages/Login';
import RegisterPage from './app/pages/Register';
import PageNotFound from './app/pages/NotFound';
import PageAccount from './app/pages/Account';
import Profile from './app/components/Profile';
import { ProtectedRouteAdmin, ProtectedRouteAuth, ProtectedRouteUser } from './app/ProtectedRoute';
import Address from './app/components/Address';
import IndexAccount from './app/components/Account';
import Category from './app/components/Category';
import Tag from './app/components/Tag';
import Product from './app/components/Product';
import HomePage from './app/pages/Home';
import PosStore from './app/index';
import CartPage from './app/pages/Cart';
import CheckoutPage from './app/pages/Checkout';
import Pemesanan from './app/components/Pemesanan';
import InvoicePage from './app/pages/Invoice';



const { BrowserRouter, Routes, Route } = require("react-router-dom");
function App() {
  return (
    <div className="App">
        <Provider store={store}>
        <BrowserRouter>
                    <Routes>
                      <Route path="/" element={<PosStore />} >
                        <Route path="" element={<HomePage />} />
                        <Route path="/login" element={ <ProtectedRouteAuth> <LoginPage /> </ProtectedRouteAuth>} />
                        <Route path="/register" element={<ProtectedRouteAuth> <RegisterPage /> </ProtectedRouteAuth>} />
                        <Route path="/cart" element={  <ProtectedRouteUser> <CartPage />  </ProtectedRouteUser>} />
                        <Route path="/checkout" element={  <ProtectedRouteUser> <CheckoutPage />  </ProtectedRouteUser>} />
                        <Route path="/invoice/:id" element={  <ProtectedRouteUser> <InvoicePage />  </ProtectedRouteUser>} />
                        <Route path="/account" element={ <ProtectedRouteUser> <PageAccount /> </ProtectedRouteUser> }>
                          <Route path="" element={<IndexAccount />} />
                          <Route path="profile" element={<Profile />} />
                          <Route path="pemesanan" element={<Pemesanan />} />
                          <Route path="address" element={<Address />} />
                          <Route path="category" element={<ProtectedRouteAdmin> <Category /> </ProtectedRouteAdmin>} />
                          <Route path="tag" element={<ProtectedRouteAdmin> <Tag /> </ProtectedRouteAdmin>} />
                          <Route path="product" element={<ProtectedRouteAdmin> <Product /> </ProtectedRouteAdmin>} />
                        </Route>
                      </Route>
                      <Route path="*" element={<PageNotFound />} />
                    </Routes>
                 </BrowserRouter>

        </Provider>
    </div>
  );
}

export default App;
