import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';
import {ReactComponent as  DeleteIcon} from '../assets/delete.svg'
import ErrorComponent from '../components/ErrorComponent'

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Header = styled.div`
  text-align: center;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  font-size: 1.5rem;
  color: #888;
`;

const ProductList = styled.ul`
  list-style: none;
  padding: 0;
`;

const ProductItem = styled.li`
position: relative;
  display: flex;
  align-items: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease-in-out;

  >svg {
    transform: scale(1.5);
    fill: red;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
  }

  :hover {
    font-weight: 400;
    transform: scale(1.1);
  }
  @media all and (max-width: 800px) {
    flex-direction: column;
    >* {
      margin: 0;
    }
  }
`;

const ProductImage = styled.img`
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 1rem;
  border-radius: 0.5rem;
`;

const ProductName = styled.h2`
  font-size: 1.5rem;
`;

const ProductPrice = styled.p`
  font-size: 1.2rem;
`;

const ProductStock = styled.p`
  font-size: 1.2rem;
`;

const PurchaseCount = styled.p`
  font-size: 1.2rem;
  color: #888;
`;

const AddProduct = styled.div`

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

const Error = styled.div`
  top: 10px;
  right: 10%;
  left: 10%;
  position: fixed;
`

const SellerDashboard = () => {
    const navigate = useNavigate()
    const id = useSelector(state => state.user.user)._id;
    const [message, setMessage] = useState(null)
    const [products, setProducts] = useState([])

    useEffect(()  => {
        (async () => {
            try {
                const {data} = await userRequest.get(`/product?agent=${id}`);
                setProducts(data)
            } catch (error) {
                
            }
        })()
    },[])

    const handleDelete = (id) => {
      (async () => {
        try {
            const {data} = await userRequest.delete(`/product/${id}`);
            setProducts(p => ({...p, products: p.products.filter(pro => pro._id !== id)}))
            setMessage({isError: false, message: data.message})
        } catch (error) {
          console.log(error)
          setMessage({isError: true, message: error.response.data.message})
        }
      })()
    }
    return (
        <>
          <Container>
          <Header>
            <Title>My Products</Title>
            <Subtitle>View all of your uploaded products below</Subtitle>
          </Header>
          <ProductList>
              {products?.products?.map(product => (
              <ProductItem key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                  <ProductImage src={product.img} alt={product.title} />
                  <ProductName>{product.title}</ProductName>
                  <ProductPrice>${product.price}</ProductPrice>
                  <ProductStock>In Stock: {product.stock}</ProductStock>
                  <PurchaseCount>Purchases: {product?.purchaseCount || 10}</PurchaseCount>
                  <DeleteIcon onClick={e => {e.stopPropagation(); handleDelete(product._id);}}/>
              </ProductItem>
              ))}
          </ProductList>
          {message && <Error><ErrorComponent data={message} set={setMessage}/></Error>}
          </Container>

          <AddProduct onClick={() => navigate('/product/add')}>Add Product</AddProduct>
        </>
    );
};



export default SellerDashboard;
