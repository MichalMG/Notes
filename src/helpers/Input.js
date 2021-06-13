export default function Input(props) {

  switch (props.type) {
    case 'text':
      return <InputText {...props} />
    case 'textarea':
      return <InputTextarea {...props} />
    case 'password':
      return <InputPassword {...props} />
    case 'email':
      return <InputEmail {...props} />
    case 'color':
      return <InputColor {...props} />
    case 'checkbox':
      return <InputCheckbox {...props} />
    default:
      break

  }
}


const InputText = props => {
  return (
    <>
      <label htmlFor="noteTitle" className="form-label">{props.label}</label>
      <input
        ref={props.ref}
        autoComplete="off"
        placeholder={props.placeholder}
        type={props.type}
        className={`form-control ${props.validation ? 'is-invalid' : null} `}
        id={props.id}
        aria-describedby={props.id}
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      />
      <div className="invalid-feedback">{props.validation}</div>
    </>
  )
}

const InputEmail = props => {
  return (
    <>
      <label htmlFor="noteTitle" className="form-label">{props.label}</label>
      <div className="input-group">
        <span className="input-group-text" id={props.id}>
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 18 18">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z" />
          </svg>
        </span>
        <input
          autoComplete="off"
          placeholder={props.placeholder ?? "name@example.pl"}
          type={props.type}
          className={`form-control ${props.validation ? 'is-invalid' : null} `}
          id={props.id}
          aria-describedby={props.id}
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
        <div className="invalid-feedback">{props.validation}</div>
      </div>
    </>
  )
}

const InputPassword = props => {
  return (
    <>
      <label htmlFor="noteTitle" className="form-label">{props.label}</label>
      <div className="input-group mb-3">
        <span className="input-group-text" id="ico-form-password">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" className="bi bi-lock-fill" viewBox="0 0 18 18">
            <path d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2zm3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2z" />
          </svg>
        </span>
        <input
          ref={props.ref}
          autoComplete="off"
          placeholder="hasło"
          type={props.type}
          className={`form-control ${props.validation ? 'is-invalid' : null} `}
          id={props.id}
          aria-describedby={props.id}
          aria-label="password"
          value={props.value}
          onChange={e => props.onChange(e.target.value)}
        />
        <div className="invalid-feedback">{props.validation}</div>
      </div>


    </>
  )
}



const InputCheckbox = props => {
  return (
    <>
      <div className="form-check">

        <input
          type={props.type}
          className={`form-check-input ${props.validation ? 'is-invalid' : null} `}
          id={props.id}
          aria-describedby={props.id}
          checked={props.value}
          onChange={e => props.onChange(e.target.checked)}
        />
        <label htmlFor={props.id} className="form-check-label">{props.label}
        </label>
        <div className="invalid-feedback">{props.validation}</div>
      </div>
    </>
  )
}

const InputTextarea = props => {
  return (
    <>
      <label className="form-label">{props.label}</label>
      <textarea
        className={`form-control ${props.validation ? 'is-invalid' : null} `}
        cols="30"
        rows="5"
        value={props.value}
        onChange={e => props.onChange(e.target.value)}
      ></textarea>
      <div className="invalid-feedback">{props.validation}</div>
    </>
  )
}


const InputColor = props => {
  return (
    <>
      <label className="form-label">{props.label}</label>
      <input
        type={props.type}
        label={props.label}
        title={props.title}
        value={props.value}
        className="form-control p-1"
        style={{ "width": "40px", "height": "30px" }}
        onChange={e => props.onChange(e.target.value)}
      />
    </>
  )
}


