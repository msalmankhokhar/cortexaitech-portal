import React, { useState } from 'react'
import FloatingInput from './FloatingInput'
import Button from './Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

type loginType = 'Employee' | 'Admin';

interface AuthFormProps {
  type: loginType;
}

export default function AuthForm({ type }: AuthFormProps) {

  const otherType = type === 'Employee' ? 'Admin' : 'Employee';

  // States
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const {email, password} = data;
    // Trying to login
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.ok) {
        // If login is successfull, redirect user to '/' route
        router.replace('/');
        router.refresh();
      } else {
        setError(result?.error?.toString() || 'Unable to parse error');
      }
    } catch {
      setError('Sorry, an unexpected error occurred!');
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      <div className="flex flex-col gap-3 mb-7">
        <p className='text-sm font-medium text-red-600'>{error}</p>
        <FloatingInput placeholder='Enter your resistered email' name='email' type='email' required />
        <FloatingInput placeholder='Enter your password' name='password' type='password' required />
        <Link href={'/reset-password'} className='self-end text-sm text-blue-600 dark:text-blue-400'>Forgot Password?</Link>
      </div>
      <div>
        <Button type='submit' className='mb-5' widthFull disabled={loading}>
          {
            loading ? 'Logging in...' : `Log In as ${type}`
          }
        </Button>
        <p className='text-sm dark:text-white'>
          <span>{type === 'Employee' ? 'Have an Admin account?' : `Not an ${type}?`}</span>
          {' '}
          <Link href={`/login?type=${otherType}`} className='text-right self-center text-sm text-blue-600 dark:text-blue-400'>Login as {otherType}</Link>
        </p>
      </div>
    </form>
  )
}
