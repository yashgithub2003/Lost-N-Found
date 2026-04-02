import { useAuth } from '@/context/AuthContext'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = ({children}) => {
    const { user } = useAuth();
    const navigate = useNavigate();
    useEffect(() => {
        if(!user){
            navigate('/login');
        }
    },[])
  return <>{children}</>
}

export default ProtectedRoutes