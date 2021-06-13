import Header from './components/Header/Header';
import EditNote from './components/Notes/EditNote/EditNote';
import ReducerContext from './context/ReducerContext';
import React, { useReducer } from 'react';
import { reducer, initialState } from './reducer';
import Footer from './components/Footer/Footer';
import { HashRouter as Router, Route, Switch } from 'react-router-dom'
import Login from './pages/Login/Login';
import NotesHome from './pages/NotesHome/NotesHome';
import Layout from './Layout/Layout';
import Registration from './pages/Registration/Registration';
import AuthContext from './context/AuthContext';
import RouteAuth from './components/Auth/RouteAuth';
import RouteAuthTrue from './components/Auth/RouteAuthTrue';
import ReactNotification from 'react-notifications-component'
import ProfileDetails from './pages/ProfileDetails/ProfileDetails';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import 'react-notifications-component/dist/theme.css'




function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  const header = <Header />;
  const footer = <Footer />;
  const modal = (state.showEditModal ? <EditNote /> : null);
  const content = (
    <Switch>
      <RouteAuthTrue path="/register" component={Registration} />
      <RouteAuthTrue path="/login" component={Login} />
      <RouteAuth path="/profile" component={ProfileDetails} />
      <RouteAuth exact path="/" component={NotesHome} />
      <Route component={() => <div className="container alert alert-danger mt-5"><h1 >Nie znaleziono strony</h1></div>} />
    </Switch>
  )

  return (
    <ReducerContext.Provider value={{
      state: state,
      dispatch: dispatch
    }}>
      <AuthContext.Provider value={{
        auth: state.auth,
        login: (user) => dispatch({ type: 'login', user }),
        logout: () => dispatch({ type: 'logout' })
      }}>

        <Router>
          <ReactNotification />
          <Layout
            header={header}
            content={content}
            footer={footer}
            modal={modal}
          />
        </Router>

      </AuthContext.Provider>
    </ReducerContext.Provider>
  )
}

export default App;
