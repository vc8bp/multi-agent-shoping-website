import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance'
import { useLocation } from 'react-router-dom'
import ProductList from '../components/ProductList';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

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
    display: flex;
    justify-content: center;
    align-items: center;
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

const ProductTitleAgentWraper = styled.div`
  display: flex;
  align-items: center;
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
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setproduct] = useState({})
  useEffect(() => {
    (async () => {
      try {
        const {data} = await userRequest.get(`/product/${id}`)
        setproduct(data);
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])
  
  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity}))
  }

  return (
    <>
      {product ? 
      <>
        <Container>
            <ProductImgContainer>
                <ProductImage src={product.img} alt={product.title} />
            </ProductImgContainer>
          <ProductDetails>
            <ProductTitleAgentWraper>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductTitle>{product.agent?.name}</ProductTitle>
            </ProductTitleAgentWraper>
            <ProductPrice>Price : {product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            
            <BottomSection>
                <QuatitySection>
                    Quantity : <select value={quantity} onChange={e => setQuantity(e.target.value)}>{Array(product.stock > 10 ? 10 : product.stock).fill().map((_,i) => <option key={i}>{++i}</option>)}</select>
                </QuatitySection>
                <ButtonWrapper>
                    <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                    <BuyNowButton>Buy Now</BuyNowButton>
                </ButtonWrapper>
            </BottomSection>
          </ProductDetails>
        </Container>
        
          <div  style={{margin: "1rem 0"}} >
            <div className="container" >
            <hr></hr>
              <p>More Products of <b>{product?.agent?.name}</b></p>
              <ProductList limit={5} agent={product?.agent} />
            </div>
          </div>
      </>
      : null}
    </>
  );
};

export default ProductPage;
