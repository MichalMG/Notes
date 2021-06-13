import { Redirect } from "react-router";
import { Route } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"


export default function RouteAuth(props) {
  const [auth] = useAuth();

  return auth ? <Route {...props} /> : <Redirect to="/login" />

}