import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { removeToCart } from "../redux/cartSlice";

const CartPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

const CartTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const CartTableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const CartTableHeader = styled.th`
  text-align: left;
  padding: 10px;
  background-color: #4caf50;
  color: white;
`;

const CartTableData = styled.td`
  text-align: left;
  padding: 10px;
`;

const CartTotalContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
  margin-top: 20px;
`;

const CartTotal = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const CartShipping = styled.div`
  font-size: 18px;
  font-style: italic;
`;

const CartPage = () => {
    const dispatch = useDispatch()
    
    const navigate = useNavigate();
    const cartItems =  useSelector(s => s.cart.products)
      
  const calculateTotal = () => {
    const total = cartItems.reduce((a, i) => {
      return a + i.price * i.quantity;
    }, 0)
    return total.toFixed(2);
  };

  return (
    <CartPageContainer>
      <CartTable>
        <thead>
          <CartTableRow>
            <CartTableHeader>Image</CartTableHeader>
            <CartTableHeader>Name</CartTableHeader>
            <CartTableHeader>Agent</CartTableHeader>
            <CartTableHeader>Price</CartTableHeader>
            <CartTableHeader>Quantity</CartTableHeader>
            <CartTableHeader>Total</CartTableHeader>
            <CartTableHeader>Action</CartTableHeader>
          </CartTableRow>
        </thead>
        <tbody>
          {cartItems?.map((item) => (
            <CartTableRow key={item._id}>
              <CartTableData>
                <img src={item.img} alt={item.title} width="50" />
              </CartTableData>
              <CartTableData>{item.title}</CartTableData>
              <CartTableData onClick={() => navigate('/products', {state: {agent: item.agent}})}>{item.agent.name}</CartTableData>
              <CartTableData>{item.price}</CartTableData>
              <CartTableData>{item.quantity}</CartTableData>
              <CartTableData>{item.quantity * item.price}</CartTableData>
              <CartTableData style={{cursor: "pointer"}} onClick={() =>dispatch(removeToCart(item._id))}>Remove</CartTableData>
            </CartTableRow>
          ))}
        </tbody>
      </CartTable>
      <CartTotalContainer>
        <CartTotal>Total: ${calculateTotal()}</CartTotal>
      </CartTotalContainer>
    </CartPageContainer>
  );
};

export default CartPage;
