export const initialState = {
  notes: [],
  copyNotesSearch: [],
  currentNote: {},
  showEditModal: false,
  showAddNote: false,
  auth: window.localStorage.getItem('user-auth') ? JSON.parse(window.localStorage.getItem('user-auth')) : null
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'addNote':
      return { ...state, notes: [...state.notes, action.note] }
    case 'editNote':
      return { ...state, currentNote: action.note }
    case 'updateNote':
      return { ...state, notes: action.notes }
    case 'remove':
      return { ...state, notes: action.notes }
    case 'showEditModal':
      return { ...state, showEditModal: action.showEditModal }
    case 'showAddNote':
      return { ...state, showAddNote: action.showAddNote }
    case 'login':
      return { ...state, auth: action.user }
    case 'logout':
      return { ...state, auth: null }
    case 'searchHandler':
      return { ...state, copyNotesSearch: [...state.notes] }
    default:
      return state;
  }
}