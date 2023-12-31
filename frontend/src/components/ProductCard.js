import React from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom'
const CardWrapper = styled.div`
  width: 250px;
  max-width: 90%;


  background-color: white;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  :hover {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  }
`;
const ImgWrapper = styled.div`
  width: 100%;
  height: 300px;
  overflow: hidden;
  display: flex;
  align-items: center;
`
const CardImage = styled.img`
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

const CardContent = styled.div`
  position: relative;
  height: 110px;
  box-sizing: border-box;
  width: 100%;
  padding: 5px;
  button{
    position: absolute;
    top: 10px;
    right: 10px;
  }
`;

const CardTitle = styled.p`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
  font-weight: bold;
  margin: 0;
`;

const AgentName = styled.p`
  margin: 0 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;
const CardPrice = styled.p`
  font-weight: bold;
  margin: 0 0 5px;
`;
const CardDesc = styled.p`

  margin: 0 0 5px;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;


const ProductCard = ({ product }) => {
  const {_id, img, title, price, description, agent} = product;
  return (
    
      <CardWrapper>
        <ImgWrapper>
          <CardImage src={img} alt={title} />
        </ImgWrapper>
        
        <CardContent>
          <Link to={`/product/${_id}`} style={{width: "100%"}}>
            <CardTitle>{title}</CardTitle>
            <AgentName>{agent.name}</AgentName>
            <CardPrice>Price: {price}</CardPrice>
            <CardDesc>{description}</CardDesc>
            <button>Buy</button>
          </Link>
        </CardContent>
      </CardWrapper>
    
  );
};

export default ProductCard;
