import React from 'react'
import { Link, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import AdminVerifyPage from './AdminVerifyPage'

const Container = styled.div`
  width: 100%;

`
const Nav = styled.nav`
  background-color: teal;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
  >a {
    text-decoration: none;
    color: white;
  }
`

function AdminDashboard() {
  return (
    <Container>
      <Nav>
        <Link to="/dashboard/home">Agent</Link>
      </Nav>
      <Routes>
        <Route path='/home' element={<AdminVerifyPage/>}/>
      </Routes>
    </Container>
  )
}

export default AdminDashboard