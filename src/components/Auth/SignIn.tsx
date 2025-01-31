import React, { useEffect, useState } from 'react';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, googleAuthProvider } from '../../firebaseConfig';
import Button from '../Button/Button';
import { FirebaseError } from 'firebase/app';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';

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
      // Sprawdź, czy err jest instancją FirebaseError
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/invalid-email":
            setError("Wpisałeś niepoprawny email.");
            break;
          case "auth/wrong-password":
            setError("Wpisałeś niepoprawne hasło.");
            break;
          case "auth/invalid-credential":
            setError("Wpisałeś niepoprawne hasło.");
            break;
          case "auth/missing-password":
            setError("Wpisz hasło.");
            break;
          default:
            setError("Wystąpił nieoczekiwany błąd.");
            console.log(err.message);
        }
      } else if (err instanceof Error) {
        // Obsługa błędów ogólnych
        setError(`Wystąpił błąd: ${err.message}`);
        console.log(err.message);
      } else {
        // Obsługa przypadku, gdy nie wiadomo, co jest w err
        setError("Wystąpił nieznany błąd.");
        console.error(err);
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
    <AuthLayout>
      <form
        onSubmit={handleSignInSubmit}
        className='flex flex-col justify-between gap-y-6'
        >
        <div className="relative w-96 mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="input input-floating input-lg peer"
            id="floatingInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label
            className="input-floating-label"
            htmlFor="floatingInput">Email</label>
        </div>
        <div className="relative w-96 mx-auto">
          <input
            type="password"
            placeholder="Hasło"
            className="input input-floating input-lg peer"
            id="floatingInput"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label
            className="input-floating-label"
            htmlFor="floatingInput">Hasło</label>
        </div>
        <Button
          className='flex w-96 mx-auto'
          type="submit"
          >Zaloguj się</Button>
      </form>
      <div className="mx-auto h-[37px]">
          {error && <p className="text-error text-center mx-auto">{error}</p>}
      </div>
      <div>
        <p className='text-center mt-0'>lub zaloguj się przy użyciu:</p>
        <Button
          className='flex w-96 btn-soft mx-auto'
          onClick={handleGoogleSignIn}
        >
          <span className="icon-[tabler--brand-google]"></span>
        </Button>
      </div>
      <p className='text-center'>
        Nie masz konta? <a className="link link-primary link-animated" href="/signup">Zarejestruj się</a>
      </p>
    </AuthLayout>
  );
};

export default SignIn;
