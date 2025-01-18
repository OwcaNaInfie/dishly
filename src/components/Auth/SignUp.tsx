import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebaseConfig';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom'

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigateTo = useNavigate()

  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert('Rejestracja zakończona sukcesem!');
      navigateTo("/")

    } catch (err) {
      if (err instanceof FirebaseError) {
							setError(err.message);
						} else {
							setError('Wystąpił nieoczekiwany błąd.');
						}
    }
  };

  return (
    <div>
      <h2>Rejestracja</h2>
      <form onSubmit={handleSignUpSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Zarejestruj się</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SignUp;
