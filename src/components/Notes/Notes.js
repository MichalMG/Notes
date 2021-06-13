import Note from './Note/Note';

function Notes(props) {
  return (
    <div className="container">
      <div className="row justify-content-center" >
        {props.notes.map(note => <Note key={note._id} onRemove={props.onRemove} onEdit={props.onEdit} {...note} />)}
      </div>
    </div>
  )
}

export default Notes;