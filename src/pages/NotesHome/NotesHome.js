import { useContext, useEffect, useState } from 'react';
import ReducerContext from '../../context/ReducerContext';
import NewNote from '../../components/Notes/NewNote/NewNote';
import Notes from '../../components/Notes/Notes';
import axiosFirebase from '../../axios-firebase';
import useAuth from '../../hooks/useAuth';
import Spinner from '../../UI/Spinner/Spinner';
import objectWithKey from '../../helpers/objectWithKey';
import showNotification from '../../helpers/showNotification';

export default function NotesHome() {
  const context = useContext(ReducerContext);
  const [auth, setAuth] = useAuth();
  const [loading, setLoading] = useState(false);
  const [loadingNotes, setLoadingNotes] = useState('');
  const [search, setSeatch] = useState('');

  const removeHandler = async id => {
    try {
      //express + mongoDB
      // await axios.delete(`/delete/${id}`);  
      await axiosFirebase.delete(`/${auth.localId}/${id}.json?auth=${auth.idToken}`);
      let newNotes = [...context.state.notes];
      newNotes = newNotes.filter(note => note._id !== id);
      context.dispatch({ type: 'remove', notes: newNotes });
      context.dispatch({ type: 'searchHandler' });

      const not = {
        title: "Notatka zsotała usunięta.",
        message: "Nie ma możliwości przywrócenia usuniętej notatki",
        type: "danger"
      }
      showNotification(not);

    } catch (err) {
      const not = {
        title: "Sesja wygasła!",
        message: "Aby usunąć notatkę proszę się zalogować",
        type: "warning"
      }
      showNotification(not);
      return setAuth(null);
    }
  }

  const editHandler = async id => {
    let editNote = [...context.state.notes].filter(note => note._id === id);
    context.dispatch({ type: 'editNote', note: editNote });
    context.dispatch({ type: 'showEditModal', showEditModal: true });
    context.dispatch({ type: 'searchHandler' });
  }


  const fetchNotes = async () => {
    try {
      //pobierane będą po localId w zależności od użytkownika
      // const notes = await axios.get(`/${auth.localId}`);
      // context.dispatch({ type: 'updateNote', notes: notes.data })

      const notes = await axiosFirebase.get(`/${auth.localId}.json`);
      const newNotesArray = objectWithKey(notes.data);
      context.dispatch({ type: 'updateNote', notes: newNotesArray });
      setLoadingNotes('');
      context.dispatch({ type: 'searchHandler' });
    } catch (err) {
      setLoadingNotes('Wystąpił problem z serwerem. Proszę odświeżyć stronę, jeśli rezultat będzie taki sam to bardzo proszę o pilny kontakt' + err)
      console.log(err.data);
    }
    setLoading(false);

  }

  const searchHandler = async (e) => {
    try {
      setSeatch(e.target.value);
      let searchNotes = [...context.state.copyNotesSearch];
      searchNotes = searchNotes.filter(notes => notes.title.toLowerCase().includes(e.target.value.toLowerCase()));
      context.dispatch({ type: 'updateNote', notes: searchNotes });
    } catch (err) {
      console.log(err.response.data)
    }
  }

  useEffect(() => {

    if (auth) {
      setLoading(true)
      fetchNotes();
    }

  }, [])

  return (
    <div>
      <>
        <div className=" my-4 container d-flex justify-content-center align-items-center">
          <button className="btn btn-outline-primary"
            onClick={() => context.dispatch({ type: 'showAddNote', showAddNote: true })}>
            Dodaj!
          </button>
          <div className="ms-2">
            <input type="text" className="form-control" placeholder="wyszukaj..." value={search} onChange={searchHandler} />
          </div>

        </div>
        {loadingNotes ? <div className="container alert alert-danger">{loadingNotes}</div> : null}
        {loading
          ? <Spinner loading={loading} />
          : (< Notes
            onRemove={removeHandler}
            onEdit={editHandler}
            notes={context.state.notes} />)}
      </>
      {context.state.showAddNote ? <NewNote /> : null}
    </div>
  )
}

