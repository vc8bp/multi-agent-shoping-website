import React from 'react'
import styled from "styled-components"
import { IoMdClose } from "react-icons/io";

const Container = styled.div`

 position: fixed;
 inset: 0;
 display: flex;
 justify-content: center;
 align-items: center;
 background-color: #00000069;
 flex-direction: column;

 >div{
    min-width: min(90%, 600px);
    border-radius: 0.5rem;
    background-color: white;
    padding: 1rem;
 }
`
const Title = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`



function Modal({children , isOpen, setIsOpen, title }) {
  return isOpen && (
    <Container>
        <div>
            <Title><p>{title || ""}</p> <IoMdClose onClick={() => setIsOpen(false)} /></Title>
            <div>{children }</div>
        </div>
    </Container>
  )
}

export default Modal