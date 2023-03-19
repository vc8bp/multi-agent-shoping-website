import React, { useState } from 'react';
import styled from 'styled-components';

const FilterContainer = styled.div`
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const FilterTitle = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const FilterOption = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  margin-bottom: 20px;
`;

const OptionTitle = styled.h3`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const OptionList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

const OptionItem = styled.li`
  font-size: 14px;
  margin-bottom: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

const PriceRangeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
`;

const PriceRangeTitle = styled.h3`
  margin: 0;
  font-size: 16px;
  font-weight: bold;
  white-space: nowrap;
`;

const PriceRangeInput = styled.select`
  padding: 0.5rem 0;
  border: 1px solid teal;
  box-shadow: 0px 0px 2px 1px rgba(0, 128, 128, 0.2);
`;

const ProductsFilter = ({FmaxPrice, Fcat}) => {
  const setCatFilter = (e) => Fcat.set(e.target.innerHTML)
  

  return (
    <FilterContainer>
      <FilterTitle>Filter By:</FilterTitle>
      <FilterOption>
        <OptionTitle>Category:</OptionTitle>
        <OptionList>
          <OptionItem onClick={setCatFilter}>All Products</OptionItem>
          <OptionItem onClick={setCatFilter}>Electronics</OptionItem>
          <OptionItem onClick={setCatFilter}>Clothing</OptionItem>
          <OptionItem onClick={setCatFilter}>Beauty</OptionItem>
          <OptionItem onClick={setCatFilter}>Sports</OptionItem>
        </OptionList>
      </FilterOption>
      <FilterOption>
        <OptionTitle>Price:</OptionTitle>
        <PriceRangeContainer>
          <PriceRangeTitle>Max Price: </PriceRangeTitle>
          <PriceRangeInput value={FmaxPrice.value}  onChange={e => FmaxPrice.set(e.target.value)} >
            <option>All</option>
            <option>100</option>
            <option>500</option>
            <option>1000</option>
            <option>2000</option>
            <option>3000</option>
            <option>4000</option>
            <option>5000</option>
            <option>10000</option>
          </PriceRangeInput>
        </PriceRangeContainer>
      </FilterOption>
    </FilterContainer>
  );
};

export default ProductsFilter;
