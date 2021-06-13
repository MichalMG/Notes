import React, { useContext, useState } from 'react';
import ReducerContext from '../../../context/ReducerContext';
import { validation } from '../../../helpers/validation'
import axiosFirebase from '../../../axios-firebase';
import useAuth from '../../../hooks/useAuth';
import Input from '../../../helpers/Input';
import Modal from '../../Modal/Modal';
import showNotification from '../../../helpers/showNotification';

function NewNote() {

  const [auth, setAuth] = useAuth();
  const [form, setForm] = useState({
    bgColor: {
      value: "#ffc107",
      validation: true,
    },
    textColor: {
      value: "#000000",
      validation: true,
    },
    title: {
      value: '',
      errorMessage: '',
      validation: false,
      rules: ['required', { rule: 'length', length: 2 }],
    },
    description: {
      value: '',
      errorMessage: '',
      validation: false,
      rules: ['required'],
    }
  })

  const buttonHandler = Object.values(form).filter(value => !value.validation).length ? true : false;

  const context = useContext(ReducerContext);


  const addNote = async (e) => {
    e.preventDefault();

    try {
      const newNote = {
        title: form.title.value,
        body: form.description.value,
        bgColor: form.bgColor.value,
        textColor: form.textColor.value,
        localId: auth.localId
      }


      const axNote = await axiosFirebase.post(`/${auth.localId}.json?auth=${auth.idToken}`, newNote);
      const note = { ...newNote, _id: axNote.data.name };
      context.dispatch({ type: 'addNote', note });
      context.dispatch({ type: 'showAddNote', showAddNote: false });
      context.dispatch({ type: 'searchHandler' });
      const not = {
        title: "Notatka zsotała dodana.",
        message: "Nowa notatka jest już widoczna",
        type: "success"
      }
      showNotification(not);
      //express + mongoDB
      // const axNote = await axios.post('/add/', newNote);
      // context.dispatch({ type: 'addNote', note: axNote.data });
      // context.dispatch({ type: 'showAddNote', showAddNote: false });
    } catch (err) {
      const not = {
        title: "Sesja wygasła!",
        message: "Aby dodać notatkę proszę się zalogować",
        type: "warning"
      }
      showNotification(not);
      return setAuth(null);
    }
  }


  const changeHandler = (value, type) => {
    const errorMessage = validation(form[type].rules, value);
    setForm({ ...form, [type]: { ...form[type], value, errorMessage, validation: !errorMessage } });
  }

  return (
    <Modal>
      <div className="my-4">
        <div className="row justify-content-center">
          <div className="card bg-light text-dark col-sm-8 p-0">
            <div className="card-header">Dodaj notatkę</div>

            <div className="card-body">
              <form onSubmit={addNote}>

                <div className="mb-3 ">
                  <Input
                    type="text"
                    validation={form.title.errorMessage}
                    id="newNoteTitle"
                    value={form.title.value}
                    onChange={val => changeHandler(val, 'title')}
                    label="Tytuł"
                  />
                </div>

                <div className="mb-3">
                  <Input
                    type="textarea"
                    label="Notatka"
                    validation={form.description.errorMessage && 'Treść notatki jest wymagana'}
                    onChange={val => changeHandler(val, 'description')}
                  />
                </div>

                <div className="row align-items-center">

                  <div className="col-6 col-lg-4">
                    <Input
                      type="color"
                      label="Kolor notatki"
                      title="Wybierz kolor"
                      value={form.bgColor.value}
                      onChange={val => changeHandler(val, 'bgColor')}
                    />
                  </div>

                  <div className="col-6 col-lg-4">
                    <Input
                      type="color"
                      label="Kolor tekstu"
                      title="Wybierz kolor"
                      value={form.textColor.value}
                      onChange={val => changeHandler(val, 'textColor')}
                    />
                  </div>

                  <div className="text-end col-12 col-lg-4 mt-2 mt-lg-0">
                    <button type="submit" className="btn btn-success " disabled={buttonHandler}>Dodaj</button>
                    <button type="button" onClick={() => context.dispatch({ type: 'showAddNote', showAddNote: false })} className="btn btn-danger ms-2" >Anuluj</button>
                  </div>

                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </Modal>
  )
}

export default NewNote;