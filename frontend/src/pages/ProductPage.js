import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance'
import { useLocation, useNavigate } from 'react-router-dom'
import ProductList from '../components/ProductList';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { loadScript } from '../helpers/payment';
import Modal from '../components/Modal';
import ApplyCoupon from '../components/ApplyCoupon';

const Container = styled.div`
  padding: 1rem 0.5rem;  
  display: flex;
  >* {
    flex: 1;
  }

  @media screen and (max-width: 900px) {
    flex-direction: column;
  }
`;

const ProductImgContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`

const ProductImage = styled.img`

  max-width: 100%;
  max-height: 100%;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;

  padding: 1rem;
  background-color: #fff;
  border-radius: 4px;
`;

const ProductTitleAgentWraper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 60%;
    min-width: 360px;
    @media screen and (max-width: 900px) {
        width: 100%;
    }
    @media screen and (max-width: 410px) {
        gap: 1rem;
        flex-direction: column;
    }

`

const ProductTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ProductPrice = styled.p`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: #333;
`;

const ProductDescription = styled.p`
  font-size: 1rem;
  margin-bottom: 1rem;
  color: #555;
`;

const BottomSection = styled.div`
    display: flex;
    justify-content: space-between;
    
    width: 60%;
    min-width: 360px;
    @media screen and (max-width: 900px) {
        width: 100%;
    }
    @media screen and (max-width: 410px) {
        gap: 1rem;
        flex-direction: column;
    }
`
const QuatitySection = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
    >select {
        border: 1px teal solid;
        padding: 0.3rem 0.6rem;
        color: teal;
    }
`

const ButtonWrapper = styled.div`
    display: flex;
    gap: 0.5rem;
    >* {
        border: none;
        font-size: 1rem;
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s ease-in-out;
        padding: 0.5rem 1rem;
    }
`

const AddToCartButton = styled.button`
  background-color: #f39c12;
  color: white;
  &:hover {
    background-color: #e67e22;
  }
`;

const CouponBtn = styled.p`
  text-decoration: underline;
  font-size: 1.3rem;
  font-weight: 500;
`

const BuyNowButton = styled.button`
  background-color: #3498db;
  color: white;
  &:hover {
    background-color: #2980b9;
  }
`;

const ProductPage = () => {
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false)
  const user = useSelector(p => p.user.user)
  console.log(user)
  const [quantity, setQuantity] = useState(1)
  const dispatch = useDispatch()
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setproduct] = useState({})
  useEffect(() => {
    (async () => {
      try {
        const {data} = await userRequest.get(`/product/${id}`)
        setproduct(data);
      } catch (error) {
        console.log(error)
      }
    })()
  }, [id])
  
  const handleAddToCart = () => {
    dispatch(addToCart({...product, quantity}))
  }
  const navigate = useNavigate()

  const handleBuy = async (e) => {
    e.preventDefault();

    if(Array.isArray(user) || !user) return navigate('/login')

    let Dborder;
    const { address, name, email } = user
    const body = {
      userInfo: {address, name, email},
      product: {
        productID: product._id,
        quantity: +quantity,
      }
    }
    if(selectedCoupon) body["coupon"] = selectedCoupon._id
    await loadScript("https://checkout.razorpay.com/v1/checkout.js")
    try {
      const {data} = await userRequest.post("order/checkout", body)
      Dborder = data.order;
    } catch (error) {
      return
    }

    if(!window.Razorpay) {
      await loadScript("https://checkout.razorpay.com/v5/checkout.js") //script is not loading at first time dk why so i added this XD
    } 



    var options = {
        key: "rzp_test_kFsaE7HQ8hKgsu",
        amount: Dborder.amount,
        currency: "INR",
        name: product.title,
        description: product.description,
        image: product.img,
        order_id: Dborder.id, 
        callback_url: `http://localhost:4000/api/order/verify`,
        prefill: { 
            name: user.name,
            email: user.email,
            contact: 1212121212
        },
        notes: {
          address: "Dummy Office address"
        },
        theme: {
            "color": "#3399cc"
        }
    };

    const rzapi = new window.Razorpay(options);
    rzapi.open();
  }

  return (
    <>
      {product ? 
      <>
        <Container>
            <ProductImgContainer>
                <ProductImage src={product.img} alt={product.title} />
            </ProductImgContainer>
          <ProductDetails>
            <ProductTitleAgentWraper>
              <ProductTitle>{product.title}</ProductTitle>
              <ProductTitle>{product.agent?.name}</ProductTitle>
            </ProductTitleAgentWraper>
            <ProductPrice>Price : {product.price}</ProductPrice>
            <ProductDescription>{product.description}</ProductDescription>
            
            {selectedCoupon ? 
              <CouponBtn onClick={() => setSelectedCoupon(null)} >COUPON : {selectedCoupon.percentageDiscount}% Upto {selectedCoupon.maxDiscountAmount} Rs.</CouponBtn> :
              <CouponBtn onClick={() => setIsCouponModalOpen(p => !p)} >Add Coupon</CouponBtn>
            }
            <BottomSection>
                
                <QuatitySection>
                    Quantity : <select value={quantity} onChange={e => setQuantity(e.target.value)}>{Array(product.stock > 10 ? 10 : product.stock).fill().map((_,i) => <option key={i}>{++i}</option>)}</select>
                </QuatitySection>
                <ButtonWrapper>
                    <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
                    <BuyNowButton onClick={handleBuy} >Buy Now</BuyNowButton>
                </ButtonWrapper>
            </BottomSection>
          </ProductDetails>
        </Container>
        
          <div  style={{margin: "1rem 0"}} >
            <div className="container" >
            <hr></hr>
              <p>More Products of <b>{product?.agent?.name}</b></p>
              <ProductList limit={5} agent={product?.agent} />
            </div>
          </div>
      </>
      : null}

      <Modal isOpen={isCouponModalOpen} setIsOpen={setIsCouponModalOpen} title="Select Offer Coupon" >
        <ApplyCoupon productPrice={product.price} setIsOpen={setIsCouponModalOpen} agent={product?.agent} setSelectedCoupon={setSelectedCoupon} />
      </Modal>
    </>
  );
};

export default ProductPage;
