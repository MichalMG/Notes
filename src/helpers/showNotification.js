import { store } from 'react-notifications-component';

export default function showNotification({ title, message, type }) {

  return (
    store.addNotification({
      title,
      message,
      type,
      insert: "top",
      container: "bottom-right",
      animationIn: ["animate__animated", "animate__fadeIn"],
      animationOut: ["animate__animated", "animate__fadeOut"],
      dismiss: {
        duration: 3500,
        onScreen: true,
        showIcon: true,
      }
    })
  )
}