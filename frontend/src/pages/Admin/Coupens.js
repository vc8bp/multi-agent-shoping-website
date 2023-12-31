import React, { useEffect, useState } from 'react'
import AddCoupon from './AddCoupon'
import { userRequest } from '../../axiosInstance'
import styled from 'styled-components';

const AddBtn = styled.div`

  position: fixed;
  right: 50px;
  bottom: 50px;
  padding: 0.5rem 1rem;
  border: 1px solid green;
  background-color: rgb(215 248 215);
  transition: all 0.3s ease-in-out;
  cursor: pointer;

  :hover{
    border-radius: 5px;
    background-color: rgb(166 248 166);
    box-shadow: 0 0 15px 3px rgba(166, 248, 166, 0.5);
  }
`

const CouponListContainer = styled.div`
  max-width: 800px;
  margin: 1rem auto;
`;

const CouponItem = styled.div`
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  padding: 20px;
  transition: background 0.3s ease;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);

  &:hover {
    background: #f9f9f9;
  }
`;

const CouponHeader = styled.div`
  display: flex;
  justify-content: space-between;
  >div{
    display: flex;
    align-items: center;
    gap: 1rem;
  }
`;

const CouponTitle = styled.h3`
  color: #333;
  margin: 0;
`;

const CouponType = styled.span`
  padding: 8px;
  border-radius: 4px;
  font-size: 12px;
  text-transform: uppercase;
  color: ${({ type }) => (type === 'allProducts' ? '#3498db' : '#2ecc71')};
  background: ${({ type }) => (type === 'allProducts' ? '#ecf0f1' : '#e8f8ec')};
`;

const CouponDetails = styled.div`
  color: #555;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`
const Items = styled.div`
  display: flex;
  margin: 1rem;
  >div{
    flex: 1;
    display: flex;
    flex-direction: column;
  }
`

function Coupens() {
    const [coupons, setCoupons] = useState([])
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
      (async () => {
        try {
          const {data} = await userRequest.get("/coupon")
          console.log(data)
          setCoupons(data)
        } catch (error) {
          
        }
      })()
    },[])

  return (
    <>
      <CouponListContainer>
        {coupons.map((coupon) => (
          <CouponItem key={coupon._id}>
            <CouponHeader>
                <div>
                  <CouponTitle>{coupon?.title}</CouponTitle>
                  <CouponType type={coupon.couponType}>{coupon.couponType}</CouponType>
                </div>
                <p>Stock Left: {coupon.stock}</p>
            </CouponHeader>
            <CouponDetails>
              <Items>
                <div><p>Percentage Discount:</p> <span>{coupon.percentageDiscount}%</span></div>
                <div><p>Max Discount Amount:</p> <span>Rs. {coupon.maxDiscountAmount}</span></div>
                <div><p>Min Product Price:</p> <span>${coupon.minProductPrice}</span></div>
              </Items>
              

              <Footer>
                <p>Used Count: {coupon.usedCount}</p>
                <p>Total Discount Amount: ${coupon.totalDiscountAmount}</p>
              </Footer>
            </CouponDetails>
          </CouponItem>
        ))}
      </CouponListContainer>
      <AddCoupon isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <AddBtn onClick={() => setIsOpen(true)} >Add Coupon</AddBtn>
    </>
  )
}

export default Coupens