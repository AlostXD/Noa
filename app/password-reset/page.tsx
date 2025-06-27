"use client";

import React, { useState } from 'react';

export default function PasswordReset() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setMessage('E-mail de redefinição enviado com sucesso!');
      } else {
        setMessage('Erro ao enviar o e-mail. Tente novamente.');
      }
    } catch (error) {
      setMessage('Erro ao enviar o e-mail. Tente novamente.',);
      console.error('Erro ao enviar o e-mail:', error);
    }
  };

  return (
    <div>
      <h1>Redefinir Senha</h1>
      <form onSubmit={handleSubmit}>
        <label>
          E-mail:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}