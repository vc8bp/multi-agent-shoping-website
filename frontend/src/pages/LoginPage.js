import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance'
import ErrorComponent from '../components/ErrorComponent';
import { login } from '../redux/userSlice';

const Container = styled.div`
  height: calc(100vh - 65px);
  height: calc(100dvh - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 100%;
  max-width: 400px;
  text-align: center;
`

const ForContainer = styled.div`
  width: 100%;
  display: flex;

  >div {
    flex: 1;
    border: 1px solid #0077cc;
    border-bottom: 4px solid #0077cc;
    padding: 0.7rem 0;
    
  }
`
const ForSomeone = styled.div`
  background-color: ${props => props.forSeller === true ? "rgb(182 225 255)" : "white"};
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
`;


const Button = styled.button`
  background-color: #0077cc;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 0.5rem;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #0062a3;
  }
`;

const GoToRegister = styled.p`
  >a:hover {
    text-decoration: underline;
  }
`

const LoginPage = () => {
  const location = useLocation() //
  const [forSeller, setforSeller] = useState(location.state?.forSeller || false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [message, setmessage] = useState(null)
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    if(!formValues.email.match(/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/)) { // eslint-disable-line
      return {message: "emai that you entered is not valid"}
    }
    return {success: true}

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = validate();
    if(!valid.success) return setmessage({isError: true, message: valid.message})
    setmessage(null)
    try {
      const res = await userRequest.post('/auth/login',{...formValues, forSeller})
      if(res.status === 200) {
        dispatch(login(res.data))
        navigate("/")
      }
    } catch (error) {
      setmessage({isError: true, message: error.response.data.message})
    }
  };

  return (
    <Container>
      <Wrapper>
        <ForContainer>
          <ForSomeone title='Login as Seller' onClick={() => setforSeller(true)} forSeller={forSeller}>for Seller</ForSomeone>
          <ForSomeone title='Login as User' onClick={() => setforSeller(false)} forSeller={!forSeller}>for User</ForSomeone>
        </ForContainer>
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <Input required type="email" name="email" placeholder="Email"
            value={formValues.email}
            onChange={handleChange}
          />
          <Input required type="password" name="password" placeholder="Password" autoComplete='on'
            value={formValues.password}
            onChange={handleChange}
          />
          {message && <ErrorComponent data={message} set={setmessage} />}
          <Button type="submit">Login as {forSeller ? "Seller" : "User"}</Button>
        </Form>
        <GoToRegister>Don't have an account? <Link to="/register">Register</Link></GoToRegister>
      </Wrapper>
    
    </Container>
  );
};



export default LoginPage;
