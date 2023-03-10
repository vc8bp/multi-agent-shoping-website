import React, {useState} from 'react'
import styled from 'styled-components'
import ProductList from '../components/ProductList'
import ProductsFilter from '../components/ProductsFilter'

const Container = styled.div`
display: unset;
    display: flex;
`
const Left = styled.div`
    position: sticky;
    top: 0;
    flex: 1;
`
const Right = styled.div`
    flex: 8;
`

function ProductsPage() {
    const [max, setMax] = useState(0)
    const [cat, setCat] = useState(0)
    const FmaxPrice = {value:max, set:setMax}
    const Fcat = {value:cat, set:setCat}
  return (
    <Container>
        <Left>
            <ProductsFilter  FmaxPrice={FmaxPrice} Fcat={Fcat}/>
        </Left>
        <Right>
            <ProductList FmaxPrice={max!=="All"?max:null} Fcat={cat!=="All Products"?cat:null}/>
        </Right>
    </Container>
  )
}

export default ProductsPage