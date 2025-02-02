import React from 'react';
import { useAppDispatch } from '../../store';
import { deleteUser } from '../../features/profileSlice';
import Button from '../Button/Button';
import { getAuth } from 'firebase/auth';
import EditUserProfile from '../UserProfile/EditUserProfile'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { Notyf } from 'notyf';

// Create an instance of Notyf
const notyf = new Notyf();

const UserProfile: React.FC = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Pobierz ID aktualnego użytkownika
  const dispatch = useAppDispatch();
  const navigateTo = useNavigate()

  // Funkcja do usuwania użytkownika
  const handleDeleteUser = () => {
    if (userId) {
      dispatch(deleteUser(userId)); // Wywołanie deleteUser z profileSlice
    }
  
    // Wyświetlenie notyfikacji
    notyf.success('Konto usunięte pomyślnie');
  
    // Opóźnienie wylogowania o 3 sekundy (3000 ms)
    setTimeout(() => {
      signOut(auth).then(val => {
        console.log(val);
        navigateTo("/singin");
      });
    }, 3000); // 3000 ms = 3 sekundy
  };

  return (
    <div className="user-profile">
      {/* Sekcja do edycji użytkownika */}
      <EditUserProfile />

      {/* Przycisk usuwania użytkownika */}
      <Button onClick={handleDeleteUser} className="btn btn-error btn-soft btn-block mt-4">
        Usuń konto
      </Button>
    </div>
  );
};

export default UserProfile;
