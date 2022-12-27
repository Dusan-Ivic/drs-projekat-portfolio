import React, { useState } from "react";

export const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email);
    console.log(password);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="email">Email:</label>
        <input name="email" id="email" type="email" placeholder="email@email.com"></input>
        <label for="password">Password:</label>
        <input name="password" id="password" type="password" placeholder="*******"></input>
        <label for="name">Name:</label>
        <input name="password" id="password" type="password" placeholder="*******"></input>
        <button type="submit">Log in</button>
      </form>
      <button>Don't have an account? Register.</button>
    </>
  )
}