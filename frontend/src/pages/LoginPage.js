import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance'

const Container = styled.div`
  height: calc(100vh - 65px);
  height: calc(100dvh - 65px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
`;

const Form = styled.form`
  gap: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
`;

const ErrorWrapper = styled.div`
  border: solid 1px red;
  padding: 0.4rem 0;
  background-color: #ffcccb;
  border-radius: 1vmin;
`

const Error = styled.p`
  margin: auto;
  width: max-content;
  color: red;
  font-weight: 600;
`

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

const LoginPage = () => {
  const navigate = useNavigate()
  const [message, setmessage] = useState(null)
  const [formValues, setFormValues] = useState({ email: '', password: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    if(!formValues.email.match("/^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/")) { // eslint-disable-line
      return {message: "emai that you entered is not valid"}
    }
    return {success: true}

  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const valid = validate();
    if(!valid.success) return setmessage(valid.message)
    setmessage(null)
    try {
      const res = await userRequest.post('/auth/login',formValues)
      if(res.status === 200) {
        localStorage.setItem("userData", res.data)
        navigate("/")
      }
    } catch (error) {
      setmessage(error.response.data.message)
    }
  };

  return (
    <Container>
      <Title>Login</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          required
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="Password"
          autoComplete='on'
          value={formValues.password}
          onChange={handleChange}
        />
        {message && <ErrorWrapper><Error>{message}</Error></ErrorWrapper>}
        <Button type="submit">Login</Button>
      </Form>
      <p>Don't have an account? <Link to="/register">Register</Link></p>
    
    </Container>
  );
};



export default LoginPage;
