import React, { useEffect } from 'react'
import styled from 'styled-components';

const ErrorWrapper = styled.div`
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
`

function ErrorComponent({data, set}) {
    const id = Math.random() * 1000
    console.log(id)
    useEffect(() => {
        console.log('ErrorComponent mounted');
        let interval;
        if(data) {
          interval = setInterval(() => {
            console.log('Clearing error message');
            set(null);
          }, 5000);
        }
      
        return () => clearInterval(interval);
      }, [id]);

      

      
  return (
    <>
    <ErrorWrapper isError={data?.isError}>
        <Error>
            {data?.message}
        </Error>
    </ErrorWrapper>
    </>
  )
}

export default ErrorComponent