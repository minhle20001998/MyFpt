import React, { useEffect } from 'react'
import { useNavigate } from 'react-router';
import { useUser } from '../context/AuthContext';

interface PropsType {
  children: JSX.Element
}

export default function AuthRoutes(props: PropsType) {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate])

  return (
    <div>{!user && props.children}</div>
  )
}
