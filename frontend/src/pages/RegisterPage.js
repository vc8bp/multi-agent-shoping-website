import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  height: 100vh;
  height: 100dvh;
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
  width: 100%;
  max-width: 400px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
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


const RegisterPage = () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(formValues);
    // Here you can add your code to send the form data to the backend.
  };

  return (
    <Container>
      <Title>Register</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          value={formValues.name}
          onChange={handleChange}
        />
        <Input
          type="email"
          name="email"
          placeholder="Email"
          value={formValues.email}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="password"
          placeholder="Password"
          value={formValues.password}
          onChange={handleChange}
        />
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        <Button type="submit">Register</Button>
      </Form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </Container>
  );
};


export default RegisterPage;
