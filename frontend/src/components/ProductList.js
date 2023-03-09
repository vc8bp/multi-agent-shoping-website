import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ProductList = () => {
//   const products = [
//     {
//       id: 1,
//       image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1099&q=80',
//       title: 'Product 1',
//       price: '$19.99'
//     },
//     {
//       id: 2,
//       image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
//       title: 'Product 2',
//       price: '$24.99'
//     },
//     {
//       id: 3,
//       image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTJ8fHByb2R1Y3R8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60',
//       title: 'Product 3',
//       price: '$29.99'
//     }
//   ];
  
  const [products, setproducts] = useState(null)
    useEffect(() => {
      (async () => {
        try {
          const {data} = await userRequest.get('/product');
          setproducts(data)
        } catch (error) {
          console.log(error)
        }
      })()
    }, [])
  

  return (
    <Container>
      {products && products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </Container>
  );
};

export default ProductList;
