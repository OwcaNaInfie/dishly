import React, { useState } from 'react';
import { useAppDispatch } from '../../store';
import { registerUser } from '../../features/auth/authThunks';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '../Layouts/AuthLayout';
import Button from '../Button/Button';
import { FirebaseError } from 'firebase/app';
import { UserGender } from '../../models/User';
import { auth } from '../../firebaseConfig';

const SignUp: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate();
  
  const handleSignUpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const newUser = {
      email,
      password,
      name: 'John',
      surname: 'Doe',
      photoURL: auth.currentUser?.photoURL || "https://cdn.flyonui.com/fy-assets/avatar/avatar-2.png",
      gender: UserGender.MALE,
      bio: 'Opis użytkownika',
      telephone: '000-000-000',
    };

    try {
      await dispatch(registerUser(newUser)).unwrap();
      alert('Rejestracja zakończona sukcesem!');
      navigateTo('/');
    } catch (err) {
      if (err instanceof FirebaseError) {
        switch (err.code) {
          case "auth/weak-password":
            setError("Hasło powinno mieć przynajmniej 6 znaków.");
            break;
          case "auth/invalid-email":
            setError("Email nie jest poprawny.");
            break;
          case "auth/email-already-in-use":
            setError("Ten email ma już konto na dishly.");
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
        setError(`Wystąpił błąd: ${err.message}`);
        console.log(err.message);
      } else {
        setError("Wystąpił nieznany błąd.");
        console.error(err);
      }
    }
  };

  return (
    <AuthLayout>
      <form onSubmit={handleSignUpSubmit} className='flex flex-col justify-between gap-y-6'>
        <div className="relative w-96 mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="input input-floating input-lg peer"
            id="floatingInput"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="input-floating-label" htmlFor="floatingInput">Email</label>
        </div>
        <div className="relative w-96 mx-auto">
          <input
            type="password"
            placeholder="Hasło"
            className="input input-floating input-lg peer"
            id="floatingPassword"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="input-floating-label" htmlFor="floatingPassword">Hasło</label>
        </div>
        <Button className='flex w-96 mx-auto' type="submit">Zarejestruj się</Button>
      </form>
      {error && <p className="text-error text-center mx-auto mt-2">{error}</p>}
      <p className='text-center'>
        Masz już konto? <a className="link link-primary link-animated" href="/signin">Zaloguj się</a>
      </p>
    </AuthLayout>
  );
};

export default SignUp;
