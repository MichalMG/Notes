export default function LoadingButton(props) {
  return (
    <>
      {props.loading
        ? (
          <button className={`btn btn-${props.color ? props.color : "warning"}`} type="button" disabled>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
          Ładowanie...
          </button>
        )
        : <button onClick={props.onClick ? props.onClick : null} type={props.type ? props.type : "submit"} className={`btn btn-${props.color ? props.color : "warning"}`} disabled={props.disabled ? props.disabled : false}>{props.title}</button>}
    </>
  )
}