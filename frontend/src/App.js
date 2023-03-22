import './App.css';
import React from 'react'
import { Navigate, Outlet, Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/NavBar';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import CartPage from './pages/CartPage';
import AddProduct from './pages/AddProduct';
import useIsUserValid from './helpers/auth';
import TestComp from './pages/TestComp';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/Admin/AdminDashboard';
import SellerRegisterPage from './pages/SellerRegisterPage';



const IsNotLogedin = () => {
  const user = useIsUserValid()
  return (!user || user?.isAdmin) ? <Outlet/> : <Navigate to="/" />
}

const IsLogedin = () => {
  const user = useIsUserValid()
  return user ? <Outlet/> : <Navigate to="/login" />
}

const IsSeller = () => {
  const user = useIsUserValid()
  return user?.isSeller ? <Outlet/> : <Navigate to="/" />
}

const IsAdmin = () => {
  const user = useIsUserValid()
  return user?.isAdmin ? <Outlet/> : <Navigate to="/" />
}




function App() {
  return (
    <>
    <Navbar/>
      <Routes>

        <Route exect path='/' element={<HomePage/> } />
        <Route exect path='/product/:id' element={<ProductPage/> } />
        <Route exect path='/products' element={<ProductsPage/> } />

        <Route element={<IsNotLogedin/>} >
          <Route exect path='/register' element={<RegisterPage/> } />
          <Route exect path='/seller/register' element={<SellerRegisterPage/> } />
          <Route exect path='/login' element={<LoginPage/> } />
        </Route>

        <Route element={<IsLogedin/>} >
          <Route exect path='/cart' element={<CartPage/> } />
        </Route>
 
        <Route element={<IsSeller/>} >
          <Route exect path='/product/add' element={<AddProduct/> } />
          <Route exect path='/seller/dashboard' element={<SellerDashboard/> } />
        </Route>

        <Route element={<IsAdmin/>}>
          <Route exect path='/dashboard/*' element={<AdminDashboard/> } />
        </Route>

      </Routes>
    </>
  );
}

export default App;
