import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';
import ErrorComponent from '../components/ErrorComponent';

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

const SharedInputStyle = `
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  font-size: 1rem;
`
const Input = styled.input`
  ${SharedInputStyle}
`;
const TextArea = styled.textarea`
  ${SharedInputStyle}
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

const SellerRegisterPage = () => {
  const navigate = useNavigate()
  const [message, setmessage] = useState(null)
  const [formValues, setFormValues] = useState({
    name: '',
    desc: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
    logo: ''
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = () => {
    const emailRegex = "[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,3}$"; // eslint-disable-line
    const numberRegex = "^(\\+\\d{1,3}[- ]?)?\\d{10}$" // eslint-disable-line
    if(!formValues.name.length > 3) return {message: "name can not be less then 3 charectors"}
    if(!formValues.email.match(emailRegex)) return {message: "emai that you entered is not valid"}
    if(!formValues.number.match(numberRegex)) return {message: "Number that you entered is not valid"}
    if(formValues.desc?.length > 1000) return {message: "Description can not be more then 1000 charectors"}
    if(formValues.desc?.length < 50) return {message: "Description can not be less then 50 charectors"}
    if(formValues.password.length < 8) return {message: "Password must be atlist 8 charectors"}
    if(formValues.password !== formValues.confirmPassword) return  {message: "Password with confirm password dosent matched"}
    return {success: true}
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValidate = validate();
    if(!isValidate.success) return setmessage({isError: true, message: isValidate.message})
    setmessage(null)
    try {
      const res = await userRequest.post('/auth/agent/register', formValues)
      if(res.status === 200) navigate('/login', {state: {forSeller: true}})
    } catch (error) {
      setmessage({isError: true, message: error.response.data.message})
    }
  };

  return (
    <Container>
      <Title>Register as Seller</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          required
          type="text"
          name="name"
          placeholder="Name*"
          value={formValues.name}
          onChange={handleChange}
        />
        <TextArea
          rows="10"
          required
          type="text"
          name="desc"
          placeholder="Short Description about your company*"
          value={formValues.desc}
          onChange={handleChange}
        />
        <Input
          required
          type="email"
          name="email"
          placeholder="Email*"
          value={formValues.email}
          onChange={handleChange}
        />
        <Input
          required
          type="tel"
          name="number"
          placeholder="Mobile Number*"
          value={formValues.number}
          onChange={handleChange}
        />
        <Input
          required
          type="password"
          name="password"
          placeholder="Password*"
          autoComplete='on'
          value={formValues.password}
          onChange={handleChange}
        />
        <Input
          required
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password*"
          autoComplete='on'
          value={formValues.confirmPassword}
          onChange={handleChange}
        />
        <Input
          required
          type="url"
          name="logo"
          placeholder="Your Company logo Url*"
          value={formValues.logo}
          onChange={handleChange}
        />
        {message && <ErrorComponent data={message} set={setmessage}></ErrorComponent>}
        <Button type="submit">Register</Button>
      </Form>
      <GoToRegister>Already have an account? <Link to="/login">Login</Link></GoToRegister>
    </Container>
  );
};


export default SellerRegisterPage;
