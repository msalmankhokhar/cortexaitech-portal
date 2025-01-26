import React from 'react'
import FloatingInput from './FloatingInput'
import Button from './Button'

export default function AuthForm() {
  return (
    <form>
        <div className="flex flex-col gap-3 mb-5">
            <FloatingInput placeholder='Enter your resistered email' name='email' type='email' required />
            <FloatingInput placeholder='Enter your password' name='password' type='password' required />
        </div>
        <Button widthFull>Sign Up</Button>
    </form>
  )
}
