'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import {useAppSelector } from '../hooks/redux-hook';
import { Button } from '@/components/ui/button';
import GoogleIcon from '@/components/custom/GoogleIcon';
export default function Home() {
  const  isAuth =  useAppSelector(state=>state.UserAuth.isAuth);
  const [isLoaded,setLoading]=useState(false);
  const router = useRouter();
  const SignIn=async()=>{
 try {
  window.location.href = "http://localhost:3001/email/google/login";
 } catch (error) {
  console.error(error);
 }
  }

  useEffect(() => {
    setLoading(true);
    if (isLoaded && isAuth) {
      router.replace('/dashboard')
    }
  }, [isLoaded, isAuth, router])

  if (!isLoaded) return null

  if (!isAuth) {
    return <div className='flex justify-center items-center h-screen w-screen'>
      <Button variant="default"
       onClick={SignIn}
      >
        <span><GoogleIcon/></span>Connect With Google Account</Button>
    </div>
  }

  return null
}
