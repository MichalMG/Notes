export default function Spinner(props) {
  return props.loading
    ? (<div className="container my-3 d-flex align-items-center justify-content-center" >
      <div className="spinner-border text-success text-center" role="status">
      </div>
      <span className="ml-2"> Ładowanie...</span>
    </div>)
    : null
}