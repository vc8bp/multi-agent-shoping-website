import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import SingleOrderSection from './SingleOrderSection'
import { useSelector } from 'react-redux'
import ProductNotFound from '../../components/ProductNotFound'
import { userRequest } from '../../axiosInstance'


const Container = styled.div`
    width: 100%;
    background-color: ${p => p.isOrders ? " #e0dede" : "white"};
    padding: 20px 0px;
`
const TopSection = styled.div`
    display: flex;
    margin-bottom: 20px;

`
const Title = styled.h1`
    margin-left: 10px;
`
const Desc = styled.span`

`

const BottomSection = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    gap: 15px;
`





function OrdersPage() {
    const user = useSelector(state => state.user?.user);
    const [orders, setOrders] = useState([])

    useEffect(() => {
      const fetchOrders = async () => {
        try {
            const {data} = await userRequest.get(`/order/find/${user._id}`)
            setOrders(data)
            console.log(data)
        } catch (error) {
            setOrders([])
        }
      }
      fetchOrders()
    }, [])
    
  return (
    <>
        <Container isOrders={orders.length}>

            {!orders.length ? <ProductNotFound title="No Orders Found" desc="Sorry, it looks like you haven't placed any orders yet."/>  
                : <div className="container">
                    <TopSection>
                        <Title>Your Orders</Title>
                    </TopSection>
                    <BottomSection>
                        {orders.map(i => {
                                return <SingleOrderSection key={i._id} order={i}  />
                            })}
                    </BottomSection>
                </div>
            }
        </Container>
    </>
  )
}

export default OrdersPage