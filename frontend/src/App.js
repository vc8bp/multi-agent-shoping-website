import './App.css';
import { Route, Routes} from 'react-router-dom'
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import Navbar from './components/NavBar';
import ProductPage from './pages/ProductPage';
import HomePage from './pages/HomePage';


function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' element={<HomePage/> } />
        <Route path='/register' element={<RegisterPage/> } />
        <Route path='/login' element={<LoginPage/> } />
        <Route path='/product/:id' element={<ProductPage/> } />
      </Routes>
    </>
  );
}

export default App;
