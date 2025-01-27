import React from 'react'
import FloatingInput from './FloatingInput'
import Button from './Button'
import Link from 'next/link'

type loginType = 'Employee' | 'Admin';

interface AuthFormProps {
  type: loginType;
}

function handleSubmit(event: React.FormEvent) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget as HTMLFormElement);
  const data = Object.fromEntries(formData.entries());
  console.log(data);
}

export default function AuthForm({type}: AuthFormProps) {
  const otherType = type === 'Employee' ? 'Admin' : 'Employee';
  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
        <div className="flex flex-col gap-3 mb-7">
            <FloatingInput placeholder='Enter your resistered email' name='email' type='email' required />
            <FloatingInput placeholder='Enter your password' name='password' type='password' required />
            <Link href={'/reset-password'} className='self-end text-sm text-blue-600 dark:text-blue-400'>Forgot Password?</Link>
        </div>
        <div>
          <Button type='submit' className='mb-5' widthFull>Log In as {type}</Button>
          <p className='text-sm dark:text-white'>
            <span>{type === 'Employee' ? 'Have an Admin account?' : `Not an ${type}?`}</span>
            {' '}
            <Link href={`/login?type=${otherType}`} className='text-right self-center text-sm text-blue-600 dark:text-blue-400'>Login as {otherType}</Link>
          </p>
        </div>
    </form>
  )
}
