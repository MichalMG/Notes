import './Layout.css';

export default function Layout({ header, content, footer, modal }) {
  return (
    <div className="d-flex flex-column wrapperLayout">
      <div>{header}</div>
      <div style={{ flexGrow: '2' }}>{content}</div>
      <div>{modal}</div>
      <div className="pt-3">{footer}</div>
    </div >
  )
}