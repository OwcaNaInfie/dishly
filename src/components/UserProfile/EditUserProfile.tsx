import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';
import { updateUser } from '../../actions/userActions';

const EditUserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { user } = userStore;
  const [formData, setFormData] = useState({
    name: user?.name || '',
    surname: user?.surname || '',
    telephone: user?.telephone || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await updateUser(userId, formData);
    alert('Dane zaktualizowane!');
  };

  if (!user) {
    return <p>Ładowanie danych użytkownika...</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Imię:</label>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Nazwisko:</label>
        <input
          name="surname"
          value={formData.surname}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Telefon:</label>
        <input
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Zapisz zmiany</button>
    </form>
  );
};

export default observer(EditUserProfile);
