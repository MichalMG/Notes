import { Redirect } from "react-router";
import { Route } from 'react-router-dom'
import useAuth from "../../hooks/useAuth"


export default function RouteAuthTrue(props) {
  const [auth] = useAuth();

  return auth ? <Redirect to='/' /> : <Route {...props} />

}