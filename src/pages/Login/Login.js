import { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import Input from '../../helpers/Input';
import { validation } from '../../helpers/validation';
import axios from '../../axios-auth';
import useAuth from "../../hooks/useAuth";
import LoadingButton from "../../UI/LoadingButton/LoadingButton";
import showNotification from "../../helpers/showNotification";


export default function Login() {
  const [auth, setAuth] = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    email: {
      value: '',
      errorMessage: '',
      validation: false,
      rules: ['email']
    },
    password: {
      value: '',
      errorMessage: '',
      validation: false,
      rules: ['required']
    },
    loginInfo: ''
  })

  const buttonHandler = Object.values(form).filter(val => val.validation).length === 2 ? false : true;

  const changeHandler = (val, type) => {
    const errorMessage = validation(form[type].rules, val);
    setForm({
      ...form,
      [type]: { ...form[type], value: val, errorMessage, validation: !errorMessage }
    })
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const loginUser = await axios.post('accounts:signInWithPassword', {
        email: form.email.value,
        password: form.password.value,
        returnSecureToken: true
      });
      setAuth({
        idToken: loginUser.data.idToken,
        email: loginUser.data.email,
        localId: loginUser.data.localId
      });

      const not = {
        title: "Użytkownik został zalogowany",
        message: "Sesja trwa 60 minut",
        type: "success"
      }
      showNotification(not);

      history.push('/');
    }
    catch (err) {
      console.log(err.response.data.error.message)
      if (err.response.data.error.message === 'EMAIL_NOT_FOUND') {
        setForm({ ...form, loginInfo: "Nie znaleziono maila" })
      } else if (err.response.data.error.message === 'INVALID_PASSWORD') {
        setForm({ ...form, loginInfo: 'Nieprawidłowe hasło' });
      } else if (err.response.data.error.message.includes('TOO_MANY_ATTEMPTS_TRY_LATER')) {
        setForm({ ...form, loginInfo: 'Z powodu zbyt dużej ilości prób zalogowania zakończonych niepowodzeniem, konto zostaje chwilowo zablokowane. Spróbuj później' });
      } else {
        setForm({ ...form, loginInfo: "Problemy z zalogowaniem" });
      }
      setLoading(false);
    }


  }


  return (
    <div className="container col-12 col-md-8 col-lg-6 col-xxl-4 mt-5">
      <div className="card">
        <div className="card-header bg-dark text-light">Zaloguj się!</div>
        <div className="card-body">
          {form.loginInfo ? <div className="alert alert-danger">{form.loginInfo}</div> : null}
          <form onSubmit={loginHandler}>

            <div className="mb-3 ">

              <Input
                label="E-mail"
                type="email"
                id="emailInput"
                validation={form.email.errorMessage}
                value={form.email.value}
                onChange={val => changeHandler(val, 'email')}
              />

            </div>

            <div className="mb-3 ">

              <Input
                label="Hasło"
                type="password"
                id="passwordInput"
                value={form.password.value}
                validation={form.password.errorMessage}
                onChange={val => changeHandler(val, 'password')}
              />
            </div>

            <LoadingButton loading={loading} disabled={buttonHandler} title="Zaloguj" />
          </form>
        </div>
        <div className="card-footer">Nie posiadasz jeszcze konta ? <Link to="/register">Zarejestruj się!</Link></div>
      </div>

    </div>
  )
}