import React, { useEffect } from 'react'
import styled from 'styled-components';
import {ReactComponent as CrossIcon} from '../assets/cross.svg'

const ErrorWrapper = styled.div`
  position: relative;
  border: solid 1px ${p => p.isError ? "red" : "green"};
  padding: 0.4rem 0;
  background-color: ${p => p.isError ? "#ffcccb" : "#a6f7a8"};
  border-radius: 1vmin;

  >p {
    color: ${p => p.isError ? "red" : "green"};
  }
`

const Error = styled.p`
  width: 100%;
  margin: auto;
  width: max-content;

  font-weight: 600;

  >svg {
    cursor: pointer;
    position: absolute;
    height: 100%;
    width: 20px;
    right: 10px;
    top: 0;
    bottom: 0;
  }
`

function ErrorComponent({data, set}) {
    const id = Math.random() * 1000

    useEffect(() => {
        let interval;
        if(data) {
          interval = setInterval(() => {
            set(null);
          }, 5000);
        }
      
        return () => clearInterval(interval);
      }, [id]);

  return (
    <>
    <ErrorWrapper isError={data?.isError}>
        <Error>
            {data?.message}<CrossIcon onClick={() => set(false)}/>
        </Error>
    </ErrorWrapper>
    </>
  )
}

export default ErrorComponent