import axiosFirebase from '../../../axios-firebase';
import React, { useContext, useState } from 'react';
import ReducerContext from '../../../context/ReducerContext';
import Input from '../../../helpers/Input';
import { validation } from '../../../helpers/validation';
import useAuth from '../../../hooks/useAuth';
import Modal from '../../Modal/Modal';
import showNotification from '../../../helpers/showNotification';



function NewNote(props) {
  const context = useContext(ReducerContext);
  const [auth, setAuth] = useAuth();
  const [form, setForm] = useState({
    title: {
      value: context.state.currentNote[0].title,
      errorMessage: '',
      rules: ['required', { rule: 'length', length: 6 }],
      validation: true
    },
    description: {
      value: context.state.currentNote[0].body,
      rules: ['required'],
      errorMessage: '',
      validation: true
    },
    bgColor: {
      value: context.state.currentNote[0].bgColor,
      errorMessage: '',
      validation: true
    },
    textColor: {
      value: context.state.currentNote[0].textColor,
      errorMessage: '',
      validation: true
    }
  })

  const buttonHandler = Object.values(form).filter(val => !val.validation).length === 0 ? false : true;

  const saveNote = async (e) => {

    e.preventDefault();
    const newNote = {
      title: form.title.value,
      body: form.description.value,
      textColor: form.textColor.value,
      bgColor: form.bgColor.value
    }

    const id = context.state.currentNote[0]._id;

    const allNote = [...context.state.notes];
    const noteIndex = allNote.findIndex(note => note._id === id);
    allNote[noteIndex] = { ...newNote, _id: id };
    context.dispatch({ type: 'showEditModal', showEditModal: false });
    context.dispatch({ type: 'updateNote', notes: allNote });
    context.dispatch({ type: 'searchHandler' });

    try {
      await axiosFirebase.patch(`/${auth.localId}/${id}.json?auth=${auth.idToken}`, newNote);
      const not = {
        title: "Notatka została zaktualizowana",
        message: " ",
        type: "info"
      }
      showNotification(not);
    } catch (err) {
      const not = {
        title: "Sesja wygasła!",
        message: "Aby edytować notatkę proszę się zalogować",
        type: "danger"
      }
      showNotification(not);
      return setAuth(null);
    }


    //express + mongoDB
    // await axios.patch(`/note/${id}`, newNote, (err) => {
    //   if (err) return console.log('coś poszło nie tak')
    //   console.log('Notatka zaktualizowana zapytanie-frontend');
    // });
  }

  const changeHandler = (val, type) => {
    const errorMessage = validation(form[type].rules, val);
    setForm({
      ...form,
      [type]: { ...form[type], value: val, errorMessage, validation: !errorMessage }
    })
  }

  const closeHandler = () => {
    context.dispatch({ type: 'showEditModal', showEditModal: false });
    context.dispatch({ type: 'editNote', currentNote: {} })
  }

  return (
    <Modal>
      <div className="my-4">
        <div className="row justify-content-center">
          <div className="card bg-light text-dark col-sm-8 p-0">
            <div className="card-header">Edytuj notatkę</div>
            <div className="card-body">
              <form onSubmit={saveNote}>

                <div className="mb-3 ">
                  <Input
                    label="Tytuł"
                    type="text"
                    id="noteTitle"
                    validation={form.title.errorMessage}
                    value={form.title.value}
                    onChange={val => changeHandler(val, 'title')}
                  />
                </div>

                <div className="mb-3">
                  <Input
                    label="Notatka"
                    type="textarea"
                    validation={form.description.errorMessage}
                    value={form.description.value}
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
                      className="form-control p-1"
                      style={{ "width": "50px" }}
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

                  <div className=" text-end col-12 col-lg-4 mt-2 mt-lg-0">
                    <button type="submit" className="btn btn-success" disabled={buttonHandler}>Zapisz</button>
                    <button type="button" onClick={closeHandler} className="btn btn-danger ms-2">Anuluj</button>
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