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

const PaginateComponent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

`
const PaginateWrapper = styled.div`
  display: flex;
  align-items: center;
  >* {
    width: 50px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid black;
  }
`
const Prev = styled.div`
`
const Numbers = styled.div`
  background-color: ${props => props.active ? "#bde4bd": "white"};
`
const Next = styled.div`
  
`

const ProductList = ({limit, agent,  FmaxPrice, Fcat, paginate}) => { 
  const [page, setPage] = useState(1)
  const [products, setproducts] = useState(null)
    useEffect(() => {
      let url = `/product?page=${page}&`
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
    }, [agent, limit, FmaxPrice, Fcat, page])
  
    const totalPage = products?.totalPages;

  return (
    <Container>
      {products?.products?.length ? products.products.map(p => (
        <ProductCard
          key={p._id}
          product={p}
        />
      )):
      <NoProductsFound/>
      }
      
      {paginate && <PaginateComponent>
        <PaginateWrapper>
          <Prev onClick={() => page !== 1 && setPage(page => page - 1)}>&larr;</Prev>

            {new Array(totalPage).fill().map((_, i) => {
              const pageNum = i + 1;
              return (
                <Numbers key={pageNum} onClick={() => setPage(pageNum)} active={page === pageNum}>
                  {pageNum}
                </Numbers>
              );
            })}
          <Next onClick={() => totalPage !== page && setPage(page =>  page + 1)}>&rarr;</Next>
        </PaginateWrapper>
      </PaginateComponent>}
    </Container>
  );
};

export default ProductList;
