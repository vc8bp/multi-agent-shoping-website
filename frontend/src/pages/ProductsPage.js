import React, {useState} from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import ProductList from '../components/ProductList'
import ProductsFilter from '../components/ProductsFilter'

const Container = styled.div`
display: unset;
    display: flex;
`
const Left = styled.div`
    height: 100vh;
    height: 100dvh;
    position: sticky;
    top: 0;
    flex: 1;
    min-width: 200px;
`
const Right = styled.div`
    background-color: #eee;
    flex: 8;
`

function ProductsPage() {
    const location = useLocation();
    const agent = location.state?.agent || null;
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
            <ProductList FmaxPrice={max!=="All"?max:null} Fcat={cat!=="All Products"?cat:null}  agent={agent} paginate={true}/>
        </Right>
    </Container>
  )
}

export default ProductsPage