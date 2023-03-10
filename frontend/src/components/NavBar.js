import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

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
  return (
    <NavbarWrapper>
      <Link to="/"><NavbarBrand href="#">My Multi-Agent System</NavbarBrand></Link>
      <NavbarMenu>
        {/* <Link to="/agents"><NavbarItem href="#">Agents</NavbarItem></Link>
        <Link to="/cart"><NavbarItem href="#">Cart</NavbarItem></Link> */}
        <Link to="/products"><NavbarItem href="#">Products</NavbarItem></Link>
        <Link to="/login"><NavbarItem href="#">Login</NavbarItem></Link>
        <Link to="/register"><NavbarItem href="#">Register</NavbarItem></Link>
      </NavbarMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
