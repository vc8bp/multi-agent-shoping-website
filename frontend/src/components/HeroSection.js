import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import iphone from '../assets/iphone_img.png'

const HeroContainer = styled.div`
  background-image: url(${require(`../assets/hero_img.jpg`)});
  background-size: cover;
  background-position: center;
  height: 70vh;
  height: 70dvh;
  margin-bottom: 2rem;
`;
const Wrapper = styled.div`
    margin: auto;
    height: 100%;
    width: 1200px;
    max-width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`
const InfoContainer = styled.div`
    max-width: 600px;

    >a {
      background-color: white;
      padding: 0.5rem 1rem;
      border-radius: 50px;
      cursor: pointer;
    }
`

const HeroTitle = styled.h1`
  font-size: 48px;
  color: white;
  text-align: left;
  margin: 0 0 1rem 0;
`;

const HeroDescription = styled.p`
  font-size: 24px;
  color: white;
  text-align: left;
  margin: 0 0 2rem 0;
`;

const HeroImage = styled.img`
    height: 100%;
`;

const HeroSection = () => {
  return (
    <HeroContainer>
        <Wrapper>
            <InfoContainer>
                <HeroTitle>Shop with Confidence on Our Multi-Agent Marketplace</HeroTitle>
                <HeroDescription>Discover Top Deals and Trusted Sellers with Our Easy-to-Use Platform. Join Now for a Seamless Online Shopping Experience.</HeroDescription>
                <Link to="/products" >Brows Products</Link>
            </InfoContainer>
            <HeroImage src={iphone} alt="Hero Image" />
        </Wrapper>
    </HeroContainer>
  );
};

export default HeroSection;
