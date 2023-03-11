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



const IsNotLogedin = () => {
  const user = useIsUserValid()
  return !user ? <Outlet/> : <Navigate to="/" />
}

const IsLogedin = () => {
  const user = useIsUserValid()
  return user ? <Outlet/> : <Navigate to="/login" />
}

const IsSeller = () => {
  const user = useIsUserValid()
  console.log(user)
  return user?.isSeller ? <Outlet/> : <Navigate to="/" />

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
          <Route exect path='/login' element={<LoginPage/> } />
        </Route>

        <Route element={<IsLogedin/>} >
          <Route exect path='/cart' element={<CartPage/> } />
        </Route>
 
        <Route element={<IsSeller/>} >
          <Route exect path='/product/add' element={<AddProduct/> } />
          <Route exect path='/test' element={<TestComp/> } />
        </Route>
      </Routes>
    </>
  );
}

export default App;
