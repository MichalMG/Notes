import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import showNotification from '../../helpers/showNotification';

function Header() {

  const [auth, setAuth] = useAuth();

  const logoutHandler = () => {

    const not = {
      title: "Użytkownik został wylogowany",
      message: "zapraszamy ponownie",
      type: "warning"
    }
    showNotification(not);

    setAuth(null)
  }

  return (
    <div className="p-3 shadow-sm text-light bg-dark">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-4 col-md-6 p-0" >
            <Link to="/" className="text-light text-decoration-none">

              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-stickies" viewBox="0 0 16 16">
                  <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                  <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                </svg>
              </span>
              <span className="ms-2">Notatnik</span>
            </Link>

          </div>
          <div className="text-end col-8 col-md-6 p-0">
            {auth
              ? (<>
                <Link to='/profile' className="me-3 text-light">
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" className="bi bi-person-fill" viewBox="0 0 16 16">
                    <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H3zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                  </svg>
                </Link>
                <button onClick={logoutHandler} className="btn btn-warning">Wyloguj</button>
              </>
              )
              : (<>
                <Link to="/login" className="btn btn-warning">Zaloguj</Link>
                <Link to="/register" className="btn ms-2 btn-primary">Zarejestruj</Link>
              </>)}
          </div>
        </div>
      </div>
    </div>
  )
}


export default Header;