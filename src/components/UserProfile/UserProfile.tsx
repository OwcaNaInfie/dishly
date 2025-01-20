import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import userStore from '../../stores/UserStore';
import { fetchUser } from '../../actions/userActions';

const UserProfile: React.FC<{ userId: string }> = ({ userId }) => {
  const { user } = userStore;

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  if (!user) {
    return <p>Ładowanie danych użytkownika...</p>;
  }

  return (
    <div className="user-profile">
      <h2>{user.name} {user.surname}</h2>
      <p>Email: {user.email}</p>
      <p>Telefon: {user.telephone}</p>
      <p>Ulubione przepisy: {user.favoriteRecipes.length}</p>
      <p>Moje przepisy: {user.myRecipes.length}</p>
      <p>Listy zakupów: {user.shoppingLists.length}</p>
    </div>
  );
};

export default observer(UserProfile);
