import React from 'react';
import styled from 'styled-components';

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

const NavbarBrand = styled.a`
  font-size: 1.5rem;
  font-weight: bold;
  color: #fff;
  text-decoration: none;
`;

const NavbarMenu = styled.div`
  display: flex;
  flex-direction: row;
`;

const NavbarItem = styled.a`
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
      <NavbarBrand href="#">My Multi-Agent System</NavbarBrand>
      <NavbarMenu>
        <NavbarItem href="#">Home</NavbarItem>
        <NavbarItem href="#">Agents</NavbarItem>
        <NavbarItem href="#">Products</NavbarItem>
        <NavbarItem href="#">Cart</NavbarItem>
        <NavbarItem href="#">Login</NavbarItem>
      </NavbarMenu>
    </NavbarWrapper>
  );
};

export default Navbar;
