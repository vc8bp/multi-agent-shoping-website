import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 70%;
  max-width: 700px;


`;
const ImgWrapper = styled.div`
    width: 100%;
    >img {
    width: 100%;
    margin-bottom: 24px;
  }
`
const Message = styled.h2`
  font-size: 28px;
  font-weight: bold;
  margin-top: 24px;
  text-align: center;
`;

const NoProductsFound = () => {
  return (
    <Wrapper>
        <ImgWrapper>
            <img src="https://cdn.dribbble.com/users/4240845/screenshots/8501281/media/5ac049c882336e2719661060f4d2ce69.jpg?compress=1&resize=1000x750&vertical=top"></img>
        </ImgWrapper>
        <Message>Oops! We couldn't find any products.</Message>
    </Wrapper>
  );
};

export default NoProductsFound;
