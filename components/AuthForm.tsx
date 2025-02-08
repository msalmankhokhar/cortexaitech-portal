import React, { useState } from 'react'
import FloatingInput from './FloatingInput'
import Button from './Button'
import Link from 'next/link'
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { usePageLoading } from '@/Context/LoadingContext';

export type loginType = 'Employee' | 'Admin' | undefined | null;

interface AuthFormProps {
  type?: loginType;
}

export default function AuthForm({ type }: AuthFormProps) {

  const otherType = type === 'Employee' ? 'Admin' : 'Employee';

  // States and router
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { setPageLoading } = usePageLoading();
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setPageLoading(true)
    setLoading(true);
    setError('');
    const formData = new FormData(event.currentTarget as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    const { email, password } = data;
    // Trying to login
    try {
      const result = await signIn('credentials', {
        email,
        password,
        loginType: type,
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
      setError('An unexpected error occured. Report the issue to the dev team!');
    } finally {
      setLoading(false);
      setPageLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col'>
      {/* changed class mb-7 to mb-3.5 */}
      <div className="flex flex-col gap-3 mb-3.5">
        <p className='text-sm mb-1 font-normal text-red-600 dark:text-red-500'>{error}</p>
        <FloatingInput placeholder='Enter your resistered email' name='email' type='email' required />
        <FloatingInput placeholder='Enter your password' name='password' type='password' required />
        <Link href={'/reset-password'} className='self-end text-sm text-blue-600 dark:text-blue-400'>Forgot Password?</Link>
      </div>
      <div>

        {/* Removed class mb-5 from button */}
        <Button type='submit' widthFull disabled={loading}>
          {
            loading ? 'Logging in...' : (
              type ? `Login as ${type}` : 'Login'
            )
          }
        </Button>

        {
          type && (
            <p className='text-sm dark:text-white'>
              <span>
                {
                  type === 'Employee' ? 'Have an Admin account?' : `Not an ${type}?`
                }
              </span>
              {' '}
              <Link href={`/login?type=${otherType}`} className='text-right self-center text-sm text-blue-600 dark:text-blue-400'>Login as {otherType}</Link>
            </p>
          )
        }
        
      </div>
    </form>
  )
}
