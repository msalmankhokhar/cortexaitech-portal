import React from 'react'
import FloatingInput from './FloatingInput'
import Button from './Button'
import Link from 'next/link'

interface AuthFormProps {
  type: 'Employee' | 'Admin';
}

export default function AuthForm({type}: AuthFormProps) {
  return (
    <form>
        <div className="flex flex-col gap-3 mb-4">
            <FloatingInput placeholder='Enter your resistered email' name='email' type='email' required />
            <FloatingInput placeholder='Enter your password' name='password' type='password' required />
            <Link href={'#'} className='self-end text-sm text-blue-400'>Forgot Password?</Link>
        </div>
        <Button className='' widthFull>Log In</Button>
    </form>
  )
}
