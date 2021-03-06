import { useState } from 'react';
import { useHistory } from 'react-router';
import { Link } from 'react-router-dom'
import Input from '../../helpers/Input';
import LoadingButton from '../../UI/LoadingButton/LoadingButton';
import { validation } from '../../helpers/validation';
import useAuth from '../../hooks/useAuth';
import axiosAuth from '../../axios-auth';
import axios from '../../axios-firebase';
import showNotification from '../../helpers/showNotification';
import Modal from '../../components/Modal/Modal';

export default function ProfileDetails() {

  const [auth, setAuth] = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
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
      validation: true,
      rules: ['changePassword']
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

    const updateUser = {
      idToken: auth.idToken,
      email: form.email.value,
      returnSecureToken: true
    }

    if (form.password.value) {
      updateUser.password = form.password.value;
      console.log(form.password.value)
    }

    console.log(updateUser);

    try {
      const loginUser = await axiosAuth.post('/accounts:update/', updateUser);
      console.log(loginUser.data);
      setAuth({
        idToken: loginUser.data.idToken,
        email: loginUser.data.email,
        localId: loginUser.data.localId
      });


      const not = {
        title: "Aktualizacja danych.",
        message: "Dane u??ytkownika zosta??y zaktualizowane",
        type: "success"
      }
      showNotification(not);


      history.push('/');

    }
    catch (err) {
      console.log(err.response.data.error.message);
      if (err.response.data.error.message === 'EMAIL_EXISTS') {
        setForm({ ...form, loginInfo: "Taki mail ju?? istnieje" })
      } else if (err.response.data.error.message === 'CREDENTIAL_TOO_OLD_LOGIN_AGAIN' || err.response.data.error.message === 'INVALID_ID_TOKEN' || err.response.data.error.message === 'TOKEN_EXPIRED') {
        setForm({ ...form, loginInfo: 'Wyst??pi?? b????d z kontem. Prosz?? wylogowa?? i zalogowa?? si?? ponownie' });
      } else {
        setForm({ ...form, loginInfo: "Problemy z aktualizacj??. Prosz?? o kontakt z administratorem" });
      } setLoading(false);
    }
  }

  const deleteUser = async () => {
    setLoading(true);
    try {
      await axios.delete(`/${auth.localId}.json?auth=${auth.idToken}`);
      await axiosAuth.post('/accounts:delete', { idToken: auth.idToken });
      const not = {
        title: "Konto zosta??o usuni??te",
        message: " ",
        type: "warning"
      }
      showNotification(not);
      setLoading(false);
      setAuth(null);
      history.push('/');
    } catch (err) {
      const not = {
        title: "Wyst??pi??y problemy z serwerem",
        message: "Bardzo prosz?? zalogowa?? si?? i spr??bowa?? ponownie.",
        type: "warning"
      }
      showNotification(not);
      setAuth(null);
    }
  }

  return (
    <div className="container text-center col-12 col-md-8 col-lg-6 col-xxl-4 my-4 ">

      <h3>Tw??j profil</h3>
      <p className="text-muted mb-0">Mo??esz tutaj zaktualizowa?? swoje dane logowania oraz usun???? konto.</p>
      <p className="text-muted mb-0">Je??li chcesz zmieni?? maila to wpisz nowego maila i kliknij aktualizuj, </p>
      <p className="text-muted">przy zmianie has??a konieczne jest podanie aktualnego maila</p>

      {form.loginInfo ? <div className="alert alert-danger">{form.loginInfo}</div> : null}
      <form onSubmit={loginHandler} className="text-start">

        <div className="mb-3 ">

          <Input
            label="E-mail"
            type="email"
            id="emailInput"
            placeholder={auth.email}
            validation={form.email.errorMessage}
            value={form.email.value}
            onChange={val => changeHandler(val, 'email')}
          />

        </div>

        <div className="mb-3 ">

          <Input
            label="Has??o"
            type="password"
            id="passwordInput"
            value={form.password.value}
            validation={form.password.errorMessage}
            onChange={val => changeHandler(val, 'password')}
          />
        </div>

        <LoadingButton color="success" loading={loading} disabled={buttonHandler} title="Aktualizuj" />
        <Link to="/" className="btn btn-outline-secondary ms-2">Wr???? do notatek</Link>
      </form>

      <div className="card-footer mt-4 text-muted d-flex flex-column align-items-center justify-content-center">
        <span>W ka??dej chwili mo??esz te?? usun???? konto.</span>
        <button onClick={() => setConfirmDelete(true)} className="btn btn-link link-danger ms-1 p-0 shadow-none">Kliknij i usu?? konto</button>

        {confirmDelete
          ? (<Modal>
            <div className="d-flex justify-content-center align-items-center">
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Usuwanie konta</h5>
                    <button type="button" className="btn-close" onClick={() => setConfirmDelete(false)}></button>
                  </div>

                  <div className="modal-body">
                    <p className="card-text mb-0">Czy jeste?? pewien, ??e chcesz usun???? konto?</p>
                    <p className="card-text">Operacja jest nieodwracalna.</p>
                  </div>
                  <div className="modal-footer">
                    <LoadingButton type="button" color="danger" title="Potwierdzam" onClick={deleteUser} loading={loading} />
                    <button onClick={() => setConfirmDelete(false)} className="btn btn-secondary ms-2">Rezygnuj??</button>
                  </div>
                </div>
              </div>
            </div>
          </Modal>)
          : null}
      </div>

    </div>
  )
}