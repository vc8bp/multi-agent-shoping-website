import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';

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
  display: flex;
  flex-direction: column;
  gap: 1rem;
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


const RegisterPage = () => {
  const navigate = useNavigate()
  const [message, setmessage] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-]+)(\.[a-zA-Z]{2,5}){1,2}$/; // eslint-disable-line
    if(!formValues.name.length > 3) return {message: "name can not be less then 3 charectors"}
    if(!formValues.email.match(emailRegex)) return {message: "emai that you entered is not valid"}
    if(formValues.password.length < 8) return {message: "Password must be atlist 8 charectors"}
    if(formValues.password !== formValues.confirmPassword) return  {message: "Password with confirm password dosent matched"}
    return {success: true}
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidate = validate();
    if(!isValidate.success) return setmessage(isValidate.message)
    setmessage(null)
    try {
      const res = await userRequest.post('/auth/register', formValues)
      if(res.status === 200) navigate('/login')
    } catch (error) {
      setmessage(error.response.data.message)
    }
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          required
          type="text"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
        />
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
        <Input
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          autoComplete='on'
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        {message && <ErrorWrapper><Error>{message}</Error></ErrorWrapper>}
        <Button type="submit">Register</Button>
      </Form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Container>
  );
};


export default RegisterPage;
