import { createContext } from "react";

const AuthContext = createContext({
  auth: null,
  login: () => { },
  logout: () => { }
})

AuthContext.displayName = "AuthContext"

export default AuthContext;