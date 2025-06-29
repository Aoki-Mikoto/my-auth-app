'use client'

import { useState } from 'react'

export default function Signup() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [strength, setStrength] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()

    const res = await fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()
    alert(data.message)
  }

  // パスワード強度を判定する関数
  const checkStrength = (value) => {
    if (value.length < 6) {
      setStrength('弱い')
    } else if (
      value.match(/[0-9]/) &&
      value.match(/[A-Z]/) &&
      value.length >= 8
    ) {
      setStrength('強い')
    } else {
      setStrength('普通')
    }
  }

  return (
    <div>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        /><br />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
            checkStrength(e.target.value)
          }}
        /><br />
        <p>パスワード強度: {strength}</p>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}
