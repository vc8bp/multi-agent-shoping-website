import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';
import NoProductsFound from './NoProductsFounf';

const Container = styled.div`
  margin: 1rem 0;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.5rem;
`

const ProductList = ({limit, agent,  FmaxPrice, Fcat}) => {


  const [products, setproducts] = useState(null)
    useEffect(() => {
      let url = "/product?"
      if(FmaxPrice) url += `maxp=${FmaxPrice}&`
      if(Fcat) url += `cat=${Fcat}&`
      if(agent) url += `agent=${agent._id}&`
      if(limit) url += `limit=${limit}&`;

      (async () => {
        try {
          const {data} = await userRequest.get(url);
          setproducts(data)
        } catch (error) {
          console.log(error)
        }
      })()
    }, [agent, limit, FmaxPrice, Fcat])
  

  return (
    <Container>
      {products?.length ? products.map(p => (
        <ProductCard
          key={p._id}
          product={p}
        />
      )):
      <NoProductsFound/>
      }
    </Container>
  );
};

export default ProductList;
