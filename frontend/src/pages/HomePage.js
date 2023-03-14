import React from 'react'
import HeroSection from '../components/HeroSection'
import styled from 'styled-components'
import ProductList from '../components/ProductList'
import Footer from '../components/Footer'

const Container = styled.div`
  background-color: #eee;
`
const ProductsContainer = styled.div``
const Title = styled.span`
font-weight: bold;
  font-size: 1.2rem;
`

export default function HomePage() {
  return (
    <Container>
        <HeroSection/>
        <div className='container' >
            <ProductsContainer>
                <Title>Top Products</Title>
                <ProductList limit={5}/>
            </ProductsContainer>
        </div>
        <Footer/>
    
    </Container>
  )
}
