import axiosAuth from "../../axios-auth";
import axios from '../../axios-firebase';
import { useState } from "react"
import { Link, useHistory } from "react-router-dom";
import Input from '../../helpers/Input';
import { validation } from '../../helpers/validation';
import useAuth from "../../hooks/useAuth";
import LoadingButton from '../../UI/LoadingButton/LoadingButton';
import showNotification from "../../helpers/showNotification";


export default function Login() {
  const history = useHistory();
  const [auth, setAuth] = useAuth();
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
      rules: ['password']
    },
    checkbox: {
      value: '',
      errorMessage: '',
      validation: false,
      rules: ['checkbox']
    },
    validationMessage: ''
  })

  const buttonHandler = Object.values(form).filter(val => val.validation).length === 3 ? false : true;

  const changeHandler = (val, type) => {
    const errorMessage = validation(form[type].rules, val);
    setForm({
      ...form,
      [type]: { ...form[type], value: val, errorMessage, validation: !errorMessage },
      validationMessage: ''
    })
  }

  const loginHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await axiosAuth.post('accounts:signUp', {
        email: form.email.value,
        password: form.password.value,
        returnSecureToken: true
      });

      await axios.post(`/${user.data.localId}.json?auth=${user.data.idToken}`, {
        title: 'Witaj w świecie notatek',
        body: 'W łatwy i szybki sposób możesz tworzyć, usuwać oraz edytować notatki',
        bgColor: "#ffc107",
        textColor: "#000000",
        localId: user.data.localId
      })

      setAuth({
        idToken: user.data.idToken,
        email: user.data.email,
        localId: user.data.localId
      });

      const not = {
        title: "Użytkownik został zarejestrowany",
        message: "Zalogowano na konto",
        type: "success"
      }
      showNotification(not);

      history.push('/');
    } catch (err) {
      if (err.response.data.error.message === 'EMAIL_EXISTS') {
        setForm({ ...form, validationMessage: 'Taki adres email istnieje już w bazie' })
      } else {
        setForm({ ...form, validationMessage: 'Wystąpił problem z rejestracją! Spróbuj jeszcze raz' })
      }
      setLoading(false);
    }

  }


  return (
    <div className="container col-12 col-md-8 col-lg-6 col-xxl-4 mt-5">

      <div className="card">
        <div className="card-header bg-dark text-light">Zarejestruj się!</div>
        <div className="card-body">
          {form.validationMessage && <div className="alert alert-danger">{form.validationMessage}</div>}
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
                placeholder="wpisz hasło"
                type="password"
                id="passwordInput"
                value={form.password.value}
                validation={form.password.errorMessage}
                onChange={val => changeHandler(val, 'password')}
              />
            </div>


            <div className="mb-3 ">
              <Input
                label="Akceptuję regulamin ..."
                type="checkbox"
                id="checkboxInput"

                //
                checked={form.checkbox.value}
                validation={form.checkbox.errorMessage}
                onChange={val => changeHandler(val, 'checkbox')}
              //
              />

            </div>
            <LoadingButton loading={loading} disabled={buttonHandler} title='Zarejestruj' />

          </form>
        </div>
        <div className="card-footer">Posiadasz już konto ? <Link to="/login">Zaloguj się!</Link></div>
      </div>

    </div>
  )
}