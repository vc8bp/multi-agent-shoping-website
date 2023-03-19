import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/userSlice';
import useIsUserValid from '../helpers/auth';

const NavbarWrapper = styled.nav`
box-sizing: border-box;
  height: 65px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: #222;
  color: #fff;
  padding: 1rem;


`;

const NavbarBrand = styled.p`
  cursor: pointer;  
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavbarItem = styled.p`
cursor: pointer;
  font-size: 1rem;
  margin: 0 1rem;
  color: #fff;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;


const Navbar = () => {
  const dispatch = useDispatch()
  const user = useIsUserValid()
  return (
    <NavbarWrapper>
      <Link to="/"><NavbarBrand href="#">My Multi-Agent System</NavbarBrand></Link>
      <NavbarMenu>
        {user?.isSeller && <>
          <Link to="/product/add"><NavbarItem href="#">Add Products</NavbarItem></Link>
          <Link to="/seller/dashboard"><NavbarItem href="#">Dashboard</NavbarItem></Link>
        </>}
        {user?.isAdmin && <>
          <Link to="/dashboard"><NavbarItem href="#">Dashboard</NavbarItem></Link>
        </>}
        <Link to="/products"><NavbarItem href="#">Products</NavbarItem></Link>
        {user ? <>
          <Link to="/cart"><NavbarItem href="#">Cart</NavbarItem></Link>
          <NavbarItem onClick={() => dispatch(logout())}>Logout</NavbarItem>
        </>:<>
          <Link to="/login"><NavbarItem href="#">Login</NavbarItem></Link>
          <Link to="/register"><NavbarItem href="#">Register</NavbarItem></Link>  
        </>}
          

      </NavbarMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
