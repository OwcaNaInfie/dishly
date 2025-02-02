import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../store';
import { fetchUser, updateUser } from '../../features/profileSlice';
import { User, UserGender } from '../../models/User';
import Button from '../Button/Button';
import { getAuth } from 'firebase/auth';


const UserProfile: React.FC = () => {
  const auth = getAuth();
  const userId = auth.currentUser?.uid; // Pobierz ID aktualnego użytkownika
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.profile.user);

  const [formData, setFormData] = useState<User | null>(null);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        ...currentUser,
        name: currentUser.name || '',
        surname: currentUser.surname || '',
        displayName: `${currentUser.name || ''} ${currentUser.surname || ''}`,
        gender: currentUser.gender || UserGender.MALE,
        bio: currentUser.bio || '',
        email: currentUser.email || '',
        telephone: currentUser.telephone || '',
      });
    }
  }, [currentUser, userId]);

  useEffect(() => {
      // Inicjalizacja FlyonUI Dropdown
      window.HSStaticMethods.autoInit(["dropdown"]);
    }, []);

  useEffect(() => {
    if (userId) { // Tylko jeśli userId istnieje
      dispatch(fetchUser(userId));
    }
  }, [dispatch, userId]); // Dodaj userId do zależności

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (!formData) return;
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (gender: UserGender) => {
    if (!formData) return;
    setFormData({ ...formData, gender });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData) return;

    dispatch(updateUser(formData));
  };

  if (!formData) return <p>Ładowanie danych...</p>;

  return (
    <form onSubmit={handleSubmit} className='card-body flex flex-col gap-y-6 border border-neutral'>
      {[
        { label: 'Imię', name: 'name', type: 'text', value: formData.name },
        { label: 'Nazwisko', name: 'surname', type: 'text', value: formData.surname },
        { label: 'Email', name: 'email', type: 'email', value: formData.email },
        { label: 'Numer telefonu', name: 'telephone', type: 'tel', value: formData.telephone },
      ].map(({ label, name, type, value }) => (
        <div key={name} className="relative w-96 mx-auto">
          <label className="label label-text" htmlFor={name}>
            {label}
          </label>
          <input
            type={type}
            name={name}
            className="input"
            placeholder={label}
            value={value}
            onChange={handleChange}
          />
        </div>
      ))}

      <div className=" mx-auto dropdown relative inline-flex w-96">
        <button type="button" className="w-96 dropdown-toggle btn btn-soft">
          {formData.gender}
        </button>
        <ul className="dropdown-menu min-w-60">
          {Object.values(UserGender).map((genderOption) => (
            <li key={genderOption}>
              <a
                className="dropdown-item"
                onClick={() => {
                  handleGenderChange(genderOption);
                }}
              >
                {genderOption}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative w-96 mx-auto">
        <label className="label label-text" htmlFor="bio">
          Bio
        </label>
        <textarea
          maxLength={200}
          className="textarea"
          name="bio"
          placeholder="Bio"
          id="description"
          value={formData.bio}
          onChange={handleChange}
        ></textarea>
      </div>

      <Button type="submit">Zapisz zmiany</Button>
    </form>
  );
};

export default UserProfile;