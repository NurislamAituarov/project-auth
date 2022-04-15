const initialState = {
  success: null,
  currentUser: null,
  isAuth: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SUCCESS':
      return {
        ...state,
        register: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload,
        isAuth: true,
      };
    case 'LOG_OUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuth: false,
      };
    default:
      return state;
  }
};
