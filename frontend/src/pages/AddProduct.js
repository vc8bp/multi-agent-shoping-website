import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 2rem;
`;

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  width: 100%;
  max-width: 600px;
`;

const Label = styled.label`
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
`;

const Input = styled.input`
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const TextArea = styled.textarea`
  font-size: 1.2rem;
  padding: 0.5rem;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
`;

const Button = styled.button`
  background-color: #4CAF50;
  border: none;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 1.2rem;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 1rem;
`;

const AddProduct = () => {
  console.log("hello")
  const initialState = {title: '', description: '', img: '', price: '', stock: ''}
  const [product, setProduct] = useState(initialState);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(product);
    setProduct(initialState);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <InputGroup>
        <Label htmlFor="title">Title</Label>
        <Input type="text" name="title"id="title"
          value={product.title}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="description">Description</Label>
        <TextArea name="description" id="description" rows="5"
          value={product.description}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="img">Image URL</Label>
        <Input type="url" name="img" id="img"
          value={product.img}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="price">Price</Label>
        <Input type="number" name="price" id="price"
          value={product.price}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <InputGroup>
        <Label htmlFor="stock">Stock</Label>
        <Input type="number" name="stock" id="stock"
          value={product.stock}
          onChange={handleChange}
          required
        />
      </InputGroup>
      <Button type="submit">Add Product</Button>
      </Form>
)}

export default AddProduct
