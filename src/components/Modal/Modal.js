import Style from './Modal.module.css';

function Modal(props) {
  return (
    <div className={`${Style.modal}`} style={{ backdropFilter: 'blur(4px)' }}>
      <div className="container">
        {props.children}
      </div>
    </div>
  )
}

export default Modal;