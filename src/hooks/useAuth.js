import { useContext } from 'react';
import AuthContext from '../context/AuthContext';


export default function useAuth() {
  const context = useContext(AuthContext);

  let auth = context.auth;

  const setAuth = user => {
    if (user) {
      context.login(user);
      window.localStorage.setItem('user-auth', JSON.stringify(user));
      setTimeout(() => {
        context.logout()
      }, (1000 * 60 * 60))
    } else {
      context.logout();
      window.localStorage.removeItem('user-auth');
    }
  }

  return [auth, setAuth];
}