import React from 'react'


const { useState } = React;

export default function SignupOTP () {
  const [otp, setOtp] = useState('');

  const handleChange = (newValue) => {
    setOtp(newValue)
  }

  return (
    <MuiOtpInput value={otp} onChange={handleChange} length={6}/>
  )
}