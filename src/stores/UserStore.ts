import { makeAutoObservable } from 'mobx';
import { User } from '../models/User';

class UserStore {
  user: User | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  setUser(user: User) {
    this.user = user;
  }

  updateUser(updatedUser: Partial<User>) {
    if (this.user) {
      this.user = { ...this.user, ...updatedUser };
    }
  }

  clearUser() {
    this.user = null;
  }
}

const userStore = new UserStore();
export default userStore;
