import React from 'react';
import styled from 'styled-components';



const Container = styled.div`
  padding: 1rem 0.5rem;  
  display: flex;
  >* {
    flex: 1;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const ProductImgContainer = styled.div`
    overflow: hidden;
`

const ProductImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  background-color: #fff;
  border-radius: 4px;
`;

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 60%;
    min-width: 360px;
    @media screen and (max-width: 900px) {
        width: 100%;
    }
    @media screen and (max-width: 410px) {
        gap: 1rem;
        flex-direction: column;
    }
`
const QuatitySection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    >select {
        border: 1px teal solid;
        padding: 0.3rem 0.6rem;
        color: teal;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    >* {
        border: none;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        padding: 0.5rem 1rem;
    }
`

const AddToCartButton = styled.button`
  background-color: #f39c12;
  color: white;
  &:hover {
    background-color: #e67e22;
  }
`;

const BuyNowButton = styled.button`
  background-color: #3498db;
  color: white;
  &:hover {
    background-color: #2980b9;
  }
`;

const ProductPage = () => {
  return (
    <Container>
        <ProductImgContainer>
            <ProductImage src="https://cdn.pixabay.com/photo/2020/05/26/09/32/product-5222398_960_720.jpg" alt="Product" />
        </ProductImgContainer>
      <ProductDetails>
        <ProductTitle>Product Title</ProductTitle>
        <ProductPrice>Price : 100 rs</ProductPrice>
        <ProductDescription>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce quis lectus at mi faucibus maximus. Etiam rhoncus, augue sit amet semper congue, lectus felis efficitur quam, nec commodo nibh libero in enim.
        </ProductDescription>
        
        <BottomSection>
            <QuatitySection>
                Quantity : <select>{Array(5).fill().map((a,i) => <option>{i}</option>)}</select>
            </QuatitySection>
            <ButtonWrapper>
                <AddToCartButton>Add to Cart</AddToCartButton>
                <BuyNowButton>Buy Now</BuyNowButton>
            </ButtonWrapper>
        </BottomSection>
      </ProductDetails>
    </Container>
  );
};

export default ProductPage;