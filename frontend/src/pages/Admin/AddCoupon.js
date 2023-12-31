import React, { useState } from 'react';
import styled from 'styled-components';
import { userRequest } from "../../axiosInstance"

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  width: min(90%, 400px);
`;

const Head = styled.div`
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    >button{
        background: #fff0f0;
        color: red;
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-weight: 600;
    }
`;

const CouponForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  >button{
    background: #007bff;
    color: #fff;
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  >label{
    display: flex;
    flex-direction: column;
    gap: 0.3rem;
    >select{
        padding: 0.5rem 0.8rem;
        border-radius: 3px;
        border: 1px solid #222222;
    }
    >input{
        padding: 0.5rem 0.8rem;
        border-radius: 3px;
        border: 1px solid #222222;
    }
  }
`;

const AddCoupon = ({ isOpen, onClose }) => {
  const [couponData, setCouponData] = useState({
    title: "",
    allowedProducts: [],
    percentageDiscount: 0,
    maxDiscountAmount: null,
    minProductPrice: 0,
    stock: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCouponData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSave = (e) => {
    e.preventDefault();

    try {
      const {data} = userRequest.post("/coupon", couponData)
      onClose();
    } catch (error) {
      console.log({error})
    }
  };

  return (
    <>
      {isOpen && (
        <ModalWrapper>
          <ModalContent>
            <Head>
                <p>Add Coupon</p>
                <button onClick={onClose}>Close</button>
            </Head>
            <CouponForm onSubmit={handleSave}>
              <label>
                Title:
                <input
                  name="title"
                  value={couponData.title}
                  onChange={handleChange}
                />
              </label>
              <label>
                Percentage Discount:
                <input
                  type="number"
                  name="percentageDiscount"
                  value={couponData.percentageDiscount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Maximum Discount (Rs):
                <input
                  type="number"
                  name="maxDiscountAmount"
                  value={couponData.maxDiscountAmount}
                  onChange={handleChange}
                />
              </label>
              <label>
                Minimum Product Price:
                <input
                  type="number"
                  name="minProductPrice"
                  value={couponData.minProductPrice}
                  onChange={handleChange}
                />
              </label>
              <label>
              stock:
                <input
                  type="number"
                  name="stock"
                  value={couponData.stock}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Save Coupon</button>
            </CouponForm>
          </ModalContent>
        </ModalWrapper>
      )}
    </>
  );
};

export default AddCoupon;
