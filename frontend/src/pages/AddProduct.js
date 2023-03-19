import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { userRequest } from '../axiosInstance';
import ErrorComponent from '../components/ErrorComponent';

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
  resize: none;
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

const ImagePreview = styled.img`
  width: 80%;
  margin: 1rem auto;
  border-radius: 10px;
`

const PreviewButton = styled.button`
  border: 1px solid grey;
  background: none;
  padding: 0.3rem 1rem;
  :disabled {
    cursor: not-allowed;
  }
`


const AddProduct = () => {
  const [previewisHide, setPreviewisHide] = useState(false)
  const agent = useSelector(s => s.user.user);
  const initialState = {title: '', description: '', img: '', price: '', stock: ''}
  const [product, setProduct] = useState(initialState);
  const [message, setMessage] = useState()

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const {data} = await userRequest.post("/product",{...product, agent: agent.name})
      setMessage({isError: false, message: "Product Added Sucessfully"})
      setProduct(initialState);
    } catch (error) {
      setMessage({isError: true, message: error.response.data.message})
      console.log(error)
    }
    
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
        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
          <Label htmlFor="img">Image URL</Label>
          <PreviewButton 
            onClick={() => setPreviewisHide(p => !p)}
            type="button"
            disabled={!product.img ? true : false}>
              {previewisHide ? "Hide Preview" : "Preview"}
          </PreviewButton>
        </div>
        <Input type="url" name="img" id="img"
          value={product.img}
          onChange={handleChange}
          required
        />
      {product.img && previewisHide &&<ImagePreview src={product.img}></ImagePreview>}
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
      {message && <InputGroup><ErrorComponent data={message} set={setMessage} /></InputGroup>}
      <Button type="submit">Add Product</Button>
      </Form>
)}  

export default AddProduct
