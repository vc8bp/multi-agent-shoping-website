import React, { useEffect, useState } from 'react'
import { userRequest } from '../axiosInstance'
import styled, { css } from 'styled-components';

const AddBtn = styled.div`

  position: fixed;
  right: 50px;
  bottom: 50px;
  padding: 0.5rem 1rem;
  border: 1px solid green;
  
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
    cursor: pointer;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  margin-bottom: 20px;
  transition: background 0.3s ease;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;

  ${p => p.disabled && css`
    opacity: 0.5;
    pointer-events: none;
  `}

  &:hover {
    background: #f9f9f9;
  }
`;

const CouponLeft = styled.div`
    padding: 10px 0;
    width: 40px;
    background-color: #F3723A;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    writing-mode: vertical-lr;
    transform: rotate(180deg);
    font-weight: 600;
    >*{
        margin: 0;
    }
`

const CouponRight = styled.div`
    padding: 10px 20px;
    >p{
        color: green;
    }
    >*{
        margin: 0;
    }
`

const Title = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    &:first-child{
        font-weight: 500;
    }

`

function Coupens({agent, setSelectedCoupon ,setIsOpen, productPrice = 0}) {
    const [coupons, setCoupons] = useState([])
 
    useEffect(() => {
      (async () => {
        console.log({agent})
        try {
          const {data} = await userRequest.get(`/coupon/${agent._id}`)
          console.log(data)
          setCoupons(data)
        } catch (error) {
          
        }
      })()
    },[])

  return !coupons?.length ? <p>NO COUPON FOUND</p> :  (
    <>
      <CouponListContainer>
        {coupons.map((coupon) => (
          <CouponItem key={coupon._id} disabled={productPrice < coupon.minProductPrice} onClick={() => {setSelectedCoupon(coupon); setIsOpen(false)}} >
            <CouponLeft>
                {coupon.percentageDiscount}% OFF
            </CouponLeft>
            <CouponRight>
                <Title><p>{coupon._id}</p> <p>Apply</p></Title>
                <p>Get Flat <b>{coupon.percentageDiscount}%</b> Discount, Upto <b>{coupon.maxDiscountAmount} Rs</b>. For all <b>{agent.name}</b> Products </p>
            </CouponRight>
          </CouponItem>
        ))}
      </CouponListContainer>
    </>
  )
}

export default Coupens