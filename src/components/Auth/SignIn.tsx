import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebaseConfig';
import Button from '../Button/Button';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [value, setValue] = useState<string | null>(null);

  const navigateTo = useNavigate();

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert('Logowanie zakończone sukcesem!');
      navigateTo('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('Wystąpił nieoczekiwany błąd.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const data = await signInWithPopup(auth, googleAuthProvider);
      const userEmail = data.user.email || '';
      setValue(userEmail);
      localStorage.setItem('email', userEmail);
      navigateTo('/');
    } catch (err) {
      console.error('Błąd podczas logowania Google:', err);
    }
  };

  useEffect(() => {
    if (value) {
      // Przekieruj tylko wtedy, gdy `value` istnieje
      navigateTo('/');
    }
  }, [value, navigateTo]); // Monitoruj zmiany `value`
  

  return (
    <div>
      <h2>Logowanie</h2>
      <form onSubmit={handleSignInSubmit}>
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
        <button type="submit">Zaloguj się</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <div>
        <p>lub</p>
        <Button onClick={handleGoogleSignIn}>
          <span className="icon-[tabler--brand-google]"></span> Zaloguj się z Google
        </Button>
      </div>
      <p>Nie masz konta? <a href="/signup">Zarejestruj się</a></p>
    </div>
  );
};

export default SignIn;
