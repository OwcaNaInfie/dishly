import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { loginUser, loginWithGoogle } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import Button from '../Button/Button';
import { FirebaseError } from 'firebase/app';

const SignIn: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();

  const handleSignInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigateTo('/');
    } catch (err) {
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
      setError('Wystąpił nieznany błąd.');
    }
  };

  const handleGoogleSignIn = async () => {
    setError('');
    try {
      await dispatch(loginWithGoogle()).unwrap();
      navigateTo('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        setError(err.message);
      } else {
        setError('Wystąpił nieznany błąd.');
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSignInSubmit} className='flex flex-col justify-between gap-y-6'>
        <div className="relative w-96 mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="input input-floating input-lg peer"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-floating-label" htmlFor="email">Email</label>
        </div>
        <div className="relative w-96 mx-auto">
          <input
            type="password"
            placeholder="Hasło"
            className="input input-floating input-lg peer"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="input-floating-label" htmlFor="password">Hasło</label>
        </div>
        <Button className='flex w-96 mx-auto' type="submit">Zaloguj się</Button>
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