import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { logout } from '../actions/userActions'
import { ViewResponsive } from '../components/View'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import accountImg from '../assets/greyscale_mountains.jpg'


export default function Account() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <ViewResponsive imageUrl={process.env.PUBLIC_URL + accountImg}>
      <LinkText to='/shipping'>Shipping address</LinkText>
      <LinkText to='/cart'>Cart</LinkText>
      <LinkText to='/my-orders'>Orders</LinkText>
      <Text onClick={() => { 
        dispatch(logout())
        navigate('/portal')
        }}>Logout</Text>
    </ViewResponsive>
  )
}

const LinkText = styled(Link)`
color: rgba(255, 235, 148, 0.945);
font-size: 2rem;
font-weight: bold;
text-align: center;
align-self: center;
justify-self: center;
text-decoration: none;
align-self: center;
margin: auto;
`

const Text = styled.h2`
color: rgba(255, 235, 148, 0.945);
font-size: 2rem;
font-weight: bold;
text-align: center;
align-self: center;
justify-self: center;
text-decoration: none;
align-self: center;
margin: auto;
`
